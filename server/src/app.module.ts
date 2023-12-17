import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import {ConfigModule} from "@nestjs/config";
import {PlayerModule} from "./player/player.module";

@Module({
  imports: [ConfigModule.forRoot(), PlayerModule, QuizModule],
})
export class AppModule {}
