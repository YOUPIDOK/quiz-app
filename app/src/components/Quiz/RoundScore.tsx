"use client";

import React from "react";
import {QuizStepEnum} from 'shared/src/quiz/enum';
import {IQuiz} from 'shared/src/quiz/interface';
import RoundScoreTable from "@/components/Quiz/RoundScoreTable";
import PartyScoreTable from "@/components/Quiz/PartyScoreTable";

const RoundScore = ({quiz}: {quiz: IQuiz}) => {
    return (
        <>
            {(quiz.step === QuizStepEnum.ROUND_SCORE) && (
                <div>
                    <div className="text-center p-2 bg-white rounded mb-2"><b>Round</b> {quiz.currentRound}</div>
                    <div className="text-center p-2 bg-white rounded mb-2">The winner of the round <b>{quiz.currentRound}</b> is <b>{quiz.rounds[quiz.currentRound].scores[0].player.username}</b>
                    </div>
                    <RoundScoreTable quiz={quiz}/>
                    <PartyScoreTable quiz={quiz}/>
                </div>
            )}
        </>
    );
};

export default RoundScore;
