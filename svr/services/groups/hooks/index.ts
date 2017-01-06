import { enforceUnique, requireString } from '../../../hooks';
import hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;

const ownerField = 'owner';
const idField = '_id';

export = {
  before: {
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
    ],
    // TODO: only show groups that you are a member of
    find: [auth.queryWithCurrentUser({ idField, as: ownerField })],
    // TODO: only show groups that you are a member of
    get: [auth.restrictToOwner({ idField,  ownerField })],
    create: [
      requireString('name'),
      auth.associateCurrentUser({ idField, as: ownerField }),
      enforceUnique('members'),
    ],
    update: [
      auth.restrictToOwner({ idField,  ownerField }),
      enforceUnique('members'),
    ],
    patch: [
      auth.restrictToOwner({ idField,  ownerField }),
      enforceUnique('members'),
    ],
    remove: [auth.restrictToOwner({ idField,  ownerField })],
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
