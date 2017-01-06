import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { QuestionCategory } from 'models/question-category';

import { QuestionCategoryService } from '../question-category.service';

@Component({
  selector: 'app-question-browser',
  templateUrl: './question-browser.component.html',
  styleUrls: ['./question-browser.component.scss'],
})
export class QuestionBrowserComponent implements OnInit {

  constructor(
    private categoryService: QuestionCategoryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  get categories() {
    return this.categoryService.items;
  }

  showQuestion(category) {
    this.router.navigate(['../question', ''], {relativeTo: this.route, queryParams: {'category': category.name}});
  }

}
