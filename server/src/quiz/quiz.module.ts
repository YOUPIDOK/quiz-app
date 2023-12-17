import { Module } from '@nestjs/common';
import { QuizGateway } from './quiz.gateway';
import {QuizService} from "./quiz.service";
import {PlayerService} from "../player/player.service";
import {PlayerModule} from "../player/player.module";

@Module({
  imports: [PlayerModule],
  providers: [QuizGateway, QuizService]
})
export class QuizModule {}
