import { decrementByDot, setByDot } from './helper';

/**
 * updates the unlock countdown on a stat
 * assumes stat and user properties on hook data
 * @export
 * @returns
 */
export function updateUnlockCountdown() {
  return hook => {
    let stat = hook.data.stat;
    let user = hook.data.user;

    // decrement countdown
    let atZero = decrementByDot(stat, 'countdown');

    if (atZero) {
      // Awesome! unlock the next archive item
      hook.app.service('archive-items').create({user});

      // magic equation for calcuating item unlocks;      
      const nextUnlock = Math.floor(Math.pow(stat.answeredCount + 4, 2 / 3));
      setByDot(stat, 'countdown', nextUnlock);
    }
    return hook;
  };
}
