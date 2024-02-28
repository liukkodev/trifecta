import { authApi } from './apis/authApi';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { taskApi } from './apis/taskApi';
import { userApi } from './apis/userApi';

const reducer = combineReducers({
	[taskApi.reducerPath]: taskApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
});

const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			taskApi.middleware,
			authApi.middleware,
			userApi.middleware
		),
});

export default store;
