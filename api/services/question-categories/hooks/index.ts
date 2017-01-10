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
      populateStat('stats', 'userStats'),
      compute({
        // stat for specific categories
        stat: (item, hook) => item.userStats.categories[item.name],
      }),
      hooks.serialize({
        exclude: ['userStats', 'user'], // get rid of the stat, we just need the category properties
        computed: {
          percentCorrect: item => {
            return item.stat ? item.correct / item.answeredCount : 0;
          },
        },
      }),
    ],
  },
};
