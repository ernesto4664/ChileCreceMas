import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ChileCreceMas',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: 'YOUR_SERVER_CLIENT_ID.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    },
    FacebookLogin: {
      appId: 'YOUR_FACEBOOK_APP_ID',
      appName: 'YourAppName'
    }
  }
};

export default config;
