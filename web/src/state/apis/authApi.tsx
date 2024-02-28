import { ApiUrl } from '@state/stateUtils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	LoginFormValues,
	LoginResponse,
	RegisterFormValues,
} from '@pages/Auth/authUtils';
import { User } from '@utils/users/usersEnums';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: ApiUrl.AUTH,
		credentials: 'include',
	}),
	tagTypes: ['Auth'],
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse['data'], LoginFormValues>({
			query: (credentials) => ({
				url: '/login',
				method: 'POST',
				body: credentials,
			}),
		}),

		register: builder.mutation<Partial<User>, RegisterFormValues>({
			query: (credentials) => ({
				url: '/register',
				method: 'POST',
				body: credentials,
			}),
		}),

		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/logout',
				method: 'POST',
			}),
		}),
	}),
});
