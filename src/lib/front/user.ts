export class User {
	name: string;
	email: string;
	company: string;
	points: number = 0;
	constructor(name: string, email: string, company: string) {
		this.name = name;
		this.email = email;
		this.company = company;
	}

    static fromJSON(json: any): User {
        const user = new User(json.name, json.email, json.company);
        user.points = json.points;
        return user;
    }

	toJSON() {
		return {
			name: this.name,
			email: this.email,
			company: this.company,
			points: this.points
		};
	}

}
