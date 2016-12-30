import hooks = require('./hooks');
import { updateUserStats } from '../stat/hooks/stat';

export class Service {
  constructor(private app) {
  }

  find(params) {
    return Promise.resolve([]);
  }

  get(id, params) {
    return Promise.resolve({
      id,
      text: `A new message with ID: ${id}!`,
    });
  }

  create(data, params) {
    let questionId = data.questionId;

    return this.app.service('questions').get(questionId).then(question => {
      // TODO: real type
      let returnData: any = {};

      let isCorrect = (data.chosenAnswer === question.correctAnswer);
      returnData.isCorrect = isCorrect;

      // calculate new stats before returning
      returnData.stat = updateUserStats(this.app, params.user, isCorrect, question.category);

      returnData.correctAnswer = question.correctAnswer;

      return returnData;
    });

  }

  update(id, data, params) {
    return Promise.resolve(data);
  }

  patch(id, data, params) {
    return Promise.resolve(data);
  }

  remove(id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/check-questions', new Service(app));

  // Get our initialize service to that we can bind hooks
  const checkQuestionService = app.service('/check-questions');

  // Set up our before hooks
  checkQuestionService.before(hooks.before);

  // Set up our after hooks
  checkQuestionService.after(hooks.after);
};
