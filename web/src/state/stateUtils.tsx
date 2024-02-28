import { getAccessToken } from '@utils/auth/storeJwtUtils';

export enum ApiUrl {
	ROOT = 'http://localhost:3000',
	TASKS = `${ROOT}/tasks`,
	AUTH = `${ROOT}/auth`,
	USERS = `${ROOT}/users`,
	REFRESH = `${ROOT}/auth/refresh`,
}

export const headerWithAuth = (headers: Headers) => {
	const token = getAccessToken();
	if (token) {
		headers.set('authorization', `Bearer ${token}`);
	}

	return headers;
};

export interface NewTokens {
	access_token: string | undefined;
}

export interface PrepareHeadersProps {
	headers: Headers;
	token?: string;
}
