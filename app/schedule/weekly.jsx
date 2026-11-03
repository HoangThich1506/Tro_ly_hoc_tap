import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import { useApp } from '../../context/AppContext.jsx';

const DAYS = [
  { id: 2, label: 'T2', name: 'Thứ Hai' },
  { id: 3, label: 'T3', name: 'Thứ Ba' },
  { id: 4, label: 'T4', name: 'Thứ Tư' },
  { id: 5, label: 'T5', name: 'Thứ Năm' },
  { id: 6, label: 'T6', name: 'Thứ Sáu' },
  { id: 7, label: 'T7', name: 'Thứ Bảy' },
  { id: 1, label: 'CN', name: 'Chủ Nhật' },
];

export default function WeeklyScheduleScreen() {
  const { schedule } = useApp();
  const [selectedDay, setSelectedDay] = useState(2); // Thứ 2

  const filteredItems = schedule.filter((s) => s.dayOfWeek === selectedDay);

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Lịch học theo tuần"
        subtitle="Tuần 10 (02/11 - 08/11/2026)"
        rightIcon="calendar-outline"
        onRightPress={() => router.push('/schedule/monthly')}
      />

      {/* Week Day Selector Pill Bar */}
      <View style={tw`bg-white py-3 px-4 border-b border-slate-100 flex-row justify-between`}>
        {DAYS.map((day) => {
          const isSelected = selectedDay === day.id;
          const hasClass = schedule.some((s) => s.dayOfWeek === day.id);

          return (
            <TouchableOpacity
              key={day.id}
              onPress={() => setSelectedDay(day.id)}
              activeOpacity={0.7}
              style={tw`items-center py-2 px-3 rounded-2xl ${
                isSelected ? 'bg-blue-600 shadow-sm' : 'bg-slate-50'
              }`}
            >
              <Text
                style={tw`text-xs font-semibold ${
                  isSelected ? 'text-blue-100' : 'text-slate-500'
                }`}
              >
                {day.label}
              </Text>
              <Text
                style={tw`text-sm font-bold mt-1 ${
                  isSelected ? 'text-white' : 'text-slate-800'
                }`}
              >
                {day.id === 1 ? '8' : day.id}
              </Text>
              {hasClass && (
                <View
                  style={tw`w-1.5 h-1.5 rounded-full mt-1 ${
                    isSelected ? 'bg-white' : 'bg-blue-500'
                  }`}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-base font-bold text-slate-800`}>
            Lịch học {DAYS.find((d) => d.id === selectedDay)?.name}
          </Text>
          <Text style={tw`text-xs text-blue-600 font-semibold`}>
            {filteredItems.length} ca học
          </Text>
        </View>

        {filteredItems.length === 0 ? (
          <View style={tw`bg-white rounded-2xl p-8 items-center border border-slate-100 shadow-xs my-6`}>
            <Ionicons name="sunny-outline" size={48} color="#94A3B8" style={tw`mb-2`} />
            <Text style={tw`text-base font-bold text-slate-700`}>Không có tiết học</Text>
            <Text style={tw`text-xs text-slate-400 text-center mt-1`}>
              Bạn không có lịch học nào trong ngày này. Hãy tận dụng thời gian để ôn bài hoặc nghỉ ngơi!
            </Text>
          </View>
        ) : (
          filteredItems.map((item, idx) => (
            <View
              key={item.id}
              style={tw`bg-white rounded-2xl p-4 mb-3 border border-slate-100 shadow-xs flex-row`}
            >
              <View style={tw`items-center justify-center pr-4 border-r border-slate-100 mr-3`}>
                <Text style={tw`text-sm font-extrabold text-blue-600`}>{item.startTime}</Text>
                <Text style={tw`text-10px text-slate-400`}>đến</Text>
                <Text style={tw`text-xs font-semibold text-slate-600`}>{item.endTime}</Text>
              </View>

              <View style={tw`flex-1`}>
                <View style={tw`flex-row items-center mb-1`}>
                  <View style={tw`w-2 h-2 rounded-full mr-1.5 bg-[${item.color || '#3B82F6'}]`} />
                  <Text style={tw`text-sm font-bold text-slate-800`} numberOfLines={1}>
                    {item.subjectName}
                  </Text>
                </View>

                <View style={tw`flex-row items-center text-xs text-slate-500 mb-1`}>
                  <Ionicons name="location-outline" size={13} color="#64748B" style={tw`mr-1`} />
                  <Text style={tw`text-xs text-slate-600 mr-3`}>{item.room}</Text>
                  <Ionicons name="person-outline" size={13} color="#64748B" style={tw`mr-1`} />
                  <Text style={tw`text-xs text-slate-600`} numberOfLines={1}>{item.teacher}</Text>
                </View>

                {item.note && (
                  <Text style={tw`text-11px text-slate-400 italic`}>• {item.note}</Text>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
