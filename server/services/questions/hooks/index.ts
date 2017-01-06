import { getRandom } from '../../../hooks';
import hooks = require('feathers-hooks-common');

export = {
  before: {
    all: [],
    find: [getRandom({service: 'questions'})],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [hooks.remove('correctAnswer')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
