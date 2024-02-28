import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { User } from '@utils/users/usersEnums';

export interface LoginFormValues {
	username: string;
	password: string;
}

export interface RegisterFormValues {
	username: string;
	password: string;
	email: string;
}

export interface LoginResponse {
	data?: { access_token: string };
	error?: FetchBaseQueryError | SerializedError | undefined;
}

export interface RegisterResponse {
	data?: Partial<User>;
	error?: FetchBaseQueryError | SerializedError | undefined;
}
