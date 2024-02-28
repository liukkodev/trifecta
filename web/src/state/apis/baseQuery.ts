import { ApiUrl, NewTokens, PrepareHeadersProps } from '@state/stateUtils';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import {
	getAccessToken,
	storeAccessToken,
	setLastTokenRefresh,
} from '@utils/auth/storeJwtUtils';

const prepareHeaders = (props: PrepareHeadersProps) => {
	const { headers, token } = props;

	headers.set('Content-Type', 'application/json');
	headers.set('Access-Control-Allow-Origin', '*');
	if (token) {
		headers.set('authorization', `Bearer ${token}`);
	}
	return headers;
};

export const baseQuery = (baseUrl: ApiUrl) => {
	return async (args: any, api: any, extraOptions: any) => {
		const result = await fetchBaseQuery({
			baseUrl: baseUrl,
			credentials: 'include',
			prepareHeaders: (headers) => {
				const token: string = getAccessToken() || '';
				return prepareHeaders({ headers, token });
			},
		})(args, api, extraOptions);

		// UNAUTHORIZED
		if (result.error?.status === 401) {
			let newTokens: NewTokens;

			// Refresh the token
			try {
				const refreshResponse = await fetch(`${ApiUrl.REFRESH}`, {
					method: 'POST',
					credentials: 'include',
					headers: prepareHeaders({ headers: new Headers() }),
				});
				newTokens = await refreshResponse.json();
			} catch (error) {
				console.error('Failed to refresh token:', error);
				return result;
			}

			// If successful, retry the original request
			if (newTokens && newTokens.access_token) {
				const retryResult = await fetchBaseQuery({
					baseUrl: baseUrl,
					credentials: 'include',
					prepareHeaders: (headers) => {
						const newAccessToken: string = newTokens.access_token!;

						return prepareHeaders({ headers, token: newAccessToken });
					},
				})(args, api, extraOptions);

				storeAccessToken(newTokens.access_token);
				setLastTokenRefresh();

				return retryResult;
			}
		}

		return result;
	};
};

export default baseQuery;
