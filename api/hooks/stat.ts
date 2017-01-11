import globalHooks = require('../hooks');

import { getByDot, incrementByDot, setByDot } from '../hooks';

import hooks = require('feathers-hooks-common');

export function updateStat(
    service = 'stats', nameAs = 'stat', childField = 'user', parentField = 'user',
    categoryField = 'question.category', isCorrectFeild = 'isCorrect') {
    return hooks.combine(
        populateStat(service, nameAs, parentField, childField), // populate current stat
        createStat(service, nameAs, childField, parentField), // or create it if it doesn't exist
        incrementStat(service, nameAs, childField, categoryField, isCorrectFeild), // increment the counts in the stat 
        hook => {
            // commit new stat to the database
            let newStat = hook.data[nameAs];
            hook.app.service(service).patch(newStat._id, newStat);
        },
    );
}

export function populateStat(
    service = 'stats', nameAs = 'stat', childField = 'user', parentField = 'user') {
    return globalHooks.include({ // populate the current stat
        service,
        nameAs,
        parentField,
        childField,
    });
}

/// takes the stat object in the hook data and updates it, 
/// or 
/// note that this must be folowed with a patch to save the new stats?
export function incrementStat(
    service: string, nameAs: string, childField: string,
    categoryField = 'question.category', isCorrectFeild = 'isCorrect') {
    return hook => {
        let data = hook.data;

        let isCorrect = getByDot(data, isCorrectFeild);
        let category = getByDot(data, categoryField);

        hook.data[nameAs] = calculateNewStat(data[nameAs], isCorrect, category);
        return hook;
    };
}

/// creates a stat object if one doesn't exist in the hooks data 
/// and sets the childField to the value of parentField in the hook data object
export function createStat(service: string, nameAs: string, childField: string, parentField: string) {
    return hook => {
        if (!hook.data[nameAs] && !hook.data[nameAs]._id) {
            // feathers populated an empty array, so create a new stat value
            return hook.app.service(service).create({ [childField]: getByDot(hook.data, parentField) }).then(stat => {
                hook.data[nameAs] = stat;

                return hook;
            });
        }
    };
}

function calculateNewStat(stat, isCorrect: boolean, category?: string) {
    let categoryPath = 'categories.' + category;

    incrementByDot(stat, 'correct', isCorrect ? 1 : 0);
    incrementByDot(stat, 'answeredCount');

    if (category) {
        incrementByDot(stat, categoryPath + '.correct', isCorrect ? 1 : 0);
        incrementByDot(stat, categoryPath + '.answeredCount');
    }

    return stat;
}

