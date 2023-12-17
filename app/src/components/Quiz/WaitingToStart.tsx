"use client";

import React from "react";
import {useAppContext} from "@/context/AppContext";
import { C2SStartPayload} from "shared/src/quiz/payload"
import {QuizStepEnum} from 'shared/src/quiz/enum';
import {IQuiz} from 'shared/src/quiz/interface';
import {StartEvent} from 'shared/src/quiz/events';
import {Spinner} from "react-bootstrap";

const WaitingToStart = ({quiz}: {quiz: IQuiz}) => {
    const { socket } = useAppContext();

    const start = () => {
        if (quiz === null) return;

        const payload : C2SStartPayload = {
            code: quiz?.code
        };

        socket.emit(StartEvent, payload);
    }

    return (
        <>
            { (quiz.step === QuizStepEnum.WAITING_TO_START) && (
                <div className="bg-white rounded p-2 mb-2">
                    <b>Players</b>
                    <div className='d-flex flex-lg-wrap gap-2'>
                        {quiz.players?.map((player) => (
                            <div key={player.clientId} className="rounded bg-primary text-white px-2 py-1">
                                <i className={"bi bi-person-fill" + (player.clientId === quiz.owner.clientId ? '-gear' : '')}></i> {player.username}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {(quiz.owner.clientId === socket.id && quiz.step === QuizStepEnum.WAITING_TO_START) && (
                <div className="d-flex justify-content-center bg-white p-2 rounded">
                    <button className="btn btn-primary" onClick={start}>Start <i className="bi bi-play-fill"></i></button>
                </div>
            ) }

            { (quiz.owner.clientId !== socket.id && quiz.step === QuizStepEnum.WAITING_TO_START) && (
                <div className="bg-white rounded p-2">
                    <div className="text-center mb-2">The quiz is about to start</div>
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

export default WaitingToStart;
