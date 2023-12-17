'use client';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';
import {IQuiz} from 'shared/src/quiz/interface';
import {C2SLeavePayload, S2CJoinPayload} from 'shared/src/quiz/payload'
import {JoinEvent, LeaveEvent} from 'shared/src/quiz/events'
import {QuizStepEnum} from 'shared/src/quiz/enum'
import {toast} from "react-toastify";

interface IMessagesContext {
    socket: Socket;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    quiz: IQuiz|null,
    setQuiz: React.Dispatch<React.SetStateAction<IQuiz|null>>
}

const AppContext = createContext<IMessagesContext | undefined>(undefined);

// @ts-ignore
export const AppProvider: React.FC = ({ children }) => {
    const [socket, setSocket] =  useState<Socket>(io('http://localhost:3000'));
    const [username, setUsername] =  useState<string>('');
    const [quiz, setQuiz] =  useState<IQuiz|null>(null);

    useEffect(() => {
        socket.on(JoinEvent, (payload: S2CJoinPayload) => {
            if (payload.success) {
                setQuiz(payload.quiz);
            } else {
                toast.warning(payload.error);
            }
        });

        return () => {
            socket.off(JoinEvent);
        };
    }, [setQuiz]);

    return (
        <AppContext.Provider value={{socket, username, setUsername, quiz, setQuiz}}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};