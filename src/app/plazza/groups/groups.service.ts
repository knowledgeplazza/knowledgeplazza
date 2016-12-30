import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Person, Group } from './groups.model';

import { FeathersService } from '^server/feathers.service';

@Injectable()
export class GroupsService extends FeathersService<Group> {

  constructor() {
    super('groups');
  }

  create(name: string) {
    return super.create({
      'name': name
    });
  }

  addMember(group: Group, person: Person) {
    group.members.push(person);
    return super.patch(group._id, { members: group.members});
  }

  removeAt(group: Group, index: number) {
    group.members.splice(index, 1);
    return super.patch(group._id, { members: group.members});
  }

}
