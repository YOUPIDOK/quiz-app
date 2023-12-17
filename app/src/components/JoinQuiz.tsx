"use client";
import React, { useState } from 'react';
import {toast} from "react-toastify";
import {useAppContext} from "@/context/AppContext";
import {JoinEvent} from "shared/src/quiz/events";
import {C2SJoinPayload} from "shared/src/quiz/payload";
import {CODE_SIZE} from "shared/src/quiz/const";
import {Button, FormControl, InputGroup} from "react-bootstrap";

const JoinQuiz = () => {
    const {socket} = useAppContext();
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const upperCaseCode = e.target.value.toUpperCase();
        const validCode = upperCaseCode.replace(/[^A-Z0-9]/gi, ''); // Enlève tout ce qui n'est pas une lettre ou un chiffre
        setCode(validCode.slice(0, CODE_SIZE));
    };

    const join = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = true;
        if (code.length === 0) {
            toast.warning('Code required');
            isValid = false;
        }
        if (isValid) {
            const payload: C2SJoinPayload = {
                code,
                password
            }
            socket.emit(JoinEvent, payload);
        }
    };

    return (
        <>
            <h2>Join</h2>
            <form onSubmit={join}>
                <div>
                    <InputGroup className="mb-2">
                        <InputGroup.Text id="basic-addon1">Code</InputGroup.Text>
                        <FormControl
                            type="text"
                            placeholder="ABCD1234"
                            id="code"
                            name="code"
                            value={code}
                            onChange={handleCodeChange}
                        />
                    </InputGroup>

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
                </div>

                <Button type="submit" variant="primary">
                    Join <i className="bi bi-box-arrow-in-right"></i>
                </Button>
            </form>
        </>
    );
};

export default JoinQuiz;
