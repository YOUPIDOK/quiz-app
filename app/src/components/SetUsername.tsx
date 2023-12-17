"use client";

import {Button, FormControl, InputGroup} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useAppContext} from "@/context/AppContext";
import {toast} from "react-toastify";
import {S2CSetUsernamePayload, C2SSetUsernamePayload} from "shared/src/player/payload";
import {SetUsernameEvent} from "shared/src/player/events";

const SetUsername = () => {
    const { socket, setUsername, username } = useAppContext();
    const [cusername, setCusername] = useState('');

    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault();
        if (cusername.length === 0) {
            toast.warning('Username required');
        } else {
            const payload: C2SSetUsernamePayload = {
                username: cusername
            }
            socket.emit(SetUsernameEvent, payload);
        }
    };

    useEffect(() => {
        socket.on(SetUsernameEvent, (payload: S2CSetUsernamePayload) => {
            if (payload.isSet) {
                toast.success(`Hello ${cusername}`);
                setUsername(cusername);
                socket.off(SetUsernameEvent);
            } else {
                toast.warning(`Username ${cusername} already exists`);
            }
        });

        return () => {
            socket.off(SetUsernameEvent);
        };
    }, [setUsername, cusername, socket]);

    return (
        <>
            {
                username === '' && (
                    <div className="container d-flex align-items-center justify-content-center vh-100">
                        <div className="card p-4">
                            <h1>Quiz App</h1>
                            <div className="text-muted fw-bold my-2">Enter your username</div>
                            <form onSubmit={handleSubmit}>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1"><i className="bi bi-person-fill"></i></InputGroup.Text>
                                    <FormControl
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        value={cusername}
                                        onChange={(e) => setCusername(e.target.value.trim())}
                                        required
                                    />
                                    <Button type="submit" variant="primary">
                                        Save
                                    </Button>
                                </InputGroup>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default SetUsername;
