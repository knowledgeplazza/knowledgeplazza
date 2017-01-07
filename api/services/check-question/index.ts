import hooks = require('./hooks');
import { updateUserStats } from '../stat/hooks/stat';

export class Service {
  constructor(private app) {
  }

  find(params) {
    return Promise.reject('only create is allowed on question-check');
  }

  get(id, params) {
    return Promise.reject('only create is allowed on question-check');
  }

  create(data, params) {
    // calculate new stats before returning
    data.stat = updateUserStats(this.app, params.user, data.isCorrect, data.question.category);

    return Promise.resolve(data);

  }

  update(id, data, params) {
    return Promise.reject('only create is allowed on question-check');
  }

  patch(id, data, params) {
    return Promise.reject('only create is allowed on question-check');
  }

  remove(id, params) {
    return Promise.reject('only create is allowed on question-check');
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
