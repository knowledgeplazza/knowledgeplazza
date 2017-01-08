import utils = require('feathers-hooks-common/lib/utils');
import hooks = require('feathers-hooks-common');

export const getByDot = utils.getByDot;
export const setByDot = utils.setByDot;

/**
 * adds one to the value at path, creating it if it doesn't exist
 * 
 * @export
 * @param {any} obj
 * @param {any} path
 */
export function incrementByDot(obj, path: string) {
    let current = getByDot(obj, path);
    if (!current) { current = 0; }
    setByDot(obj, path, current + 1);
}

/**
 * subtracts one to the value at path, creating it if it doesn't exist
 * 
 * @export
 * @param {any} obj
 * @param {any} path
 * @returns {boolean} Returns 'true' if new value was decremented to zero
 */
export function decrementByDot(obj, path: string) {
    let current = getByDot(obj, path);
    if (!current) { current = 0; }
    current -= 1;
    setByDot(obj, path, current);

    return current <= 0;
}

/**
 * shortcut for hooks.populate({schema: {include: []}})
 * 
 * @export
 * @param {(any[] | any)} list
 * @returns
 */
export function include(list: any[] | any) {
  if (Array.isArray(list)) {
    return hooks.populate({schema: {include: list}});
  } else {
    // not passed an array, so wrap in one 
    return hooks.populate({schema: {include: [list]}});
  }
}

/**
 * shortcut for hooks.serialize({computed: {}})
 * 
 * @export
 * @param {*} values
 * @returns hook function
 */
export function compute(values: any) {
  return hooks.serialize({ computed: values });
}
