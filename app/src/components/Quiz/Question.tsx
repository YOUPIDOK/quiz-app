"use client";
import {IQuestion, IQuiz} from 'shared/src/quiz/interface';
import React from "react";
import {QuizStepEnum} from 'shared/src/quiz/enum';
import {useAppContext} from "@/context/AppContext";
import {AnswerEvent} from 'shared/src/quiz/events';
import {C2SAnswerPayload} from "shared/src/quiz/payload"

const Question = ({quiz, question, playerAnswerId, setPlayerAnswerId}: {quiz: IQuiz, question: IQuestion|null, playerAnswerId: number|null, setPlayerAnswerId: React.Dispatch<React.SetStateAction<number|null>>}) => {
    const { socket } = useAppContext();

    const answer = (answerId: number) => {
        if (playerAnswerId == null && quiz != null) {
            const payload : C2SAnswerPayload = {
                code: quiz.code,
                round: quiz.currentRound,
                question: quiz.currentQuestion,
                answerId
            };
            setPlayerAnswerId(answerId);

            socket.emit(AnswerEvent, payload);
        }
    }

    return (
        <>
            { (quiz.step === QuizStepEnum.QUESTION && question != null) && (
                <div>
                    <div className="bg-white rounded p-2 mb-2 d-flex justify-content-evenly">
                        <div><b>Round</b> {quiz.currentRound}/{quiz.nbRound}</div>
                        <div><b>Question</b> {quiz.currentQuestion}/{quiz.nbQuestion}</div>
                    </div>


                    <div className="bg-white p-2 rounded">
                        <div className="d-flex justify-content-center mb-2">
                            <span className="rounded bg-primary text-white p-1 fw-bold">{question.timeLeft}</span>
                        </div>
                        <div className="text-center mb-2">{question.question}</div>
                        <div>
                            {question.availableAnswers?.map((a) => (
                                <div key={`${quiz.currentRound}-${quiz.currentQuestion}-${a.id}`} className="d-flex justify-content-center">
                                    <button onClick={() => answer(a.id)} className={"mb-2 btn " + (playerAnswerId === a.id ? "btn-primary" : "btn-outline-primary")}>
                                        {a.answer}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="text-center"><b>Hint</b> : {question.hint}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Question;
