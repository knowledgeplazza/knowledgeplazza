export class Person {
    username: string;
}

export class Group {
    _id: string;
    name: string;
    members: Person[];
}
