import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { FeathersService } from '^server/feathers.service';
import { User, UserService } from '^server/user.service';

export class Stat {
  user: User;
  correct: number;
  answeredCount: number;
  categories: any;
}

@Injectable()
export class StatsService extends FeathersService<Stat> {
  private _userStats = Observable.defer(() => {
      return this.find({ user: this.user._id }); // Find on first subscribe
    }).map(value => {
      return value.data[0]; // there should only be one stat for a user, get the one
    }).multicast(() => new ReplaySubject<Stat>()) // Multicast so all subscribers get the result of the same server call
      .refCount(); // use refcount so the observable calls the server on the first subscribe

  constructor() {
    super('stats');
  }

  get userStats() {
    return this._userStats;
  }

}
