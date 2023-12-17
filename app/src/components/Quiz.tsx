'use client';
import React, {useEffect, useState} from 'react';
import {useAppContext} from "@/context/AppContext";
import {Col, Container, Row} from "react-bootstrap";
import {C2SLeavePayload, S2CUpdatePayload} from "shared/src/quiz/payload"
import {quizCategoryLabel, quizDifficultyLabel, QuizStepEnum, quizVisibilityLabel} from 'shared/src/quiz/enum';
import {IQuestion} from 'shared/src/quiz/interface';
import {LeaveEvent, UpdateEvent} from 'shared/src/quiz/events';
import WaitingToStart from "@/components/Quiz/WaitingToStart";
import RoundGeneration from "@/components/Quiz/RoundGeneration";
import RoundScore from "@/components/Quiz/RoundScore";
import Finished from "@/components/Quiz/Finished";
import Question from "@/components/Quiz/Question";
import Correction from "@/components/Quiz/Correction";
import {toast} from "react-toastify";

const Quiz = () => {
    const { quiz, socket, setQuiz } = useAppContext();
    const [question, setQuestion] =  useState<null|IQuestion>(null);
    const [playerAnswerId, setPlayerAnswerId] =  useState<null|number>(null);

    const leave = () => {
        if (quiz?.step === QuizStepEnum.WAITING_TO_START) {
            const payload: C2SLeavePayload = {
                code: quiz.code
            }

            socket.emit(LeaveEvent, payload);
        }
        setQuiz(null);
    }

    const copyCode = () => {
        if (quiz != null) {
            navigator.clipboard.writeText(quiz.code)
                .then(() => {
                    toast.success(`Code #${quiz.code} copied`)
                });
        }
    }

    useEffect(() => {
        if (quiz != null) {
            socket.on(UpdateEvent + '-' + quiz.code , (payload: S2CUpdatePayload) => {
                console.log(payload.quiz)
                setQuestion(quiz.rounds[quiz.currentRound]?.questions[quiz.currentQuestion])
                if (quiz.step === QuizStepEnum.QUESTION || quiz.step === QuizStepEnum.CORRECTION && question != null) {
                    const playerAnswer = payload.quiz.rounds[payload.quiz.currentRound]?.questions[payload.quiz.currentQuestion]?.playerAnswers.find(pa => pa.playerId === socket.id);
                    if (playerAnswer) {
                        setPlayerAnswerId(playerAnswer.answerId);
                    } else {
                        setPlayerAnswerId(null)
                    }
                }
                setQuiz(payload.quiz);
            });
        }

        return () => {
            if (quiz != null) {
                socket.off(UpdateEvent + '-' + quiz.code);
            }
        };
    }, [quiz, playerAnswerId, question]);

    return (
        <>
            { (quiz != null) && (
                <Container>
                    <div className="d-flex justify-content-between pb-2">
                        <div onClick={leave} className="btn btn-sm btn-primary"><i className="bi bi-box-arrow-left"></i></div>
                        <div className="btn btn-sm btn-primary" onClick={copyCode}>#{quiz.code}</div>
                    </div>

                    <Row className="bg-white p-2 rounded mx-0 mb-2">
                        <Col md={4} className="text-center"><b>Category</b> : {quizCategoryLabel[quiz.category]}</Col>
                        <Col md={4} className="text-center"><b>Difficulty</b> : {quizDifficultyLabel[quiz.difficulty]}</Col>
                        <Col md={4} className="text-center"><b>Visibility</b> : {quizVisibilityLabel[quiz.visibility]}</Col>
                    </Row>

                    <WaitingToStart quiz={quiz}/>
                    <RoundGeneration quiz={quiz}/>
                    <Question quiz={quiz} question={question} playerAnswerId={playerAnswerId} setPlayerAnswerId={setPlayerAnswerId}/>
                    <Correction quiz={quiz} question={question} playerAnswerId={playerAnswerId}/>
                    <RoundScore quiz={quiz}/>
                    <Finished quiz={quiz}/>
                </Container>
            )}
        </>
    );
};

export default Quiz;
