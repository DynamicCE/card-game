import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.lovable.dodrink91a71645',
  appName: 'Do or Drink',
  webDir: 'dist',
  server: {
    url: 'https://91a71645-3923-446f-920a-c560eb1976df.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;