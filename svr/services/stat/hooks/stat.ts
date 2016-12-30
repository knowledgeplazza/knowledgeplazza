const setByDot = require('feathers-hooks-common/lib/utils').setByDot;
const getByDot = require('feathers-hooks-common/lib/utils').getByDot;

export function updateUserStats(app, user, correct, category) {
    app.service('stats').find({
        user: user._id,
    }).then(batch => {
        return batch.data[0];
    }).then(stat => {
        if (stat) {
            let newStat = exports.updateStat(stat, correct, category);
            app.service('stats').patch(newStat._id, newStat);
        } else {
            let firstStat = exports.updateStat({user: user._id}, correct, category);
            app.service('stats').create(firstStat);
        }
    });
}

export function updateStat(stat, isCorrect, category) {
    if (isCorrect) {
        exports.incrementByDot(stat, 'correct');
        exports.incrementByDot(stat, 'categories.' + category + '.correct');
    }
    exports.incrementByDot(stat, 'answeredCount');
    exports.incrementByDot(stat, 'categories.' + category + '.answeredCount');

    return stat;
}

// adds one to the value at path, creating it if it doesn't exist
export function incrementByDot(obj, path) {
    let current = getByDot(obj, path);
    if (!current) { current = 0; }
    setByDot(obj, path, current + 1);
}
