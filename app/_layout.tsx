import { Stack } from 'expo-router';
import { NotificationProvider } from "@/context/NotificationContext";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function UserAppLayout() {
  return (
    <NotificationProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </NotificationProvider>
  );
}
