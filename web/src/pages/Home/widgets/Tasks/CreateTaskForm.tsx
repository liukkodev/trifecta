import { Box, Button, Group, Radio, TextInput } from '@mantine/core';
import { NotificationColor } from '@components/Notification';
import { notifications } from '@mantine/notifications';
import { taskApi } from '@state/apis/taskApi';
import { TaskUrgency } from '@utils/tasks/tasksEnums';
import { useForm } from '@mantine/form';
import {
	CreateTaskFormProps,
	CreateTaskFormValues,
	CreateTaskResponse,
} from '@pages/Home/widgets/homeWidgetsUtils';

function CreateTaskForm(props: CreateTaskFormProps) {
	const { status, close } = props;
	const [createTask] = taskApi.useCreateTaskMutation();

	const form = useForm<CreateTaskFormValues>({
		validateInputOnChange: true,
		initialValues: {
			title: '',
			description: '',
			assignedTo: '',
			urgency: TaskUrgency.LOW,
			status: status,
		},

		validate: {
			title: (value) => {
				value = value.trim();
				if (!value) return 'Title is required';
				if (value.length < 3) return 'Title is too short';
				if (value.length > 100) return 'Title is too long';

				return null;
			},

			description: (value) => {
				value = value.trim();
				if (!value) return 'Description is required';
				if (value.length < 3) return 'Description is too short';
				if (value.length > 1000) return 'Description is too long';

				return null;
			},

			assignedTo: (value) => {
				value = value.trim();
				if (!value) return 'Assigned to is required';
				if (value.length < 3) return 'Assigned to is too short';
				if (value.length > 100) return 'Assigned to is too long';

				return null;
			},
		},
	});

	const handleSubmit = form.onSubmit(async (values) => {
		try {
			const res: CreateTaskResponse = await createTask({
				...values,
				status: status,
			});

			if (res.error) {
				notifications.show({
					title: 'Task',
					message: 'Task creation failed',
					color: NotificationColor.RED,
				});
				return;
			} else {
				notifications.show({
					title: 'Task',
					message: 'Task created successfully!',
					color: NotificationColor.GREEN,
				});

				close();

				form.reset();
			}
		} catch (err) {
			console.error(err);
		}
	});

	return (
		<Box maw={340} mx='auto'>
			<form onSubmit={handleSubmit}>
				<TextInput
					withAsterisk
					label='Title'
					placeholder='Keep it short'
					{...form.getInputProps('title')}
				/>

				<TextInput
					mt='md'
					withAsterisk
					label='Description'
					placeholder='What needs to be done?'
					{...form.getInputProps('description')}
				/>

				<TextInput
					mt='md'
					withAsterisk
					label='Assigned to'
					placeholder='Who will do it?'
					{...form.getInputProps('assignedTo')}
				/>

				<Radio.Group
					mt='md'
					withAsterisk
					name='urgency'
					label='Urgency'
					{...form.getInputProps('urgency')}
				>
					<Group mt='xs' justify='space-between'>
						<Radio value={TaskUrgency.LOW} label='Low' />
						<Radio value={TaskUrgency.MEDIUM} label='Medium' />
						<Radio value={TaskUrgency.HIGH} label='High' />
					</Group>
				</Radio.Group>

				<Group justify='flex-end' mt='lg'>
					<Button variant='light' onClick={form.reset}>
						Reset
					</Button>
					<Button type='submit'>Submit</Button>
				</Group>
			</form>
		</Box>
	);
}

export default CreateTaskForm;
