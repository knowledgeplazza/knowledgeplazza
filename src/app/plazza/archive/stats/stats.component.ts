import { Component, OnInit } from '@angular/core';
import { StatsService, Stat } from './stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent implements OnInit {
  public userStats;

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.statsService.userStats.subscribe((userStats) => {
      this.userStats = userStats;
    });
  }

  get categories() {
    if (!this.userStats) { return []; }

    let categories = this.userStats.categories;
    return Object.keys(categories).sort((a, b) => {
      return categories[a].correct - categories[b].correct; // sort: most correct category first
    });
  }

  categoryStat(category: string) {
    return this.userStats.categories[category];
  }

}
