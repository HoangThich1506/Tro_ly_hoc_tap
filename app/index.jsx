import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={tw`flex-1 bg-blue-600 items-center justify-between py-16 px-6`}>
      <View style={tw`flex-1 items-center justify-center`}>
        <View style={tw`w-28 h-28 rounded-3xl bg-white/20 items-center justify-center mb-6 shadow-lg border border-white/30`}>
          <Ionicons name="school" size={56} color="#FFFFFF" />
        </View>
        <Text style={tw`text-4xl font-extrabold text-white tracking-wider mb-2`}>
          StudyMate
        </Text>
        <Text style={tw`text-blue-100 text-base text-center px-6 leading-6`}>
          Trợ thủ học tập thông minh dành cho sinh viên hiện đại
        </Text>
      </View>

      <View style={tw`w-full items-center`}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.replace('/onboarding')}
          style={tw`w-full bg-white py-4 rounded-2xl items-center shadow-md mb-4`}
        >
          <Text style={tw`text-blue-600 font-bold text-base`}>Bắt đầu ngay</Text>
        </TouchableOpacity>
        <Text style={tw`text-blue-200 text-xs`}>Phiên bản 1.0.0 • 36 Màn hình hoàn chỉnh</Text>
      </View>
    </View>
  );
}
