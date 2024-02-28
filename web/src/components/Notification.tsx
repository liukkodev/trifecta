import { notifications } from '@mantine/notifications';

export enum NotificationColor {
	RED = 'red',
	GREEN = 'green',
}

interface NotificationProps {
	title: string;
	message: string;
	color: NotificationColor;
}

export const showNotification = ({
	title,
	message,
	color,
}: NotificationProps) => {
	notifications.show({ title, message, color });
};
