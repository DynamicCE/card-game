import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@capacitor/core';

export const initializeGoogleAuth = async () => {
  if (isPlatform('android')) {
    await GoogleAuth.initialize();
  }
};

export const signInWithGoogle = async () => {
  try {
    const user = await GoogleAuth.signIn();
    return {
      email: user.email,
      familyName: user.familyName,
      givenName: user.givenName,
      imageUrl: user.imageUrl,
      id: user.id,
    };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await GoogleAuth.signOut();
  } catch (error) {
    console.error('Sign Out Error:', error);
    throw error;
  }
};