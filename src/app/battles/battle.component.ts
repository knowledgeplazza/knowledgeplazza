import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BattlesService } from 'app/battles/battles.service';

import { Battle } from 'models/battle';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
})
export class BattleComponent implements OnInit {
  public battle: Battle;

  constructor(
    private activatedRoute: ActivatedRoute,
    private battlesService: BattlesService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.switchMap(params => {

      return this.battlesService.get(params['id']);
    }).subscribe(battle => {
      this.battle = battle;
    });
  }
}
