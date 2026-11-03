import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function MonthlyScheduleScreen() {
  const { schedule, assignments } = useApp();
  const [selectedDate, setSelectedDate] = useState(2); // Ngày 2 tháng 11

  // 30 days grid simulation
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  // Filter events for selected date
  const eventsForDay = [
    ...(selectedDate % 2 === 0
      ? [
          {
            id: 'ev_1',
            type: 'class',
            title: 'Lập trình Thiết bị Di động (B1-302)',
            time: '07:30 - 10:00',
            color: '#3B82F6',
          },
          {
            id: 'ev_2',
            type: 'class',
            title: 'Cấu trúc Dữ liệu & Giải thuật (D9-401)',
            time: '10:15 - 11:45',
            color: '#10B981',
          },
        ]
      : []),
    ...(selectedDate === 5
      ? [
          {
            id: 'ev_3',
            type: 'deadline',
            title: 'Deadline: Xây dựng ứng dụng StudyMate 36 màn hình',
            time: '23:59',
            color: '#EF4444',
          },
        ]
      : []),
    ...(selectedDate === 12
      ? [
          {
            id: 'ev_4',
            type: 'deadline',
            title: 'Hạn nộp: Thực hành MongoDB Aggregation',
            time: '17:00',
            color: '#F59E0B',
          },
        ]
      : []),
  ];

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Lịch học theo tháng"
        subtitle="Tháng 11 / 2026"
        rightIcon="today-outline"
        onRightPress={() => setSelectedDate(2)}
      />

      <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
        {/* Month Calendar Card */}
        <View style={tw`bg-white rounded-3xl p-5 shadow-xs border border-slate-100 mb-6`}>
          {/* Month Header Switcher */}
          <View style={tw`flex-row items-center justify-between mb-4`}>
            <TouchableOpacity style={tw`p-2 rounded-full bg-slate-50`}>
              <Ionicons name="chevron-back" size={18} color="#64748B" />
            </TouchableOpacity>
            <Text style={tw`text-base font-bold text-slate-800`}>Tháng 11 Năm 2026</Text>
            <TouchableOpacity style={tw`p-2 rounded-full bg-slate-50`}>
              <Ionicons name="chevron-forward" size={18} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Weekday Titles */}
          <View style={tw`flex-row justify-between mb-2`}>
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d, index) => (
              <View key={index} style={tw`w-10 items-center`}>
                <Text style={tw`text-xs font-bold text-slate-400`}>{d}</Text>
              </View>
            ))}
          </View>

          {/* Days Grid */}
          <View style={tw`flex-row flex-wrap justify-between`}>
            {daysInMonth.map((day) => {
              const isSelected = selectedDate === day;
              const hasClass = day % 2 === 0;
              const hasDeadline = day === 5 || day === 12;

              return (
                <TouchableOpacity
                  key={day}
                  onPress={() => setSelectedDate(day)}
                  activeOpacity={0.7}
                  style={tw`w-10 h-10 rounded-xl items-center justify-center my-1 ${
                    isSelected ? 'bg-blue-600 shadow-sm' : 'bg-transparent'
                  }`}
                >
                  <Text
                    style={tw`text-xs font-semibold ${
                      isSelected ? 'text-white' : 'text-slate-700'
                    }`}
                  >
                    {day}
                  </Text>

                  <View style={tw`flex-row items-center mt-0.5`}>
                    {hasClass && (
                      <View
                        style={tw`w-1 h-1 rounded-full mx-0.2 ${
                          isSelected ? 'bg-white' : 'bg-blue-500'
                        }`}
                      />
                    )}
                    {hasDeadline && (
                      <View
                        style={tw`w-1 h-1 rounded-full mx-0.2 ${
                          isSelected ? 'bg-white' : 'bg-red-500'
                        }`}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Selected Day Agenda */}
        <View style={tw`flex-row justify-between items-center mb-3`}>
          <Text style={tw`text-base font-bold text-slate-800`}>
            Sự kiện ngày {selectedDate}/11/2026
          </Text>
          <Text style={tw`text-xs text-slate-500`}>{eventsForDay.length} mục</Text>
        </View>

        {eventsForDay.length === 0 ? (
          <View style={tw`bg-white rounded-2xl p-6 items-center border border-slate-100`}>
            <Ionicons name="calendar-outline" size={36} color="#CBD5E1" style={tw`mb-2`} />
            <Text style={tw`text-sm font-semibold text-slate-600`}>Không có lịch học hoặc deadline</Text>
            <Text style={tw`text-xs text-slate-400 mt-1`}>Chọn ngày khác có dấu chấm để xem chi tiết.</Text>
          </View>
        ) : (
          eventsForDay.map((ev) => (
            <View
              key={ev.id}
              style={tw`bg-white rounded-2xl p-4 mb-3 border-l-4 border-[${ev.color}] border-slate-100 shadow-xs flex-row items-center justify-between`}
            >
              <View style={tw`flex-1 mr-2`}>
                <View style={tw`flex-row items-center mb-1`}>
                  <Ionicons
                    name={ev.type === 'class' ? 'school-outline' : 'alert-circle-outline'}
                    size={14}
                    color={ev.color}
                    style={tw`mr-1.5`}
                  />
                  <Text style={tw`text-xs font-bold text-slate-400 uppercase`}>
                    {ev.type === 'class' ? 'Lớp học' : 'Hạn nộp bài tập'}
                  </Text>
                </View>
                <Text style={tw`text-sm font-bold text-slate-800 mb-1`}>{ev.title}</Text>
                <Text style={tw`text-xs text-slate-500`}>Thời gian: {ev.time}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
