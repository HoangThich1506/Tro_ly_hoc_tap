import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function SettingsScreen() {
  const { settings, updateSettings } = useApp();
  const { logout } = useAuth();

  const toggleSetting = (key) => {
    updateSettings({ [key]: !settings[key] });
  };

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header title="Cài đặt hệ thống" subtitle="Tùy chỉnh trải nghiệm ứng dụng" />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        {/* Appearance Group */}
        <Text style={tw`text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1`}>
          Giao diện & Trải nghiệm
        </Text>
        <View style={tw`bg-white rounded-3xl p-3 border border-slate-100 shadow-xs mb-5`}>
          <View style={tw`flex-row items-center justify-between p-3 border-b border-slate-50`}>
            <View style={tw`flex-row items-center flex-1 mr-2`}>
              <View style={tw`w-10 h-10 rounded-2xl bg-indigo-50 items-center justify-center mr-3`}>
                <Ionicons name="moon-outline" size={20} color="#4F46E5" />
              </View>
              <View>
                <Text style={tw`text-sm font-semibold text-slate-800`}>Chế độ nền tối (Dark mode)</Text>
                <Text style={tw`text-xs text-slate-400`}>Tối ưu mắt khi học buổi tối</Text>
              </View>
            </View>
            <Switch
              value={!!settings?.darkMode}
              onValueChange={() => toggleSetting('darkMode')}
              trackColor={{ false: '#E2E8F0', true: '#3B82F6' }}
            />
          </View>

          <View style={tw`flex-row items-center justify-between p-3`}>
            <View style={tw`flex-row items-center flex-1 mr-2`}>
              <View style={tw`w-10 h-10 rounded-2xl bg-blue-50 items-center justify-center mr-3`}>
                <Ionicons name="language-outline" size={20} color="#2563EB" />
              </View>
              <View>
                <Text style={tw`text-sm font-semibold text-slate-800`}>Ngôn ngữ ứng dụng</Text>
                <Text style={tw`text-xs text-slate-400`}>Tiếng Việt (Mặc định)</Text>
              </View>
            </View>
            <Text style={tw`text-xs font-bold text-blue-600`}>Tiếng Việt</Text>
          </View>
        </View>

        {/* Notifications & Reminders */}
        <Text style={tw`text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1`}>
          Nhắc nhở & Thông báo
        </Text>
        <View style={tw`bg-white rounded-3xl p-3 border border-slate-100 shadow-xs mb-5`}>
          <View style={tw`flex-row items-center justify-between p-3 border-b border-slate-50`}>
            <View style={tw`flex-row items-center flex-1 mr-2`}>
              <View style={tw`w-10 h-10 rounded-2xl bg-red-50 items-center justify-center mr-3`}>
                <Ionicons name="notifications-outline" size={20} color="#DC2626" />
              </View>
              <View>
                <Text style={tw`text-sm font-semibold text-slate-800`}>Thông báo đẩy</Text>
                <Text style={tw`text-xs text-slate-400`}>Nhận cảnh báo hạn nộp bài tập</Text>
              </View>
            </View>
            <Switch
              value={!!settings?.pushNotifications}
              onValueChange={() => toggleSetting('pushNotifications')}
              trackColor={{ false: '#E2E8F0', true: '#3B82F6' }}
            />
          </View>

          <View style={tw`flex-row items-center justify-between p-3 border-b border-slate-50`}>
            <View style={tw`flex-row items-center flex-1 mr-2`}>
              <View style={tw`w-10 h-10 rounded-2xl bg-amber-50 items-center justify-center mr-3`}>
                <Ionicons name="time-outline" size={20} color="#D97706" />
              </View>
              <View>
                <Text style={tw`text-sm font-semibold text-slate-800`}>Nhắc lịch học trước</Text>
                <Text style={tw`text-xs text-slate-400`}>Trước 30 phút bắt đầu tiết</Text>
              </View>
            </View>
            <Text style={tw`text-xs font-bold text-amber-600`}>30 Phút</Text>
          </View>

          <View style={tw`flex-row items-center justify-between p-3`}>
            <View style={tw`flex-row items-center flex-1 mr-2`}>
              <View style={tw`w-10 h-10 rounded-2xl bg-emerald-50 items-center justify-center mr-3`}>
                <Ionicons name="cloud-done-outline" size={20} color="#059669" />
              </View>
              <View>
                <Text style={tw`text-sm font-semibold text-slate-800`}>Tự động đồng bộ đám mây</Text>
                <Text style={tw`text-xs text-slate-400`}>Sao lưu dữ liệu vào bộ nhớ máy</Text>
              </View>
            </View>
            <Switch
              value={!!settings?.autoSync}
              onValueChange={() => toggleSetting('autoSync')}
              trackColor={{ false: '#E2E8F0', true: '#3B82F6' }}
            />
          </View>
        </View>

        {/* Security & Account */}
        <Text style={tw`text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1`}>
          Tài khoản & Bảo mật
        </Text>
        <View style={tw`bg-white rounded-3xl p-2 border border-slate-100 shadow-xs mb-6`}>
          <TouchableOpacity
            onPress={() => router.push('/settings/change-password')}
            style={tw`flex-row items-center justify-between p-3.5 border-b border-slate-50`}
          >
            <View style={tw`flex-row items-center`}>
              <Ionicons name="key-outline" size={20} color="#2563EB" style={tw`mr-3`} />
              <Text style={tw`text-sm font-semibold text-slate-700`}>Đổi mật khẩu</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => alert('StudyMate v1.0.0 - Ứng dụng hỗ trợ học tập toàn diện')}
            style={tw`flex-row items-center justify-between p-3.5`}
          >
            <View style={tw`flex-row items-center`}>
              <Ionicons name="information-circle-outline" size={20} color="#64748B" style={tw`mr-3`} />
              <Text style={tw`text-sm font-semibold text-slate-700`}>Về ứng dụng StudyMate</Text>
            </View>
            <Text style={tw`text-xs text-slate-400`}>v1.0.0</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={logout}
          style={tw`bg-red-50 border border-red-200 py-4 rounded-2xl items-center flex-row justify-center`}
        >
          <Ionicons name="log-out-outline" size={20} color="#DC2626" style={tw`mr-2`} />
          <Text style={tw`text-red-600 font-bold text-sm`}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
