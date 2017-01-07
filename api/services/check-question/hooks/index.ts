import globalHooks = require('../../../hooks');
import hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;
import { updateStat } from '../../../hooks/stat';

const populateSchema = {
  include: [
    {
      service: 'questions',
      nameAs: 'question',
      parentField: 'questionId',
      childField: '_id',
      query: {
        $select: ['correctAnswer', 'category'],
      },
    },
  ],
};

const serializeSchema = {
  computed: {
    isCorrect: (item, hook) => {
      return item.chosenAnswer === +item.question.correctAnswer;
    },
    correctAnswer: (item, hook) => {
      return +item.question.correctAnswer;
    },
  },
};

export = {
  before: {
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
    ],
    find: [],
    get: [],
    create: [hooks.populate({schema: populateSchema}), hooks.serialize(serializeSchema)],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [updateStat('users', 'user')],
    update: [],
    patch: [],
    remove: [],
  },
};
