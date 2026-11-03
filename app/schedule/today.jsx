import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import BottomTaskbar from '../../components/common/BottomTaskbar.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function TodayScheduleScreen() {
  const { schedule } = useApp();
  // Filter Monday (2) as today's schedule for interactive demo
  const [items, setItems] = useState(
    schedule.map((item) => ({ ...item, isAttended: false }))
  );

  const toggleAttend = (id) => {
    setItems(
      items.map((i) => (i.id === id ? { ...i, isAttended: !i.isAttended } : i))
    );
  };

  const todayItems = items.filter((i) => i.dayOfWeek === 2 || i.dayOfWeek === 6);

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Lịch học hôm nay"
        subtitle="Thứ Hai, 02/11/2026"
        rightIcon="calendar"
        onRightPress={() => router.push('/schedule/weekly')}
      />

      <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
        {/* Banner Summary */}
        <View style={tw`bg-gradient-to-r bg-blue-600 rounded-2xl p-5 mb-5 shadow-sm`}>
          <Text style={tw`text-blue-100 text-xs font-semibold uppercase`}>Tiến độ trong ngày</Text>
          <Text style={tw`text-white text-2xl font-black mt-1`}>
            {todayItems.filter((i) => i.isAttended).length} / {todayItems.length} Tiết đã điểm danh
          </Text>
          <Text style={tw`text-blue-200 text-xs mt-1`}>
            Chúc bạn một ngày học tập nhiều năng lượng và hiệu quả!
          </Text>
        </View>

        {/* Schedule List */}
        <Text style={tw`text-sm font-bold text-slate-700 uppercase tracking-wider mb-3`}>
          Các tiết học trong ngày ({todayItems.length})
        </Text>

        {todayItems.map((item, index) => (
          <View
            key={item.id}
            style={tw`bg-white rounded-2xl p-4 mb-4 shadow-xs border border-slate-100`}
          >
            <View style={tw`flex-row justify-between items-start mb-2`}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`w-3 h-3 rounded-full mr-2 bg-[${item.color || '#3B82F6'}]`} />
                <Text style={tw`text-xs font-bold text-slate-500 uppercase`}>Ca học {index + 1}</Text>
              </View>
              <TouchableOpacity
                onPress={() => toggleAttend(item.id)}
                style={tw`px-2.5 py-1 rounded-full flex-row items-center ${
                  item.isAttended ? 'bg-emerald-50 border border-emerald-200' : 'bg-slate-100'
                }`}
              >
                <Ionicons
                  name={item.isAttended ? 'checkmark-circle' : 'ellipse-outline'}
                  size={14}
                  color={item.isAttended ? '#059669' : '#64748B'}
                />
                <Text
                  style={tw`text-xs font-semibold ml-1 ${
                    item.isAttended ? 'text-emerald-700' : 'text-slate-600'
                  }`}
                >
                  {item.isAttended ? 'Đã điểm danh' : 'Chưa điểm danh'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={tw`text-base font-bold text-slate-800 mb-2`}>{item.subjectName}</Text>

            <View style={tw`bg-slate-50 rounded-xl p-3 mb-3`}>
              <View style={tw`flex-row items-center mb-1.5`}>
                <Ionicons name="time-outline" size={16} color="#2563EB" style={tw`mr-2`} />
                <Text style={tw`text-xs font-semibold text-slate-700`}>
                  {item.startTime} - {item.endTime}
                </Text>
              </View>
              <View style={tw`flex-row items-center mb-1.5`}>
                <Ionicons name="location-outline" size={16} color="#DC2626" style={tw`mr-2`} />
                <Text style={tw`text-xs font-medium text-slate-700`}>{item.room}</Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <Ionicons name="person-outline" size={16} color="#4F46E5" style={tw`mr-2`} />
                <Text style={tw`text-xs font-medium text-slate-700`}>{item.teacher}</Text>
              </View>
            </View>

            {item.note && (
              <View style={tw`flex-row items-center`}>
                <Ionicons name="information-circle-outline" size={14} color="#64748B" style={tw`mr-1`} />
                <Text style={tw`text-xs text-slate-500 italic`}>{item.note}</Text>
              </View>
            )}
          </View>
        ))}

        {/* Bottom Actions */}
        <View style={tw`flex-row justify-between mt-4`}>
          <TouchableOpacity
            onPress={() => router.push('/schedule/weekly')}
            style={tw`flex-1 bg-white border border-slate-200 py-3 rounded-xl items-center mr-2 shadow-xs`}
          >
            <Text style={tw`text-slate-700 font-semibold text-sm`}>Xem lịch tuần</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/schedule/monthly')}
            style={tw`flex-1 bg-blue-600 py-3 rounded-xl items-center ml-2 shadow-sm`}
          >
            <Text style={tw`text-white font-semibold text-sm`}>Xem lịch tháng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomTaskbar activeTab="schedule" />
    </View>
  );
}
