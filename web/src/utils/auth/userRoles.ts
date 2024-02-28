import { UserRole } from '@utils/users/usersEnums';
import {
	DecodedAccessToken,
	decodedAccessToken,
} from '@utils/auth/decodedAccessToken';

export function getUserRole(): UserRole | null {
	const token: DecodedAccessToken | null = decodedAccessToken();

	if (!token) {
		return null;
	} else {
		return token.role;
	}
}

export function isUserAdmin(): boolean {
	const role = getUserRole();
	return role === UserRole.ADMIN;
}
