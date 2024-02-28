import { Accordion, Box, Button, Flex, Text } from '@mantine/core';
import { TaskStatus } from '@utils/tasks/tasksEnums';
import { taskApi } from '@state/apis/taskApi';
import { useCallback } from 'react';
import {
	TaskItemProps,
	urgencyColor,
	urgencyTextColor,
} from '@pages/Home/widgets/homeWidgetsUtils';

function TaskItem(props: TaskItemProps) {
	const { id, title, description, assignedTo, urgency } = props;
	const [updateTask] = taskApi.useUpdateTaskMutation();
	const [deleteTask] = taskApi.useDeleteTaskMutation();

	const handleTaskStatusChange = useCallback(
		(status: TaskStatus) => {
			updateTask({
				...props,
				status,
			});
		},
		[updateTask, id, title, description, assignedTo, urgency]
	);

	const handleTaskDelete = useCallback(() => {
		const confirmDelete = window.confirm(
			`Are you sure you want to delete task "${title}"?`
		);
		if (!confirmDelete) return;

		deleteTask(id);
	}, [deleteTask]);

	function taskDescription() {
		return (
			<Box>
				<Text size='md'>{description}</Text>
				<Text mt='lg' size='sm'>
					Assigned to: {assignedTo}
				</Text>
				<Box display='inline-flex'>
					<Text size='sm'>Urgency:</Text>
					<Text size='sm' c={urgencyTextColor(urgency)} pl='xs'>
						{urgency.toUpperCase()}
					</Text>
				</Box>
				<Flex mt='lg' justify='space-between'>
					<Button size='xs' onClick={() => handleTaskDelete()} color='red'>
						Delete
					</Button>

					<Flex columnGap='sm' justify={'center'}>
						<Button
							size='xs'
							onClick={() => handleTaskStatusChange(TaskStatus.PENDING)}
							color='grey'
						>
							Pending
						</Button>
						<Button
							size='xs'
							onClick={() => handleTaskStatusChange(TaskStatus.IN_PROGRESS)}
							color='blue'
						>
							In Progress
						</Button>

						<Button
							size='xs'
							onClick={() => handleTaskStatusChange(TaskStatus.DONE)}
							color='green'
						>
							Done
						</Button>
					</Flex>
				</Flex>
			</Box>
		);
	}

	return (
		<Accordion.Item key={id} value={title}>
			<Accordion.Control icon={urgencyColor(urgency)}>
				<Text fw={500} truncate='end'>
					{title}
				</Text>
			</Accordion.Control>
			<Accordion.Panel>{taskDescription()}</Accordion.Panel>
		</Accordion.Item>
	);
}

export default TaskItem;
