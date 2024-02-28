import TasksList from '@pages/Home/widgets/Tasks/TasksList';
import { AppShell, Box, Button, Flex, Grid } from '@mantine/core';
import { ColumnHeading } from '@pages/Home/widgets/ColumnHeading';
import { authApi } from '@state/apis/authApi';
import { taskApi } from '@state/apis/taskApi';
import { clearTokens } from '@utils/auth/storeJwtUtils';
import { TaskStatus } from '@utils/tasks/tasksEnums';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
	const [logout] = authApi.useLogoutMutation();
	const { data: pendingTasks } = taskApi.useGetPendingTasksQuery();
	const { data: inProgressTasks } = taskApi.useGetInProgressTasksQuery();
	const { data: doneTasks } = taskApi.useGetDoneTasksQuery();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		clearTokens();
		navigate('/login');
	};

	return (
		<AppShell header={{ height: 60 }} padding='md'>
			<AppShell.Header w='100vw'>
				<Flex align='center' justify='space-between' h='100%' pl='sm' pr='sm'>
					<Box>Trifecta</Box>
					<Button onClick={handleLogout}>Logout</Button>
				</Flex>
			</AppShell.Header>

			<AppShell.Main>
				<Grid justify='center'>
					<Grid.Col span={3}>
						<ColumnHeading status={TaskStatus.PENDING} />
						<TasksList tasks={pendingTasks} />
					</Grid.Col>
					<Grid.Col span={3}>
						<ColumnHeading status={TaskStatus.IN_PROGRESS} />
						<TasksList tasks={inProgressTasks} />
					</Grid.Col>
					<Grid.Col span={3}>
						<ColumnHeading status={TaskStatus.DONE} />
						<TasksList tasks={doneTasks} />
					</Grid.Col>
				</Grid>
			</AppShell.Main>
		</AppShell>
	);
};

export default HomePage;
