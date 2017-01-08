// Add any common hooks you want to share across services in here.
// 
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

import _ = require('lodash');
import hooks = require('feathers-hooks-common');
import utils = require('feathers-hooks-common/lib/utils');

export function requireString(property) {
  return hook => {
    // TODO: this should be replaced by real validation logic
    // Throw error if string field does not exist or is empty
    try {
      if (hook.data[property].length === 0) {
        throw new Error('Property ' + property + ' must have content');
      }
    } catch (err) {
      throw new Error('Must have property ' + property);
    }
  };
};

// get random item
// Ex: query = { $random: 1 } should return one random item
export function getRandom(options) {
  return hook => {
    const query = hook.params.query;
    if (query && query.$random > 0) {
      const numResults = query.$random;
      hook.params.query = _.omit(query, '$random');
      hook.result = hook.app.service(options.service).find(hook.params).then(result => {
        return _.sampleSize(result.data, numResults);
      });
    }
    return hook;
  };
};

// shortcut for hooks.populate({schema: {include: []}})
export function include(list: any[] | any) {
  if (Array.isArray(list)) {
    return hooks.populate({schema: {include: list}});
  } else {
    // not passed an array, so wrap in one 
    return hooks.populate({schema: {include: [list]}});
  }
}

// shortcut for hooks.serialize({computed: {}})
export function compute(values: any) {
  return hooks.serialize({ computed: values });
}

/// Make sure that the values in an array are unique
/// Options: {path: **pathToGetArrayFrom**, uniqueBy: **valueOfObjectsInArrayToCompare}
export function enforceUnique(path: string, uniqueBy?: string) {
  if (!uniqueBy) { uniqueBy = '_id'; }

  return hook => {
    const values = utils.getByDot(hook.data, path);
    utils.setByDot(hook.data, path, _.uniqBy(values, uniqueBy));
    return hook;
  };
};

export function searchRegex(flags) {
  return hook => {
    const query = hook.params.query;
    for (let field in query) {
      if (query[field].$search && field.indexOf('$') === -1) {
        try {
          let expr = new RegExp(query[field].$search, flags);
          query[field] = { $regex: expr };
        } catch (error) {
          query[field] = {};
        }
      }
    }
    hook.params.query = query;
    return hook;
  };
};
