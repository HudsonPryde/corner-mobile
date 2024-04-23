import withBuildProperties from 'expo-build-properties';
import { withPodfileProperties } from 'expo/config-plugins';

module.exports = {
  name: 'corner-mobile',
  slug: 'corner-mobile',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'app-1-981207073716-ios-77a640ad23d308657768e1',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    googleServicesFile:
      process.env.GOOGLE_SERVICES_INFO_PLIST ?? './GoogleService-Info.plist',
    bundleIdentifier: 'com.hudsonpryde.corner',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.hudsonpryde.corner',
    googleServicesFile: process.env.GOOGLE_SERVICES ?? './google-services.json',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    'expo-router',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: '0b288020-88c7-4c5e-b57c-f8c58b16db25',
    },
  },
};
