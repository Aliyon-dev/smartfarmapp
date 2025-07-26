import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="farm-account" options={{ headerShown: false }} />
      <Stack.Screen name="box-id" options={{ headerShown: false }} />
      <Stack.Screen name="crop-calendar" options={{ headerShown: false }} />
      <Stack.Screen name="weather-alerts" options={{ headerShown: false }} />
    </Stack>
  );
}
