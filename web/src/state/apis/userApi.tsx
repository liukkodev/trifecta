import { ApiUrl } from '@state/stateUtils';
import { baseQuery } from '@state/apis/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: baseQuery(ApiUrl.USERS),
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getAllUsers: builder.query<string[], void>({
			query: () => '/',
			providesTags: [{ type: 'User', id: 'LIST' }],
		}),

		getUserById: builder.query<string, string>({
			query: (id) => `/${id}`,
			providesTags: (result, error, id) => [{ type: 'User', id }],
		}),
	}),
});
