export const oktaConfig = {
    clientId: '0oadqmef4oCeAfNtJ5d7',
    issuer: 'https://dev-75207044.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}