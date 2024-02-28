import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Task, TaskStatus, TaskUrgency } from '@utils/tasks/tasksEnums';

export interface CreateTaskFormProps {
	status: TaskStatus;
	close: () => void;
}

export interface ColumnHeadingProps {
	status: TaskStatus;
}

export interface CreateTaskFormValues {
	title: string;
	description: string;
	assignedTo: string;
	urgency: TaskUrgency;
	status: TaskStatus;
}

export interface CreateTaskResponse {
	data?: Task;
	error?: FetchBaseQueryError | SerializedError | undefined;
}

export interface TaskItemProps {
	id: string;
	title: string;
	description: string;
	assignedTo: string;
	urgency: TaskUrgency;
}
export interface TasksListProps {
	tasks?: Task[];
}

export function urgencyTextColor(urgency: TaskUrgency) {
	switch (urgency) {
		case TaskUrgency.LOW:
			return 'green';
		case TaskUrgency.MEDIUM:
			return 'yellow';
		case TaskUrgency.HIGH:
			return 'red';
		default:
			return 'green';
	}
}

export function readableCapitalizedStatus(status: TaskStatus) {
	switch (status) {
		case TaskStatus.PENDING:
			return 'Pending';
		case TaskStatus.IN_PROGRESS:
			return 'In Progress';
		case TaskStatus.DONE:
			return 'Done';
		default:
			return 'Pending';
	}
}

export function urgencyColor(urgency: TaskUrgency) {
	switch (urgency) {
		case TaskUrgency.LOW:
			return '🟢';
		case TaskUrgency.MEDIUM:
			return '🟡';
		case TaskUrgency.HIGH:
			return '🔴';
		default:
			return '🟢';
	}
}
