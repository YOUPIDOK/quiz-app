"use client";

import {Button, Form, FormControl, FormSelect, InputGroup} from "react-bootstrap";
import {useAppContext} from "@/context/AppContext";
import React, {useEffect, useState} from "react";
import {C2SCreatePayload, C2SJoinPayload, S2CCreatePayload} from "shared/src/quiz/payload"
import {CreateEvent, JoinEvent} from "shared/src/quiz/events"
import {QuizCategoryEnum, quizCategoryLabel, QuizDifficultyEnum, quizDifficultyLabel, QuizVisibilityEnum, quizVisibilityLabel} from "shared/src/quiz/enum"
import {toast} from "react-toastify";

const CreateQuiz = () => {
    const {socket, setQuiz} = useAppContext();
    const [category, setCategory] =  useState<QuizCategoryEnum>(QuizCategoryEnum.RANDOM);
    const [difficulty, setDifficulty] =  useState<QuizDifficultyEnum>(QuizDifficultyEnum.MEDIUM);
    const [visibility, setVisibility] =  useState<QuizVisibilityEnum>(QuizVisibilityEnum.PUBLIC);
    const [nbQuestion, setNbQuestion] =  useState(5);
    const [nbRound, setNbRound] =  useState(3);
    const [password, setPassword] =  useState('');

    const create = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = true;

        if (nbRound < 1) {
            toast.warning('Minimum 1 round');
            isValid = false;
        }
        if (nbQuestion < 2) {
            toast.warning('Minimum 2 questions per round');
            isValid = false;
        }
        if (visibility === QuizVisibilityEnum.PRIVATE && password.length === 0) {
            toast.warning('Password required');
            isValid = false;
        }

        if (isValid) {
            const payload : C2SCreatePayload = {
                category: category,
                difficulty: difficulty,
                nbQuestion: nbQuestion,
                nbRound: nbRound,
                visibility: visibility,
                password: visibility === QuizVisibilityEnum.PUBLIC ? '' : password
            };
            socket.emit(CreateEvent, payload);
        }
    }

    useEffect(() => {
        socket.on(CreateEvent, (S2Cpayload: S2CCreatePayload) => {
            const C2SPayload: C2SJoinPayload = {
                code: S2Cpayload.quiz.code,
                password: S2Cpayload.quiz.password
            }
            socket.emit(JoinEvent, C2SPayload);
        });

        return () => {
            socket.off(CreateEvent);
        };
    }, [setQuiz]);

    return (
        <>
            <h2>Create</h2>
            <Form onSubmit={create}>
                <InputGroup className="mb-2">
                    <InputGroup.Text>Category</InputGroup.Text>
                    {/* @ts-ignore */}
                    <FormSelect onChange={e => setCategory(e.target.value)} value={category}>
                        {Object.values(QuizCategoryEnum).map((value) => (
                            <option key={value} value={value}>{quizCategoryLabel[value]}</option>
                        ))}
                    </FormSelect>
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text>Difficulty</InputGroup.Text>
                    {/* @ts-ignore */}
                    <FormSelect onChange={e => setDifficulty(e.target.value)} value={difficulty}>
                        {Object.values(QuizDifficultyEnum).map((value) => (
                            <option key={value} value={value}>{quizDifficultyLabel[value]}</option>
                        ))}
                    </FormSelect>
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text id="basic-addon1">Number of rounds</InputGroup.Text>
                    {/* @ts-ignore */}
                    <FormControl type="number" value={nbRound} min={1} onChange={e => setNbRound(e.target.value)}/>
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text id="basic-addon1">Number of questions per round</InputGroup.Text>
                    {/* @ts-ignore */}
                    <FormControl type="number" value={nbQuestion} min={2} onChange={e => setNbQuestion(e.target.value)}/>
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text >Visibility</InputGroup.Text>
                    {/* @ts-ignore */}
                    <FormSelect onChange={e => setVisibility(e.target.value)} value={visibility}>
                        {Object.values(QuizVisibilityEnum).map((value) => (
                            <option key={value} value={value}>{quizVisibilityLabel[value]}</option>
                        ))}
                    </FormSelect>
                </InputGroup>
                {
                    visibility === QuizVisibilityEnum.PRIVATE && (
                        <InputGroup className="mb-2">
                            <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                            <FormControl
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </InputGroup>
                    )
                }
                <Button type="submit">Create<i className="bi bi-plus-circle ms-2"></i></Button>
            </Form>
        </>
    );
};

export default CreateQuiz;
