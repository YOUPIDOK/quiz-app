import {IQuiz} from "./interface";
import {QuizCategoryEnum, QuizDifficultyEnum, QuizVisibilityEnum} from "./enum";

export interface C2SCreatePayload {
    nbQuestion: number,
    nbRound: number,
    category: QuizCategoryEnum,
    difficulty: QuizDifficultyEnum,
    visibility: QuizVisibilityEnum
    password: string
}

export interface S2CCreatePayload {
    quiz: IQuiz
}

export interface C2SJoinPayload {
    code: string,
    password: null|string
}

export interface S2CJoinPayload {
    success: boolean,
    error: string,
    quiz: IQuiz
}

export interface C2SStartPayload {
    code: string
}

export interface S2CUpdatePayload {
    quiz: IQuiz
}

export interface C2SAnswerPayload {
    code: string,
    round: number
    question: number,
    answerId: number
}

export interface C2SLeavePayload {
    code: string
}