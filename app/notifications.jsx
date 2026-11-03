import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../components/common/Header.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function NotificationsScreen() {
  const { notifications, markNotificationAsRead, clearAllNotifications } = useApp();

  const getNotifIcon = (type) => {
    switch (type) {
      case 'deadline':
        return { icon: 'alarm', color: '#DC2626', bg: 'bg-red-50' };
      case 'schedule':
        return { icon: 'calendar', color: '#2563EB', bg: 'bg-blue-50' };
      case 'document':
        return { icon: 'folder', color: '#D97706', bg: 'bg-amber-50' };
      case 'achievement':
        return { icon: 'trophy', color: '#059669', bg: 'bg-emerald-50' };
      default:
        return { icon: 'notifications', color: '#4B5563', bg: 'bg-slate-100' };
    }
  };

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Thông báo"
        subtitle={`${notifications.filter((n) => !n.isRead).length} thông báo mới`}
        rightAction={
          notifications.length > 0 ? (
            <TouchableOpacity onPress={clearAllNotifications} style={tw`px-3 py-1.5`}>
              <Text style={tw`text-xs font-bold text-red-500`}>Xóa tất cả</Text>
            </TouchableOpacity>
          ) : null
        }
      />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        {notifications.length === 0 ? (
          <View style={tw`bg-white rounded-2xl p-8 items-center border border-slate-100 my-8`}>
            <Ionicons name="notifications-off-outline" size={48} color="#CBD5E1" style={tw`mb-2`} />
            <Text style={tw`text-base font-bold text-slate-700`}>Không có thông báo nào</Text>
            <Text style={tw`text-xs text-slate-400 mt-1`}>
              Bạn đã cập nhật đầy đủ mọi thông báo mới nhất!
            </Text>
          </View>
        ) : (
          notifications.map((item) => {
            const iconConfig = getNotifIcon(item.type);

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => markNotificationAsRead(item.id)}
                style={tw`rounded-2xl p-4 mb-3 border shadow-xs flex-row items-start ${
                  item.isRead
                    ? 'bg-white border-slate-100'
                    : 'bg-blue-50/50 border-blue-200'
                }`}
              >
                <View
                  style={tw`w-11 h-11 rounded-2xl ${iconConfig.bg} items-center justify-center mr-3 mt-0.5`}
                >
                  <Ionicons name={iconConfig.icon} size={22} color={iconConfig.color} />
                </View>

                <View style={tw`flex-1 mr-2`}>
                  <View style={tw`flex-row items-center justify-between mb-1`}>
                    <Text style={tw`text-sm font-bold text-slate-800`}>{item.title}</Text>
                    {!item.isRead && (
                      <View style={tw`w-2 h-2 rounded-full bg-blue-600 ml-2`} />
                    )}
                  </View>

                  <Text style={tw`text-xs text-slate-600 leading-4 mb-2`}>{item.message}</Text>
                  <Text style={tw`text-10px text-slate-400`}>{item.time}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
