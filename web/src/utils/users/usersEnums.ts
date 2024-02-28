export interface User {
	id: string;
	username: string;
	password: string;
	email: string;
	role: UserRole;
}

export enum UserType {
	ADMIN = 'admin',
	USER = 'user',
}

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}
