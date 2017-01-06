import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Group } from 'models/group';
import { GroupsService } from '../groups.service';

import { BattlesService } from '^battles/battles.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupsListComponent implements OnInit {

  constructor(
    private groupsService: GroupsService,
    private battlesService: BattlesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  get groups() {
    return this.groupsService.items;
  }

  addGroup() {
    this.groupsService
      .create('UnnamedGroup')
      .take(1)
      .subscribe((newGroup: Group) => {
        this.openGroup(newGroup._id);
      });
  }

  openGroup(id: string) {
    this.router.navigate(['../group', id], {relativeTo: this.route});
  }

  battle() {
    this.battlesService.battleNow();
  }
}
