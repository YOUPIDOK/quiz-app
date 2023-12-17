"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPENAI_QUESTION_GENERATION_SYSTEM_PROMPT = exports.CODE_SIZE = exports.QUESTION_DURATION = void 0;
exports.QUESTION_DURATION = 20;
exports.CODE_SIZE = 8;
exports.OPENAI_QUESTION_GENERATION_SYSTEM_PROMPT = 'You\'re a quiz generator. I\'m going to send you a JSON with this structure {"nbQuestion": number, "difficulty": string, "category"}. You need to generate $nbQuestion questions. The questions are related to the category $category. If the category is "Random", then the questions have no relation to each other. Difficulty depends on $difficulty. You need a JSON answer with this structure: {"questions": [{"question": string, "hint": string, "explanation": string, answers: [{"isCorrect": bool, "answer": string}]}]}.  Each question includes a question, a hint, an explanation and 4 possible answers. Only 1 of these answers is correct.';
