import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useApp } from '../context/AppContext.jsx';
import BottomTaskbar from '../components/common/BottomTaskbar.jsx';

export default function HomeScreen() {
  const { user, subjects, assignments, schedule, notifications } = useApp();

  const unreadNotifs = notifications.filter((n) => !n.isRead).length;
  const pendingAssignments = assignments.filter((a) => a.status !== 'completed');
  const todayClasses = schedule.filter((s) => s.dayOfWeek === 2); // Demo: Thứ 2

  const QUICK_ACTIONS = [
    { name: 'Lịch học', icon: 'calendar', color: 'bg-blue-500', route: '/schedule/today' },
    { name: 'Môn học', icon: 'book', color: 'bg-indigo-500', route: '/subjects' },
    { name: 'Bài tập', icon: 'checkbox', color: 'bg-emerald-500', route: '/assignments' },
    { name: 'Ghi chú', icon: 'document-text', color: 'bg-amber-500', route: '/notes' },
    { name: 'Tài liệu', icon: 'folder-open', color: 'bg-rose-500', route: '/documents' },
    { name: 'Kế hoạch', icon: 'pie-chart', color: 'bg-cyan-500', route: '/plans' },
    { name: 'Mục tiêu', icon: 'trophy', color: 'bg-violet-500', route: '/goals' },
    { name: 'Thống kê', icon: 'stats-chart', color: 'bg-fuchsia-500', route: '/statistics' },
  ];

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <ScrollView style={tw`flex-1`} contentContainerStyle={tw`pb-8`}>
      {/* Top Header Card */}
      <View style={tw`bg-blue-600 px-6 pt-12 pb-8 rounded-b-3xl shadow-sm`}>
        <View style={tw`flex-row items-center justify-between mb-6`}>
          <TouchableOpacity
            onPress={() => router.push('/profile')}
            style={tw`flex-row items-center`}
          >
            <Image
              source={{ uri: user?.avatar }}
              style={tw`w-12 h-12 rounded-full border-2 border-white/60 mr-3`}
            />
            <View>
              <Text style={tw`text-blue-100 text-xs`}>Xin chào 👋</Text>
              <Text style={tw`text-white text-lg font-bold`}>{user?.name || 'Sinh viên'}</Text>
            </View>
          </TouchableOpacity>

          <View style={tw`flex-row items-center`}>
            <TouchableOpacity
              onPress={() => router.push('/notifications')}
              style={tw`w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-2 relative`}
            >
              <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
              {unreadNotifs > 0 && (
                <View style={tw`absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full items-center justify-center`}>
                  <Text style={tw`text-white text-9px font-bold`}>{unreadNotifs}</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/settings')}
              style={tw`w-10 h-10 rounded-full bg-white/20 items-center justify-center`}
            >
              <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Academic Overview Box */}
        <View style={tw`bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex-row justify-between`}>
          <View style={tw`items-center flex-1 border-r border-white/20`}>
            <Text style={tw`text-blue-100 text-xs mb-1`}>Môn kỳ này</Text>
            <Text style={tw`text-white text-xl font-extrabold`}>{subjects.length}</Text>
          </View>
          <View style={tw`items-center flex-1 border-r border-white/20`}>
            <Text style={tw`text-blue-100 text-xs mb-1`}>Bài tập còn lại</Text>
            <Text style={tw`text-white text-xl font-extrabold`}>{pendingAssignments.length}</Text>
          </View>
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-blue-100 text-xs mb-1`}>Điểm GPA</Text>
            <Text style={tw`text-white text-xl font-extrabold`}>{user?.gpa || '3.65'}</Text>
          </View>
        </View>
      </View>

      {/* Quick Action Grid */}
      <View style={tw`px-5 mt-6`}>
        <Text style={tw`text-base font-bold text-slate-800 mb-3`}>Chức năng học tập</Text>
        <View style={tw`flex-row flex-wrap justify-between`}>
          {QUICK_ACTIONS.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.route)}
              activeOpacity={0.7}
              style={tw`w-[23%] bg-white rounded-2xl p-3 items-center mb-3 shadow-xs border border-slate-100`}
            >
              <View style={tw`w-12 h-12 rounded-xl ${item.color} items-center justify-center mb-1.5 shadow-sm`}>
                <Ionicons name={item.icon} size={22} color="#FFFFFF" />
              </View>
              <Text style={tw`text-xs font-semibold text-slate-700 text-center`}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Today Schedule Section */}
      <View style={tw`px-5 mt-4`}>
        <View style={tw`flex-row items-center justify-between mb-3`}>
          <Text style={tw`text-base font-bold text-slate-800`}>Lịch học hôm nay</Text>
          <TouchableOpacity onPress={() => router.push('/schedule/today')}>
            <Text style={tw`text-blue-600 text-xs font-semibold`}>Xem tất cả ({todayClasses.length})</Text>
          </TouchableOpacity>
        </View>

        {todayClasses.slice(0, 2).map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push('/schedule/today')}
            style={tw`bg-white rounded-2xl p-4 mb-3 shadow-xs border-l-4 border-[${item.color}] border-slate-100 flex-row justify-between items-center`}
          >
            <View style={tw`flex-1 mr-2`}>
              <Text style={tw`text-sm font-bold text-slate-800 mb-1`}>{item.subjectName}</Text>
              <View style={tw`flex-row items-center text-xs text-slate-500`}>
                <Ionicons name="time-outline" size={14} color="#64748B" style={tw`mr-1`} />
                <Text style={tw`text-xs text-slate-600 mr-3`}>{item.startTime} - {item.endTime}</Text>
                <Ionicons name="location-outline" size={14} color="#64748B" style={tw`mr-1`} />
                <Text style={tw`text-xs text-slate-600`}>{item.room}</Text>
              </View>
            </View>
            <View style={tw`w-8 h-8 rounded-full bg-slate-50 items-center justify-center`}>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </View>
          </TouchableOpacity>
        ))}

        <View style={tw`flex-row justify-between mt-1 mb-2`}>
          <TouchableOpacity
            onPress={() => router.push('/schedule/weekly')}
            style={tw`flex-1 bg-blue-50 py-2.5 rounded-xl mr-2 items-center flex-row justify-center`}
          >
            <Ionicons name="calendar-outline" size={16} color="#2563EB" style={tw`mr-1.5`} />
            <Text style={tw`text-blue-700 font-semibold text-xs`}>Lịch tuần</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/schedule/monthly')}
            style={tw`flex-1 bg-indigo-50 py-2.5 rounded-xl ml-2 items-center flex-row justify-center`}
          >
            <Ionicons name="grid-outline" size={16} color="#4F46E5" style={tw`mr-1.5`} />
            <Text style={tw`text-indigo-700 font-semibold text-xs`}>Lịch tháng</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Urgent Assignments Section */}
      <View style={tw`px-5 mt-4`}>
        <View style={tw`flex-row items-center justify-between mb-3`}>
          <Text style={tw`text-base font-bold text-slate-800`}>Bài tập cần hoàn thành</Text>
          <TouchableOpacity onPress={() => router.push('/assignments')}>
            <Text style={tw`text-blue-600 text-xs font-semibold`}>Chi tiết ({pendingAssignments.length})</Text>
          </TouchableOpacity>
        </View>

        {pendingAssignments.slice(0, 2).map((asg) => (
          <TouchableOpacity
            key={asg.id}
            onPress={() => router.push(`/assignments/${asg.id}`)}
            style={tw`bg-white rounded-2xl p-4 mb-3 shadow-xs border border-slate-100`}
          >
            <View style={tw`flex-row justify-between items-start mb-2`}>
              <Text style={tw`text-sm font-bold text-slate-800 flex-1 mr-2`}>{asg.title}</Text>
              <View
                style={tw`px-2 py-0.5 rounded-full ${
                  asg.priority === 'high'
                    ? 'bg-red-50 text-red-600'
                    : asg.priority === 'medium'
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Text
                  style={tw`text-10px font-bold ${
                    asg.priority === 'high'
                      ? 'text-red-600'
                      : asg.priority === 'medium'
                      ? 'text-amber-600'
                      : 'text-slate-600'
                  }`}
                >
                  {asg.priority === 'high' ? 'GẤP' : asg.priority === 'medium' ? 'VỪA' : 'THẤP'}
                </Text>
              </View>
            </View>

            <View style={tw`flex-row items-center justify-between`}>
              <Text style={tw`text-xs text-blue-600 font-medium`}>{asg.subjectName}</Text>
              <View style={tw`flex-row items-center`}>
                <Ionicons name="alarm-outline" size={14} color="#EF4444" style={tw`mr-1`} />
                <Text style={tw`text-xs text-red-500 font-semibold`}>Hạn: {asg.dueDate}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
    <BottomTaskbar activeTab="home" />
  </View>
);
}
