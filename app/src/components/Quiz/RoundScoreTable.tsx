"use client";

import React from "react";
import {QuizStepEnum} from 'shared/src/quiz/enum';
import {IQuiz} from 'shared/src/quiz/interface';

const RoundScoreTable = ({quiz}: {quiz: IQuiz}) => {
    return (
        <>
            <div className="mb-2 rounded bg-white p-2">
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead>
                        <tr>
                            <td className="fw-bold">Place</td>
                            <td className="fw-bold">Player</td>
                            <td className="fw-bold">Score</td>
                        </tr>
                        </thead>
                        <tbody>
                        {quiz.rounds[quiz.currentRound].scores.map((score) => (
                            <tr key={`${quiz.currentRound}-${score.player.clientId}`}>
                                <td>{score.place}</td>
                                <td>{score.player.username}</td>
                                <td>{score.score}</td>
                            </tr>
                        ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
};

export default RoundScoreTable;
