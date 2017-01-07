const setByDot = require('feathers-hooks-common/lib/utils').setByDot;
const getByDot = require('feathers-hooks-common/lib/utils').getByDot;

import hooks = require('feathers-hooks-common');

export function updateStat(
    service: string, parentField: string,
    categoryField = 'question.category', isCorrectFeild = 'isCorrect') {
    return hooks.combine(
        hooks.populate(statPopulate(service, parentField)),
        createStat(service, parentField),
        incrementStat(service, parentField, isCorrectFeild, categoryField),
    );
    }

export function statPopulate(service: string, parentField: string) {
    return {
        include: [
            {
                service,
                parentField,
                childField: '_id',
            },
        ],
    };
};

/// takes the stat object in the hook data and updates it, 
/// or 
/// note that this must be folowed with a patch to save the new stats?
export function incrementStat(
    service: string, parentField: string,
    categoryField = 'question.category', isCorrectFeild = 'isCorrect') {
    return function (hook) {
        let data = hook.data;
        let currentStat = hook.data.stat;

        let isCorrect = getByDot(data, isCorrectFeild);
        let category = getByDot(data, categoryField);

        let newStat = calculateNewStat(currentStat, isCorrect, category);
    };
}

/// creates a stat object if one doesn't exist in the hooks data 
/// and sets the parentField to the _id of the hook data object
export function createStat(service: string, parentField: string) {
    return hook => {
        if (!hook.data.stat) {
            return hook.app.service(service).create({ [parentField]: hook.data._id }).then(stat => {
                hook.data.stat = stat;

                return hook;
            });
        }
    };
}

// export function updateUserStats(app, user, correct, category) {
//     app.service('stats').find({
//         user: user._id,
//     }).then(batch => {
//         return batch.data[0];
//     }).then(stat => {
//         if (stat) {
//             let newStat = calculateNewStat(stat, correct, category);
//             app.service('stats').patch(newStat._id, newStat);
//         } else {
//             let firstStat = calculateNewStat({user: user._id}, correct, category);
//             app.service('stats').create(firstStat);
//         }
//     });
// }

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
