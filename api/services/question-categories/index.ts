import hooks = require('./hooks');
import tools = require('./question-categories');

export class Service {
  private app;
  private questionCategories: any[];

  constructor(private options = {}) {
  }

  setup(app) {
    this.app = app;
  }

  find(params) {
    // TODO: 
    // if (!this.questionCategories) {
    this.questionCategories = tools.calculateQuestionCategories(this.app);
    // }

    return this.questionCategories;
  }
}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/question-categories', new Service());

  // Get our initialize service to that we can bind hooks
  const questionCategoriesService = app.service('/question-categories');

  // Set up our before hooks
  questionCategoriesService.before(hooks.before);

  // Set up our after hooks
  questionCategoriesService.after(hooks.after);

};
