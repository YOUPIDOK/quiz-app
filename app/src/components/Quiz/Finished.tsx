"use client";

import {QuizStepEnum} from 'shared/src/quiz/enum';
import {IQuiz} from 'shared/src/quiz/interface';
import React from "react";
import PartyScoreTable from "@/components/Quiz/PartyScoreTable";

const Finished = ({quiz}: {quiz: IQuiz}) => {
    return (
        <>
            {(quiz.step === QuizStepEnum.FINISHED) && (
                <div>
                    <div className="bg-white p-2 mb-2 rounded text-center">The winner is <b>{quiz.scores[0].player.username}</b></div>
                    <PartyScoreTable quiz={quiz}/>
                </div>
            )}
        </>
    );
};

export default Finished;
