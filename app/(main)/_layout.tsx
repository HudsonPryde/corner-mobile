import React from 'react';
import { selectUser } from '@/redux/slices/user';
import { useAppSelector } from '@/redux/hooks';
import { Stack } from 'expo-router';
import auth from '@react-native-firebase/auth';

export default function MainLayout() {
  // get auth state from store
  const user = useAppSelector(selectUser);
  const uid = auth().currentUser?.uid;

  // direct user to the correct layout based on their auth state
  if (uid || user) {
    return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    );
  } else {
    return (
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    );
  }
}
