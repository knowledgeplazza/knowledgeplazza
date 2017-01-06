import { User } from './user';

export class Group {
    _id: string;
    name: string;
    members: User[];
}
