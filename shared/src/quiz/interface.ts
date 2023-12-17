import {IPlayer} from "../player/interface";
import {QuizStepEnum, QuizCategoryEnum, QuizDifficultyEnum, QuizVisibilityEnum} from "./enum";

export interface IQuiz {
    code: string,
    owner: IPlayer,
    players: IPlayer[]
    nbRound: number,
    step: QuizStepEnum,
    category: QuizCategoryEnum,
    difficulty: QuizDifficultyEnum,
    visibility: QuizVisibilityEnum,
    password: string,
    rounds: IRound[],
    nbQuestion: number,
    currentRound: number,
    currentQuestion: number,
    scores: IPartyScore[]
}

export interface IRound {
    round: number,
    questions: IQuestion[]
    scores: IRoundScore[]
}

export interface IRoundScore {
    player: IPlayer,
    score: number,
    place: number
}

export interface IPartyScore {
    player: IPlayer,
    roundWon: number,
    place: number
}

export interface IQuestion {
    number: number,
    timeLeft: number,
    question: string
    correctAnswer: number
    hint: string,
    explanation: string,
    availableAnswers: IAnswer[]
    playerAnswers: IPlayerAnswer[]
}

export interface IPlayerAnswer {
    playerId: string,
    answerId: number,
    score: number
}

export interface IAnswer {
    id: number,
    answer: string
}

export interface IGenerateQuestion {
    question: string,
    hint: string,
    explanation: string,
    answers: {isCorrect: boolean, answer: string}[]
}