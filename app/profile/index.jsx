import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import BottomTaskbar from '../../components/common/BottomTaskbar.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProfileScreen() {
  const { user, subjects, assignments } = useApp();
  const { logout } = useAuth();

  const completedCount = assignments.filter((a) => a.status === 'completed').length;

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Hồ sơ cá nhân"
        subtitle="Thông tin sinh viên StudyMate"
        rightIcon="create-outline"
        onRightPress={() => router.push('/profile/edit')}
      />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        {/* Profile Card */}
        <View style={tw`bg-white rounded-3xl p-6 items-center border border-slate-100 shadow-xs mb-5`}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push('/profile/edit')}
            style={tw`relative mb-3`}
          >
            <Image
              source={{ uri: user?.avatar }}
              style={tw`w-24 h-24 rounded-full border-4 border-blue-50`}
            />
            <View
              style={tw`absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 items-center justify-center border-2 border-white`}
            >
              <Ionicons name="camera" size={14} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <Text style={tw`text-xl font-bold text-slate-800`}>{user?.name}</Text>
          <Text style={tw`text-xs font-semibold text-blue-600 mt-0.5`}>
            MSSV: {user?.studentId} • {user?.major}
          </Text>
          <Text style={tw`text-xs text-slate-400 mt-0.5`}>{user?.university}</Text>

          {/* Quick numbers */}
          <View style={tw`flex-row justify-between w-full mt-6 pt-5 border-t border-slate-100`}>
            <View style={tw`items-center flex-1`}>
              <Text style={tw`text-lg font-black text-slate-800`}>{user?.gpa || '3.65'}</Text>
              <Text style={tw`text-11px text-slate-400 mt-0.5`}>Điểm GPA</Text>
            </View>
            <View style={tw`items-center flex-1 border-x border-slate-100`}>
              <Text style={tw`text-lg font-black text-slate-800`}>{subjects.length}</Text>
              <Text style={tw`text-11px text-slate-400 mt-0.5`}>Môn học kỳ này</Text>
            </View>
            <View style={tw`items-center flex-1`}>
              <Text style={tw`text-lg font-black text-slate-800`}>{completedCount}</Text>
              <Text style={tw`text-11px text-slate-400 mt-0.5`}>Bài tập đã nộp</Text>
            </View>
          </View>
        </View>

        {/* Details info */}
        <View style={tw`bg-white rounded-3xl p-5 border border-slate-100 shadow-xs mb-5`}>
          <Text style={tw`text-sm font-bold text-slate-800 mb-3`}>Thông tin học vụ</Text>

          <View style={tw`mb-2.5 flex-row justify-between`}>
            <Text style={tw`text-xs text-slate-400`}>Email sinh viên:</Text>
            <Text style={tw`text-xs font-semibold text-slate-700`}>{user?.email}</Text>
          </View>
          <View style={tw`mb-2.5 flex-row justify-between`}>
            <Text style={tw`text-xs text-slate-400`}>Khoa / Viện:</Text>
            <Text style={tw`text-xs font-semibold text-slate-700`}>{user?.faculty}</Text>
          </View>
          <View style={tw`mb-2.5 flex-row justify-between`}>
            <Text style={tw`text-xs text-slate-400`}>Niên khóa:</Text>
            <Text style={tw`text-xs font-semibold text-slate-700`}>{user?.academicYear}</Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-xs text-slate-400`}>Tín chỉ tích lũy:</Text>
            <Text style={tw`text-xs font-semibold text-slate-700`}>
              {user?.completedCredits} / {user?.totalCredits} Tín chỉ
            </Text>
          </View>
        </View>

        {/* Shortcuts */}
        <View style={tw`bg-white rounded-3xl p-2 border border-slate-100 shadow-xs mb-5`}>
          {[
            {
              title: 'Chỉnh sửa thông tin hồ sơ',
              icon: 'person-outline',
              route: '/profile/edit',
            },
            {
              title: 'Cài đặt hệ thống & Giao diện',
              icon: 'settings-outline',
              route: '/settings',
            },
            {
              title: 'Đổi mật khẩu tài khoản',
              icon: 'key-outline',
              route: '/settings/change-password',
            },
            {
              title: 'Thông báo & Nhắc nhở',
              icon: 'notifications-outline',
              route: '/notifications',
            },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.route)}
              style={tw`flex-row items-center justify-between p-3.5 rounded-2xl ${
                index < 3 ? 'border-b border-slate-50' : ''
              }`}
            >
              <View style={tw`flex-row items-center`}>
                <Ionicons name={item.icon} size={20} color="#2563EB" style={tw`mr-3`} />
                <Text style={tw`text-sm font-semibold text-slate-700`}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={logout}
          style={tw`bg-red-50 border border-red-200 py-4 rounded-2xl items-center flex-row justify-center`}
        >
          <Ionicons name="log-out-outline" size={20} color="#DC2626" style={tw`mr-2`} />
          <Text style={tw`text-red-600 font-bold text-sm`}>Đăng xuất khỏi thiết bị</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomTaskbar activeTab="profile" />
    </View>
  );
}
