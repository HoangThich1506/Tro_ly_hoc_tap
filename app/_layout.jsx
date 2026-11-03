import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '../context/AppContext.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AuthProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              contentStyle: { backgroundColor: '#F8FAFC' },
            }}
          >
            {/* Phase 1: Splash, Onboarding & Auth */}
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(auth)/login" />
            <Stack.Screen name="(auth)/register" />
            <Stack.Screen name="(auth)/forgot-password" />
            <Stack.Screen name="(auth)/verify-email" />

            {/* Phase 2: Home & Schedules */}
            <Stack.Screen name="home" />
            <Stack.Screen name="schedule/today" />
            <Stack.Screen name="schedule/weekly" />
            <Stack.Screen name="schedule/monthly" />

            {/* Phase 3: Subjects */}
            <Stack.Screen name="subjects/index" />
            <Stack.Screen name="subjects/add" />
            <Stack.Screen name="subjects/[id]" />
            <Stack.Screen name="subjects/edit/[id]" />

            {/* Phase 4: Assignments */}
            <Stack.Screen name="assignments/index" />
            <Stack.Screen name="assignments/add" />
            <Stack.Screen name="assignments/[id]" />
            <Stack.Screen name="assignments/edit/[id]" />
            <Stack.Screen name="assignments/completed" />

            {/* Phase 5: Notes & Documents */}
            <Stack.Screen name="notes/index" />
            <Stack.Screen name="notes/add" />
            <Stack.Screen name="notes/[id]" />
            <Stack.Screen name="notes/edit/[id]" />
            <Stack.Screen name="documents/index" />
            <Stack.Screen name="documents/add" />

            {/* Phase 6: Plans, Goals & Statistics */}
            <Stack.Screen name="plans/index" />
            <Stack.Screen name="plans/add" />
            <Stack.Screen name="plans/[id]" />
            <Stack.Screen name="goals/index" />
            <Stack.Screen name="goals/add" />
            <Stack.Screen name="statistics" />

            {/* Phase 7: Profile, Notifications & Settings */}
            <Stack.Screen name="profile/index" />
            <Stack.Screen name="profile/edit" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="settings/index" />
            <Stack.Screen name="settings/change-password" />
          </Stack>
        </AuthProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}
