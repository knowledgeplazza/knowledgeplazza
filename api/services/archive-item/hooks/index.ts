import globalHooks = require('../../../hooks');
import hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;

import itemSource = require('../items');

function assignArchiveItem() {
  return hook => {
    Object.assign(hook.data, itemSource.randomItem());
  };
}

export = {
  before: {
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
    ],
    find: [auth.queryWithCurrentUser({ idField: '_id', as: 'user_id' })],
    get: [],
    create: [
      assignArchiveItem(),
      auth.associateCurrentUser({ idField: '_id', as: 'user_id' }),
      hooks.setCreatedAt('unlockedAt'),
    ],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
