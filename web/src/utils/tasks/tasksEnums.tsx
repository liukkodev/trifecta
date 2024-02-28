export interface Task {
	id: string;
	title: string;
	description: string;
	assignedTo: string;
	urgency: TaskUrgency;
	status: TaskStatus;
}

export enum TaskUrgency {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
}

export enum TaskStatus {
	PENDING = 'pending',
	IN_PROGRESS = 'in_progress',
	DONE = 'done',
}
