import { compute, populateResult } from '../../../hooks';
import { populateStat } from '../../../hooks/stat';
const auth = require('feathers-authentication').hooks;
import hooks = require('feathers-hooks-common');

export = {
  before: {
    find: [auth.queryWithCurrentUser({ idField: '_id', as: 'user' })], // get current user so we can do user stats],
  },
  after: {
    find: [
      compute({
        user: (item, hook) => hook.params.query.user,
      }),
      populateStat(),
      hooks.serialize({
        exclude: ['stat'], // get rid of the stat, we just need the category properties
        computed: {
          correct: item => item.stat.categories[item.name].correct,
          answeredCount: item => item.stat.categories[item.name].answeredCount,
        },
      }),
    ],
  },
};
