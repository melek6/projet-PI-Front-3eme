import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: "http://localhost:4200/#/login",
  clientId: '218050525592-887jogr4hbgi5i08n9ujtoesqu7nvhuc.apps.googleusercontent.com',
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false
};
