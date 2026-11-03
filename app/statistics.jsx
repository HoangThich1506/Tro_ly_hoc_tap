import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../components/common/Header.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function StatisticsScreen() {
  const { user, subjects, assignments, goals, plans } = useApp();

  const completedAssignments = assignments.filter((a) => a.status === 'completed').length;
  const assignmentRate =
    assignments.length > 0 ? Math.round((completedAssignments / assignments.length) * 100) : 0;

  const weeklyStudyHours = [3.5, 4.0, 2.5, 5.0, 4.5, 6.0, 3.0];
  const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const maxHour = Math.max(...weeklyStudyHours);

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Thống kê học tập"
        subtitle="Báo cáo hiệu suất & tiến độ chi tiết"
      />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        {/* KPI Grid */}
        <View style={tw`flex-row flex-wrap justify-between mb-5`}>
          <View style={tw`w-[48%] bg-white rounded-3xl p-4 border border-slate-100 shadow-xs mb-3`}>
            <View style={tw`w-10 h-10 rounded-2xl bg-blue-50 items-center justify-center mb-2`}>
              <Ionicons name="school" size={20} color="#2563EB" />
            </View>
            <Text style={tw`text-2xl font-black text-slate-800`}>{user?.gpa || '3.65'}</Text>
            <Text style={tw`text-xs text-slate-500 mt-0.5`}>Điểm GPA tích lũy</Text>
            <View style={tw`flex-row items-center mt-2`}>
              <Ionicons name="trending-up" size={14} color="#10B981" style={tw`mr-1`} />
              <Text style={tw`text-10px font-bold text-emerald-600`}>+0.15 so với kỳ trước</Text>
            </View>
          </View>

          <View style={tw`w-[48%] bg-white rounded-3xl p-4 border border-slate-100 shadow-xs mb-3`}>
            <View style={tw`w-10 h-10 rounded-2xl bg-emerald-50 items-center justify-center mb-2`}>
              <Ionicons name="checkbox" size={20} color="#10B981" />
            </View>
            <Text style={tw`text-2xl font-black text-slate-800`}>{assignmentRate}%</Text>
            <Text style={tw`text-xs text-slate-500 mt-0.5`}>Tỉ lệ nộp bài tập</Text>
            <Text style={tw`text-10px text-slate-400 mt-2`}>
              Đã xong {completedAssignments}/{assignments.length} bài
            </Text>
          </View>

          <View style={tw`w-[48%] bg-white rounded-3xl p-4 border border-slate-100 shadow-xs`}>
            <View style={tw`w-10 h-10 rounded-2xl bg-violet-50 items-center justify-center mb-2`}>
              <Ionicons name="book" size={20} color="#7C3AED" />
            </View>
            <Text style={tw`text-2xl font-black text-slate-800`}>
              {user?.completedCredits || 82}
            </Text>
            <Text style={tw`text-xs text-slate-500 mt-0.5`}>Tín chỉ hoàn thành</Text>
            <Text style={tw`text-10px text-slate-400 mt-2`}>
              Mục tiêu: {user?.totalCredits || 135} tín chỉ
            </Text>
          </View>

          <View style={tw`w-[48%] bg-white rounded-3xl p-4 border border-slate-100 shadow-xs`}>
            <View style={tw`w-10 h-10 rounded-2xl bg-amber-50 items-center justify-center mb-2`}>
              <Ionicons name="time" size={20} color="#F59E0B" />
            </View>
            <Text style={tw`text-2xl font-black text-slate-800`}>28.5 h</Text>
            <Text style={tw`text-xs text-slate-500 mt-0.5`}>Giờ tự học tuần này</Text>
            <Text style={tw`text-10px text-emerald-600 font-bold mt-2`}>Đạt 114% chỉ tiêu</Text>
          </View>
        </View>

        {/* Weekly Study Chart (CSS Bar Chart) */}
        <View style={tw`bg-white rounded-3xl p-5 border border-slate-100 shadow-xs mb-5`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-base font-bold text-slate-800`}>Số giờ học 7 ngày qua</Text>
            <Text style={tw`text-xs text-blue-600 font-bold`}>Trung bình: 4.1h/ngày</Text>
          </View>

          <View style={tw`flex-row justify-between items-end h-36 pt-4 px-2`}>
            {weeklyStudyHours.map((hours, index) => {
              const heightPercent = Math.round((hours / maxHour) * 100);
              const isHighest = hours === maxHour;

              return (
                <View key={index} style={tw`items-center flex-1`}>
                  <Text style={tw`text-10px font-bold text-slate-500 mb-1`}>{hours}h</Text>
                  <View style={tw`w-7 bg-slate-100 rounded-t-xl overflow-hidden justify-end h-24`}>
                    <View
                      style={tw`w-full rounded-t-xl ${
                        isHighest ? 'bg-blue-600' : 'bg-blue-400'
                      } h-[${heightPercent}%]`}
                    />
                  </View>
                  <Text style={tw`text-xs font-semibold text-slate-600 mt-2`}>
                    {daysOfWeek[index]}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Subject Credits Distribution */}
        <View style={tw`bg-white rounded-3xl p-5 border border-slate-100 shadow-xs mb-5`}>
          <Text style={tw`text-base font-bold text-slate-800 mb-3`}>
            Phân bổ môn học kỳ này ({subjects.length} môn)
          </Text>

          {subjects.map((sub) => (
            <View key={sub.id} style={tw`mb-3`}>
              <View style={tw`flex-row justify-between items-center mb-1`}>
                <Text style={tw`text-xs font-bold text-slate-700`}>{sub.name}</Text>
                <Text style={tw`text-xs text-slate-500`}>{sub.credits} Tín chỉ</Text>
              </View>
              <View style={tw`w-full h-2 bg-slate-100 rounded-full overflow-hidden`}>
                <View
                  style={tw`h-full rounded-full bg-[${sub.color || '#3B82F6'}] w-[${
                    sub.credits * 20
                  }%]`}
                />
              </View>
            </View>
          ))}
        </View>

        {/* AI Recommendations */}
        <View style={tw`bg-blue-50 border border-blue-200 rounded-3xl p-5`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="bulb-outline" size={20} color="#2563EB" style={tw`mr-2`} />
            <Text style={tw`text-sm font-bold text-blue-900`}>Lời khuyên từ StudyMate</Text>
          </View>
          <Text style={tw`text-xs text-blue-800 leading-5`}>
            Bạn đang có tiến độ làm bài rất tốt vào Thứ 7. Hãy duy trì đều đặn thêm 30 phút ôn tập
            vào các ngày Thứ 3 và Thứ 4 để giảm áp lực dồn vào cuối tuần!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
