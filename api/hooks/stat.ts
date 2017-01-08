import globalHooks = require('../hooks');

import { getByDot, setByDot } from '../hooks';

import hooks = require('feathers-hooks-common');

export function updateStat(
    service: string, childField: string, parentField: string,
    categoryField = 'question.category', isCorrectFeild = 'isCorrect') {
    return hooks.combine(
        globalHooks.include({ // populate the current stat
            service,
            nameAs: 'stat',
            parentField,
            childField,
        }),
        createStat(service, childField, parentField), // or create it if it doesn't exist
        incrementStat(service, childField, categoryField, isCorrectFeild), // increment the counts in the stat 
        hook => {
            // commit new stat to the database
            let newStat = hook.data.stat;
            hook.app.service(service).patch(newStat._id, newStat);
        },
    );
    }

/// takes the stat object in the hook data and updates it, 
/// or 
/// note that this must be folowed with a patch to save the new stats?
export function incrementStat(
    service: string, childField: string,
    categoryField = 'question.category', isCorrectFeild = 'isCorrect') {
    return hook => {
        let data = hook.data;

        let isCorrect = getByDot(data, isCorrectFeild);
        let category = getByDot(data, categoryField);

        hook.data.stat = calculateNewStat(data.stat, isCorrect, category);
        return hook;
    };
}

/// creates a stat object if one doesn't exist in the hooks data 
/// and sets the childField to the value of parentField in the hook data object
export function createStat(service: string, childField: string, parentField: string) {
    return hook => {
        if (!hook.data.stat) {
            return hook.app.service(service).create({ [childField]: getByDot(hook.data, parentField) }).then(stat => {
                hook.data.stat = stat;

                return hook;
            });
        }
    };
}

function calculateNewStat(stat, isCorrect: boolean, category?: string) {
    if (isCorrect) {
        incrementByDot(stat, 'correct');
        if (category) {
            incrementByDot(stat, 'categories.' + category + '.correct');
        }
    }
    incrementByDot(stat, 'answeredCount');
    if (category) {
        incrementByDot(stat, 'categories.' + category + '.answeredCount');
    }

    return stat;
}

// adds one to the value at path, creating it if it doesn't exist
function incrementByDot(obj, path) {
    let current = getByDot(obj, path);
    if (!current) { current = 0; }
    setByDot(obj, path, current + 1);
}
