import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";

import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { usePushNotifications } from '@/context/NotificationContext';


// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

const client = new QueryClient();

export default function RootLayout() {
  const { expoPushToken, notification } = usePushNotifications();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  console.log('Expo push token: ', expoPushToken)
  console.log('Notification: ', notification)

  return (
    <QueryClientProvider client={client}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </QueryClientProvider>
  );
}
