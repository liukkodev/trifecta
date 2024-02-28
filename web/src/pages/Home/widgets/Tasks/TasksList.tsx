import TaskItem from '@pages/Home/widgets/Tasks/TaskItem';
import { Accordion } from '@mantine/core';
import { Task } from '@utils/tasks/tasksEnums';
import { TasksListProps } from '@pages/Home/widgets/homeWidgetsUtils';

function TasksList(props: TasksListProps) {
	const { tasks } = props;

	return tasks?.map((task: Task) => (
		<Accordion key={task.id}>
			<TaskItem
				key={task.id}
				id={task.id}
				title={task.title}
				description={task.description}
				assignedTo={task.assignedTo}
				urgency={task.urgency}
			/>
		</Accordion>
	));
}

export default TasksList;
