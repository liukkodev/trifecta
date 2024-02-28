enum StoredDataKeys {
	ACCESS_TOKEN = 'access_token',
	REFRESH_TOKEN = 'refresh_token',
	LAST_TOKEN_REFRESH = 'last_token_refresh',
}

// ACCESS TOKENS
export function storeAccessToken(token: string) {
	localStorage.setItem(StoredDataKeys.ACCESS_TOKEN, token);
}

export function getAccessToken() {
	return localStorage.getItem(StoredDataKeys.ACCESS_TOKEN);
}

export function removeAccessToken() {
	localStorage.removeItem(StoredDataKeys.ACCESS_TOKEN);
}

// REFRESH TOKENS
export function setLastTokenRefresh() {
	const now = new Date();

	localStorage.setItem(StoredDataKeys.LAST_TOKEN_REFRESH, now.toISOString());
}

export function getLastTokenRefresh() {
	return localStorage.getItem(StoredDataKeys.LAST_TOKEN_REFRESH);
}

export function removeLastTokenRefresh() {
	localStorage.removeItem(StoredDataKeys.LAST_TOKEN_REFRESH);
}

// CLEAR TOKENS
export function clearTokens() {
	removeAccessToken();
	removeLastTokenRefresh();
}
