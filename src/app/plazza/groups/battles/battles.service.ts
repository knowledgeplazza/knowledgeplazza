import { Injectable } from '@angular/core';

import { Battle } from './battle.model';

import { FeathersService } from '^server/feathers.service';

@Injectable()
export class BattlesService extends FeathersService<Battle> {

  constructor() {
    super('battles');
  }

}
