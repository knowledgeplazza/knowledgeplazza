import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FeathersService } from '^server/feathers.service';
import { Question } from './question.model';

export class QuestionCheckData {
  isCorrect: boolean;
  stat: any;
  correctAnswer: number;
}

@Injectable()
export class QuestionCheckService extends FeathersService<QuestionCheckData> {

  constructor() {
    super('check-questions');
  }

  checkQuestion(question: Question, chosenAnswer: number) {
    return this.create({
      questionId: question._id,
      'chosenAnswer': chosenAnswer
    });
  }
}
