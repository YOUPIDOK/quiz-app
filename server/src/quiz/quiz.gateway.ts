import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Socket} from "socket.io";
import {QuizService} from "./quiz.service";
import {IGenerateQuestion, IQuestion, IQuiz, IRound} from "shared/src/quiz/interface";
import {AnswerEvent, CreateEvent, JoinEvent, LeaveEvent, StartEvent, UpdateEvent} from 'shared/dist/quiz/events';
import {
  C2SAnswerPayload,
  C2SCreatePayload,
  C2SJoinPayload,
  C2SLeavePayload,
  C2SStartPayload,
  S2CCreatePayload,
  S2CJoinPayload,
  S2CUpdatePayload
} from 'shared/src/quiz/payload';
import {PlayerService} from "../player/player.service";
import {QuizStepEnum, QuizVisibilityEnum, quizDifficultyLabel, quizCategoryLabel} from 'shared/dist/quiz/enum.js';
import {QUESTION_DURATION, OPENAI_QUESTION_GENERATION_SYSTEM_PROMPT} from 'shared/dist/quiz/const.js';
import OpenAI from "openai";

@WebSocketGateway({cors: true})
export class QuizGateway {

  @WebSocketServer()
  server: Socket;

  openai: OpenAI;

  constructor(
      private quizService: QuizService,
      private playerService: PlayerService
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  @SubscribeMessage(CreateEvent)
  handleCreate(client: Socket, C2SPayload: C2SCreatePayload): void {
    const owner = this.playerService.findByClientId(client.id);

    const quiz: IQuiz = {
      code: this.quizService.generateCode(),
      nbQuestion: C2SPayload.nbQuestion,
      nbRound: C2SPayload.nbRound,
      category: C2SPayload.category,
      difficulty: C2SPayload.difficulty,
      visibility: C2SPayload.visibility,
      password: C2SPayload.password,
      currentQuestion: null,
      currentRound: null,
      rounds: [],
      step: QuizStepEnum.WAITING_TO_START,
      players: [],
      scores: [],
      owner
    };

    this.quizService.insert(quiz);

    const S2CPayload : S2CCreatePayload = {
      quiz
    };

    const player = this.playerService.findByClientId(client.id);

    console.log(`Quiz #${quiz.code} : Create by player ${player.username}`);

    this.server.to(client.id).emit(CreateEvent, S2CPayload);
  }

  @SubscribeMessage(JoinEvent)
  async handleJoin(client: any, C2SPayload: C2SJoinPayload) {
    const S2CPayload: S2CJoinPayload = {
      success: false,
      error: `Quiz #${C2SPayload.code} doesn't exist`,
      quiz: null
    };

    let quiz = this.quizService.findByCode(C2SPayload.code);

    if (quiz == null) {
      this.server.to(client.id).emit(JoinEvent, S2CPayload);
      return;
    }

    if (quiz.step === QuizStepEnum.FINISHED) {
      S2CPayload.error = `Quiz #${C2SPayload.code} is finished`;
      this.server.to(client.id).emit(JoinEvent, S2CPayload);
      return;
    }

    if (quiz.visibility === QuizVisibilityEnum.PRIVATE && quiz.password !== C2SPayload.password) {
      S2CPayload.error = `Invalid password`;
      this.server.to(client.id).emit(JoinEvent, S2CPayload);
      return;
    }

    const player = this.playerService.findByClientId(client.id);
    quiz = this.quizService.join(quiz.code, player);
    console.log(`Quiz #${quiz.code} : Player ${player.username} join`);
    S2CPayload.success = true;
    S2CPayload.error = null;
    S2CPayload.quiz = quiz;

    this.server.to(client.id).emit(JoinEvent, S2CPayload);
    this.updateQuiz(quiz, true);
  }

  @SubscribeMessage(LeaveEvent)
  async handleLeave(client: any, payload: C2SLeavePayload) {
    let quiz = this.quizService.findByCode(payload.code);

    if (quiz != null && quiz.step === QuizStepEnum.WAITING_TO_START) {
      const player = this.playerService.findByClientId(client.id);
      quiz = this.quizService.leave(quiz.code, player);
      console.log(`Quiz #${quiz.code} : Player ${player.username} leave`);
      if (quiz.players.length === 0) {
        this.quizService.delete(quiz.code);
      } else {
        console.log(`Quiz #${quiz.code} : Deleted because no player`);
        this.updateQuiz(quiz, true);
      }
    }
  }

  @SubscribeMessage(StartEvent)
  async handleStart(client: any, payload: C2SStartPayload) {
    let quiz = this.quizService.findByCode(payload.code);

    console.log(`Quiz #${quiz.code} : Start`);

    // Play all rounds
    let roundNumber = 1;
    while (roundNumber <= quiz.nbRound) {
      await this.round(quiz.code, roundNumber);
      roundNumber++;
    }

    // Quiz End
    console.log(`Quiz #${quiz.code} : End`);
    quiz = this.quizService.findByCode(payload.code);
    quiz.step = QuizStepEnum.FINISHED;

    this.updateQuiz(quiz, true);
  }

  @SubscribeMessage(AnswerEvent)
  async handleAnswer(client: any, payload: C2SAnswerPayload) {
    let quiz = this.quizService.findByCode(payload.code);
    const player = this.playerService.findByClientId(client.id);

    if (quiz.currentQuestion === payload.question &&
        quiz.currentRound === payload.round &&
        quiz.players.find(player => player.clientId === client.id) != null &&
        !quiz.rounds[quiz.currentRound].questions[quiz.currentQuestion].playerAnswers[client.id] != null
    ) {
      console.log(`Quiz #${quiz.code} Round ${quiz.currentRound} Question ${quiz.currentQuestion} : Player ${player.username} answer ${payload.answerId}`);
      quiz.rounds[quiz.currentRound].questions[quiz.currentQuestion].playerAnswers.push({
        playerId: client.id,
        answerId: payload.answerId,
        score: this.score(quiz.rounds[quiz.currentRound].questions[quiz.currentQuestion], payload.answerId, quiz)
      });
      this.updateQuiz(quiz);
    }
  }

  /********************************************************************* Private methods **********************************************************************/

  private score(question: IQuestion, answerId: number, quiz: IQuiz): number {
    let score = 0

    if (answerId === question.correctAnswer) {
      score += 100;                                                 // Correct answer
      score += 5 * question.timeLeft;                               // Speed bonus : Based on time left
      score += quiz.players.length - question.playerAnswers.length; // Speed bonus : Based on position
    }

    return score;
  }

  private async round(code: string, roundNumber: number) {
    const quiz = this.quizService.findByCode(code);

    // Round generation
    console.log(`Quiz #${quiz.code} Round ${roundNumber} : Generation`);
    quiz.currentRound = roundNumber;
    quiz.step = QuizStepEnum.ROUND_GENERATION;
    this.updateQuiz(quiz, true);

    const round: IRound = {
      round: roundNumber,
      questions: [],
      scores: []
    }
    quiz.players.forEach(player => {
      round.scores.push({
        score: 0,
        place: null,
        player
      })
    });

    // --------- OPEN AI GENERATION ----------
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: OPENAI_QUESTION_GENERATION_SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: JSON.stringify({nbQuestion: quiz.nbQuestion, difficulty: quizDifficultyLabel[quiz.difficulty], category: quizCategoryLabel[quiz.category]}),
        },
      ],
    });

    const questions = JSON.parse(response.choices[0].message.content).questions;

    questions.forEach((generateQuestion: IGenerateQuestion, i: number) => {
      const questionId = i + 1;
      const question: IQuestion = {
        number: questionId,
        question: generateQuestion.question,
        correctAnswer: null,
        timeLeft: QUESTION_DURATION,
        hint: generateQuestion.hint,
        explanation: generateQuestion.explanation,
        availableAnswers: [],
        playerAnswers: [],
      };

      generateQuestion.answers.forEach((generateAnswer, j) => {
        const answerId = j + 1;
        question.availableAnswers.push({
          id: answerId,
          answer: generateAnswer.answer
        });
        if (generateAnswer.isCorrect) {
          question.correctAnswer = answerId;
        }
      });

      round.questions[questionId] = question;
    });

    quiz.rounds[roundNumber] = round;
    this.updateQuiz(quiz);
    //------- OPEN AI GENERATION --------

    // Play all questions
    let questionNumber = 1;
    while (questionNumber <= quiz.nbQuestion) {
      await this.question(quiz.code, roundNumber, questionNumber);
      await this.correction(quiz.code, roundNumber, questionNumber);
      questionNumber++;
    }

    // Create / Update score
    quiz.players.forEach(player => {
      const scoreIdx = quiz.scores.findIndex(score => score.player.clientId === player.clientId);
      const roundWon = quiz.rounds[quiz.currentRound].scores[0].player.clientId === player.clientId ? 1 : 0;

      if (scoreIdx !== -1) {
        quiz.scores[scoreIdx].roundWon += roundWon;
      } else {
        quiz.scores.push({
          roundWon,
          place: 0,
          player
        });
      }
    });

    // Update place
    quiz.scores.sort((a, b) => b.roundWon - a.roundWon);
    quiz.scores.forEach((score, index) => {
      score.place = index + 1;
    });

    // Print round score
    console.log(`Quiz #${code} Round ${roundNumber} : End`);
    quiz.step = QuizStepEnum.ROUND_SCORE;
    this.updateQuiz(quiz, true);

    await this.delay(5000);
  }

  private async question(code: string, roundNumber: number, questionNumber: number) {
    console.log(`Quiz #${code} Round ${roundNumber} Question ${questionNumber} : Start`);
    let quiz = this.quizService.findByCode(code);

    quiz.step = QuizStepEnum.QUESTION;
    quiz.currentQuestion = questionNumber;
    this.updateQuiz(quiz, true);


    while (quiz.rounds[roundNumber].questions[questionNumber].timeLeft !== 0) {
      quiz = this.quizService.findByCode(code);
      quiz.rounds[roundNumber].questions[questionNumber].timeLeft--;
      this.updateQuiz(quiz, true);
      await this.delay(1000);
    }
  }

  private async correction(code: string, roundNumber: number, questionNumber: number) {
    console.log(`Quiz #${code} Round ${roundNumber} Question ${questionNumber} : Correction`);
    const quiz = this.quizService.findByCode(code);

    // Create / Update score
    quiz.players.forEach(player => {
      const scoreIdx = quiz.rounds[quiz.currentRound].scores.findIndex(score => score.player.clientId === player.clientId);
      const answerIdx = quiz.rounds[quiz.currentRound].questions[quiz.currentQuestion].playerAnswers.findIndex(answer => answer.playerId === player.clientId);
      const playerScore = answerIdx === -1 ? 0 : quiz.rounds[quiz.currentRound].questions[quiz.currentQuestion].playerAnswers[answerIdx].score;

      if (scoreIdx !== -1) {
        quiz.rounds[quiz.currentRound].scores[scoreIdx].score += playerScore;
      } else {
        quiz.rounds[quiz.currentRound].scores.push({
          score: playerScore,
          place: 0,
          player
        });
      }
    });

    // Update place
    quiz.rounds[quiz.currentRound].scores.sort((a, b) => b.score - a.score);
    quiz.rounds[quiz.currentRound].scores.forEach((score, index) => {
      score.place = index + 1;
    });

    quiz.step = QuizStepEnum.CORRECTION;
    this.updateQuiz(quiz, true);

    await this.delay(5000);
  }

  private updateQuiz(quiz: IQuiz, notify: boolean = false) {
    this.quizService.update(quiz);

    if (notify) {
      const payload: S2CUpdatePayload = { quiz };
      const event = UpdateEvent + '-' + quiz.code;

      quiz.players.forEach(player => {
        this.server.to(player.clientId).emit(event, payload);
      });
    }
  }

  private delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
