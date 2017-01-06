import globalHooks = require('../../../hooks');
import hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;
import utils = require('feathers-hooks-common/lib/utils');

function setName() {
  return hook => {
    const name = utils.getByDot(hook.data, 'group.name');
    utils.setByDot(hook, 'data.name', name);
  };
}

export = {
  before: {
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [setName()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
