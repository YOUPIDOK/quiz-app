"use client";

import React from "react";
import {QuizStepEnum} from 'shared/src/quiz/enum';
import {IQuiz} from 'shared/src/quiz/interface';

const Correction = ({quiz}: {quiz: IQuiz}) => {
    return (
        <div className="mb-2 rounded bg-white p-2">
            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead>
                    <tr>
                        <td className="fw-bold">Place</td>
                        <td className="fw-bold">Player</td>
                        <td className="fw-bold">Number of rounds won</td>
                    </tr>
                    </thead>
                    <tbody>
                    {quiz.scores.map((score) => (
                        <tr key={`${quiz.currentRound}-${score.player.clientId}`}>
                            <td>{score.place}</td>
                            <td>{score.player.username}</td>
                            <td>{score.roundWon}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Correction;
