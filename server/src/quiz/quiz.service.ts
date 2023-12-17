import { Injectable } from '@nestjs/common';
import {IQuiz} from 'shared/src/quiz/interface';
import {IPlayer} from 'shared/src/player/interface';
import {CODE_SIZE} from 'shared/dist/quiz/const.js'
@Injectable()
export class QuizService {
    private quizs: IQuiz[] = [];

    insert(quiz: IQuiz): IQuiz {
        this.quizs[quiz.code] = quiz;

        return quiz;
    }

    findByCode(code: string): IQuiz|undefined  {
        return this.quizs[code]
    }

    update(quiz: IQuiz): IQuiz {
        this.quizs[quiz.code] = quiz;

        return quiz;
    }

    join(code: string, player: IPlayer): IQuiz {
        const alreadyJoin = this.quizs[code].players.find(quizPlayer => quizPlayer.clientId === player.clientId) !== undefined;

        if (!alreadyJoin) {
            this.quizs[code].players.push(player);
        }

        return this.quizs[code];
    }

    leave(code: string, player: IPlayer): IQuiz {
        this.quizs[code].players = this.quizs[code].players.filter(p => player.clientId !== p.clientId);

        return this.quizs[code];
    }

    generateCode(): string {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        let code = '';
        let isValidCode = false;

        while (!isValidCode) {
            for (let i = 0; i < CODE_SIZE; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                code += charset[randomIndex];
            }

            if (this.findByCode(code) === undefined) {
                isValidCode = true;
            } else {
                code = '';
            }
        }

        return code;
    }

    delete(code: string) {
        this.quizs = this.quizs.filter(quiz => quiz.code !== code);
    }
}
