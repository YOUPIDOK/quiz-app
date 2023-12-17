"use client";

import React from "react";
import {QuizStepEnum} from 'shared/src/quiz/enum';
import {IQuestion, IQuiz} from 'shared/src/quiz/interface';
import RoundScoreTable from "@/components/Quiz/RoundScoreTable";

const Correction = ({quiz, question, playerAnswerId}: {quiz: IQuiz, question: IQuestion|null, playerAnswerId: number|null}) => {
    const btnClass = (answerId: number) => {
        let btnClass = 'btn-outline-primary';
        const isCorrect = playerAnswerId === question?.correctAnswer;

        if (isCorrect && question?.correctAnswer === answerId) {
            btnClass = 'btn-success';
        }
        if (!isCorrect && question?.correctAnswer === answerId) {
            btnClass = 'btn-warning';
        }
        if (!isCorrect && playerAnswerId === answerId) {
            btnClass = 'btn-danger';
        }

        return btnClass;
    }

    return (
        <>
            {(quiz.step === QuizStepEnum.CORRECTION && question != null) && (
                <div>
                    <div className="bg-white rounded p-2 mb-2 d-flex justify-content-evenly">
                        <div><b>Round</b> {quiz.currentRound}/{quiz.nbRound}</div>
                        <div><b>Question</b> {quiz.currentQuestion}/{quiz.nbQuestion}</div>
                    </div>


                    <div className="bg-white p-2 rounded mb-2">
                        <div className="d-flex justify-content-center mb-2">
                            <span className="rounded bg-primary text-white p-1 fw-bold">{question.timeLeft}</span>
                        </div>
                        <div className="text-center mb-2">{question.question}</div>
                        <div>
                            {question.availableAnswers?.map((a) => (
                                <div key={`${quiz.currentRound}-${quiz.currentQuestion}-${a.id}`} className="d-flex justify-content-center">
                                    <button className={"mb-2 btn " + btnClass(a.id)}>
                                        {a.answer}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mb-2"><b>Hint</b> : {question.hint}</div>
                        <div className="text-center"><b>Explanation</b> : {question.explanation}</div>
                    </div>
                    <RoundScoreTable quiz={quiz}/>
                </div>
            )}

        </>
    );
};

export default Correction;
