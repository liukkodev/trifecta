import { getAccessToken } from '@utils/auth/storeJwtUtils';
import { jwtDecode } from 'jwt-decode';
import { UserRole } from '@utils/users/usersEnums';

export interface DecodedAccessToken {
	name: string;
	role: UserRole;
	exp: number;
	iat: number;
	sub: string;
}

export function decodedAccessToken(): DecodedAccessToken | null {
	const token = getAccessToken();

	if (!token) return null;

	const decodedAccessToken: DecodedAccessToken = jwtDecode(token);

	return decodedAccessToken;
}

export function isTokenValid(): boolean {
	const token = decodedAccessToken();

	if (!token) return false;

	const isValid = token.exp * 1000 > Date.now();

	return isValid;
}
