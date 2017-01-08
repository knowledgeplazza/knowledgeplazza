import globalHooks = require('../../../hooks');
import hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;

const ownerField = 'owner';
const idField = '_id';

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
    find: [auth.queryWithCurrentUser({ idField, as: ownerField })],
    get: [],
    create: [
      hooks.setCreatedAt(),
      auth.associateCurrentUser({ idField, as: ownerField }),
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
