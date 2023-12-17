"use client";

import {Spinner} from "react-bootstrap";
import React from "react";
import {QuizStepEnum} from 'shared/src/quiz/enum';
import {IQuiz} from 'shared/src/quiz/interface';

const RoundGeneration = ({quiz}: {quiz: IQuiz}) => {
    return (
        <>
            { (quiz.step === QuizStepEnum.ROUND_GENERATION) && (
                <div className="bg-white rounded p-2">
                    <div className="text-center mb-2">Round {quiz.currentRound} generation</div>
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden"></span>
                        </Spinner>
                    </div>
                </div>
            ) }
        </>
    );
};

export default RoundGeneration;
