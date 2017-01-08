import globalHooks = require('../../../hooks');
import hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;

function calcName() {

  return hooks.serialize({
    computed: {
      name: () => 'A Battle',
    },
  });
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
    create: [
      hooks.setCreatedAt(),
      auth.associateCurrentUser({ idField: '_id', as: 'owner' }),
    ],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [calcName()],
    get: [calcName()],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
