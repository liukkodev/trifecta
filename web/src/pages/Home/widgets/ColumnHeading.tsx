import CreateTaskModal from '@pages/Home/widgets/Tasks/CreateTaskModal';
import { Box, Flex, Title } from '@mantine/core';
import { isUserAdmin } from '@utils/auth/userRoles';
import {
	ColumnHeadingProps,
	readableCapitalizedStatus,
} from '@pages/Home/widgets/homeWidgetsUtils';

export function ColumnHeading(props: ColumnHeadingProps) {
	const { status } = props;
	const isAdmin = isUserAdmin();

	return (
		<Flex justify='center' align='center'>
			<Title order={1} mr='12'>
				{readableCapitalizedStatus(status)}
			</Title>
			{isAdmin && (
				<Box pt='16'>
					<CreateTaskModal status={status} />
				</Box>
			)}
		</Flex>
	);
}
