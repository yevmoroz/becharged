import { ExpoConfig } from 'expo/config';

import * as pkg from './package.json';

const config: ExpoConfig = {
  name: pkg.name,
  slug: pkg.name,
  version: pkg.version,
  owner: 'yevmoroz',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
    },
  },
  extra: {
    eas: {
      projectId: process.env.EXPO_PROJECT_ID,
    },
  },
  updates: {
    url: `https://u.expo.dev/${process.env.EXPO_PROJECT_ID}`,
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
};

export default config;
