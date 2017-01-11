import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { QuestionCategory } from 'models/question-category';

import { StatsService } from '../../plazza/archive/stats/stats.service';
import { QuestionCategoryService } from '../question-category.service';

@Component({
  selector: 'app-question-browser',
  templateUrl: './question-browser.component.html',
  styleUrls: ['./question-browser.component.scss'],
})
export class QuestionBrowserComponent implements OnInit {

  private categories;
  private stats;

  constructor(
    private categoryService: QuestionCategoryService,
    private statsService: StatsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.categoryService.items.subscribe(categories => {
      this.categories = categories.sort((a, b) => a.percentCorrect - b.percentCorrect);
    });
    this.statsService.userStats.subscribe(stats => {
      this.stats = stats;
    });
  }

  showQuestion(category) {
    this.router.navigate(['../question', ''], {relativeTo: this.route, queryParams: {category: category.name}});
  }

}
