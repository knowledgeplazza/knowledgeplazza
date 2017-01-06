import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Group } from 'models/group';
import { User } from 'models/user';

import { FeathersService } from '^server/feathers.service';

@Injectable()
export class GroupsService extends FeathersService<Group> {

  constructor() {
    super('groups');
  }

  create(name: string) {
    return super.create({ name });
  }

  addMember(group: Group, person: User) {
    let members = group.members;
    members.push(person);
    return super.patch(group._id, { members });
  }

  removeAt(group: Group, index: number) {
    let members = group.members;
    members.splice(index, 1);
    return super.patch(group._id, { members });
  }

}
