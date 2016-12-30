import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { QuestionCategory } from '../question.model';

import { QuestionCategoryService } from '../question-category.service';

@Component({
  selector: 'app-question-browser',
  templateUrl: './question-browser.component.html',
  styleUrls: ['./question-browser.component.scss']
})
export class QuestionBrowserComponent implements OnInit {

  constructor(private categoryService: QuestionCategoryService,
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
