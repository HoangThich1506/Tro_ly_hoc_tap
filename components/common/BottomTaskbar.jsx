import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useApp } from '../../context/AppContext.jsx';

export default function BottomTaskbar({ activeTab = 'home' }) {
  const { assignments } = useApp();
  const pendingCount = assignments.filter((a) => a.status !== 'completed').length;

  const TABS = [
    {
      id: 'home',
      label: 'Trang chủ',
      icon: 'home',
      outlineIcon: 'home-outline',
      route: '/home',
    },
    {
      id: 'schedule',
      label: 'Lịch học',
      icon: 'calendar',
      outlineIcon: 'calendar-outline',
      route: '/schedule/today',
    },
    {
      id: 'subjects',
      label: 'Môn học',
      icon: 'book',
      outlineIcon: 'book-outline',
      route: '/subjects',
    },
    {
      id: 'assignments',
      label: 'Bài tập',
      icon: 'checkbox',
      outlineIcon: 'checkbox-outline',
      route: '/assignments',
      badge: pendingCount > 0 ? pendingCount : null,
    },
    {
      id: 'profile',
      label: 'Hồ sơ',
      icon: 'person',
      outlineIcon: 'person-outline',
      route: '/profile',
    },
  ];

  const handleNavigate = (tab) => {
    if (tab.id === activeTab) return;
    router.push(tab.route);
  };

  return (
    <View
      style={tw`bg-white border-t border-slate-100 flex-row justify-around items-center pt-2 pb-${
        Platform.OS === 'ios' ? '7' : '3'
      } shadow-lg`}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.7}
            onPress={() => handleNavigate(tab)}
            style={tw`items-center justify-center flex-1 py-1 relative`}
          >
            <View style={tw`relative`}>
              <Ionicons
                name={isActive ? tab.icon : tab.outlineIcon}
                size={22}
                color={isActive ? '#2563EB' : '#94A3B8'}
              />
              {tab.badge && (
                <View
                  style={tw`absolute -top-1.5 -right-3 bg-red-500 rounded-full min-w-4 h-4 px-1 items-center justify-center`}
                >
                  <Text style={tw`text-white text-9px font-bold`}>{tab.badge}</Text>
                </View>
              )}
            </View>

            <Text
              style={tw`text-10px font-semibold mt-1 ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-400'
              }`}
            >
              {tab.label}
            </Text>

            {isActive && (
              <View style={tw`w-3 h-0.8 bg-blue-600 rounded-full mt-0.5`} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
