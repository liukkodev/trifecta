export enum AuthStrategies {
  LOCAL = 'local',
}

export enum GuardTypes {
  JWT = 'jwt',
}

export enum CookieNames {
  AUTH_TOKEN = 'auth_token',
  REFRESH_TOKEN = 'refresh_token',
}

export enum TokenTypes {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export enum TokenExpirations {
  ACCESS = '5s',
  REFRESH = '30d',
}
