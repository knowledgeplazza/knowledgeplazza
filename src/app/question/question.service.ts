import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FeathersService } from '^server/feathers.service';
import { Question } from './question.model';

@Injectable()
export class QuestionService extends FeathersService<Question> {
  constructor() {
    super('questions');
  }

  /// helper method to get the next question
  nextQuestion(category?: string, currentId?: string) {
    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (currentId) {
      query._id = { $ne: currentId };
    }

    return this.random(query).first();
  }

}
