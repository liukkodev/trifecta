import { ApiUrl } from '@state/stateUtils';
import { baseQuery } from '@state/apis/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import { Task } from '@utils/tasks/tasksEnums';

export const taskApi = createApi({
	reducerPath: 'taskApi',
	baseQuery: baseQuery(ApiUrl.TASKS),
	tagTypes: ['Task'],
	endpoints: (builder) => ({
		getAllTasks: builder.query<Task[], void>({
			query: () => '/status/all',
			providesTags: [{ type: 'Task', id: 'LIST' }],
		}),

		getTaskById: builder.query<Task, string>({
			query: (id) => `/${id}`,
			providesTags: (result, error, id) => [{ type: 'Task', id }],
		}),

		createTask: builder.mutation<Task, Partial<Task>>({
			query: (task) => ({
				url: `/create`,
				method: 'POST',
				body: task,
			}),
			invalidatesTags: [{ type: 'Task', id: 'LIST' }],
		}),

		updateTask: builder.mutation<Task, Partial<Task>>({
			query: (task) => ({
				url: `/${task.id}`,
				method: 'PATCH',
				body: task,
			}),
			invalidatesTags: [{ type: 'Task', id: 'LIST' }],
		}),

		deleteTask: builder.mutation<void, string>({
			query: (id) => ({
				url: `/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Task', id: 'LIST' }],
		}),

		getPendingTasks: builder.query<Task[], void>({
			query: () => '/status/pending',
			providesTags: [{ type: 'Task', id: 'LIST' }],
		}),

		getInProgressTasks: builder.query<Task[], void>({
			query: () => '/status/in-progress',
			providesTags: [{ type: 'Task', id: 'LIST' }],
		}),

		getDoneTasks: builder.query<Task[], void>({
			query: () => '/status/done',
			providesTags: [{ type: 'Task', id: 'LIST' }],
		}),
	}),
});
