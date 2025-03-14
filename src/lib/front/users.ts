import { User } from './user';

export class Users {
	users: User[] = [];
	constructor() {}

	fromServer(user: any): Users {
		let users = user.map((user: any) => User.fromJSON(user));
		this.users = users.sort((a: User, b: User) => b.points - a.points);
		console.log(this.users);
		return this;
	}

	addNewUser(user: User): Users {
		this.users.push(user);
		this.users = this.users.sort((a: User, b: User) => b.points - a.points);
		return this;
	}

	toJson() {
		return this.users.map((user: User) => user.toJSON());
	}
}
