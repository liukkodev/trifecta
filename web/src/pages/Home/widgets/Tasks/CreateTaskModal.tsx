import CreateTaskForm from '@pages/Home/widgets/Tasks/CreateTaskForm';
import { ActionIcon, Modal } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { readableCapitalizedStatus } from '@pages/Home/widgets/homeWidgetsUtils';
import { TaskStatus } from '@utils/tasks/tasksEnums';
import { useDisclosure } from '@mantine/hooks';

interface CreateTaskModalProps {
	status: TaskStatus;
}

function CreateTaskModal(props: CreateTaskModalProps) {
	const { status } = props;
	const [opened, { open, close }] = useDisclosure(false);
	const readableStatus = readableCapitalizedStatus(status);

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title={`Create ${readableStatus} Task`}
				centered
			>
				<CreateTaskForm status={props.status} close={close} />
			</Modal>

			<ActionIcon
				size='xs'
				ml='sm'
				variant='outline'
				aria-label='Add'
				color='white'
				onClick={open}
			>
				<IconPlus />
			</ActionIcon>
		</>
	);
}

export default CreateTaskModal;
