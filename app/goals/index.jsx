import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function GoalsListScreen() {
  const { goals, updateGoal, deleteGoal } = useApp();

  const handleIncrement = (goal) => {
    const nextVal = Math.min(goal.current + 1, goal.target);
    updateGoal(goal.id, { current: nextVal });
  };

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Mục tiêu học tập"
        subtitle={`${goals.length} mục tiêu đang theo đuổi`}
        rightIcon="add"
        onRightPress={() => router.push('/goals/add')}
      />

      <ScrollView contentContainerStyle={tw`p-5 pb-20`}>
        {/* Goals motivation banner */}
        <View style={tw`bg-gradient-to-r bg-violet-600 rounded-3xl p-5 mb-5 shadow-sm`}>
          <View style={tw`flex-row items-center mb-2`}>
            <View style={tw`w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-3`}>
              <Ionicons name="sparkles" size={20} color="#FFFFFF" />
            </View>
            <View>
              <Text style={tw`text-violet-100 text-xs`}>Kỷ luật bản thân</Text>
              <Text style={tw`text-white text-lg font-bold`}>Kiên trì mỗi ngày</Text>
            </View>
          </View>
          <Text style={tw`text-violet-100 text-xs leading-5`}>
            Biến những mục tiêu lớn thành các bước tiến nhỏ có thể đo lường và theo dõi hàng ngày.
          </Text>
        </View>

        {goals.length === 0 ? (
          <View style={tw`bg-white rounded-2xl p-8 items-center border border-slate-100 my-6`}>
            <Ionicons name="trophy-outline" size={48} color="#CBD5E1" style={tw`mb-2`} />
            <Text style={tw`text-base font-bold text-slate-700`}>Chưa có mục tiêu nào</Text>
            <Text style={tw`text-xs text-slate-400 mt-1`}>Nhấn dấu cộng (+) để đặt mục tiêu mới.</Text>
          </View>
        ) : (
          goals.map((goal) => {
            const percent = Math.min(Math.round((goal.current / goal.target) * 100), 100);

            return (
              <View
                key={goal.id}
                style={tw`bg-white rounded-3xl p-5 mb-4 border border-slate-100 shadow-xs`}
              >
                <View style={tw`flex-row justify-between items-start mb-2`}>
                  <View style={tw`flex-1 mr-2`}>
                    <View style={tw`px-2.5 py-0.5 rounded-full bg-violet-50 self-start mb-1.5`}>
                      <Text style={tw`text-10px font-bold text-violet-700 uppercase`}>
                        {goal.category}
                      </Text>
                    </View>
                    <Text style={tw`text-base font-bold text-slate-800`}>{goal.title}</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => deleteGoal(goal.id)}
                    style={tw`p-1.5 rounded-full bg-slate-50`}
                  >
                    <Ionicons name="trash-outline" size={16} color="#94A3B8" />
                  </TouchableOpacity>
                </View>

                {/* Numbers */}
                <View style={tw`flex-row justify-between items-baseline my-2`}>
                  <Text style={tw`text-2xl font-black text-slate-800`}>
                    {goal.current}{' '}
                    <Text style={tw`text-sm font-semibold text-slate-400`}>
                      / {goal.target} {goal.unit}
                    </Text>
                  </Text>
                  <Text style={tw`text-sm font-bold text-violet-600`}>{percent}%</Text>
                </View>

                {/* Progress bar */}
                <View style={tw`w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3`}>
                  <View
                    style={tw`h-full rounded-full bg-violet-600 w-[${Math.max(percent, 5)}%]`}
                  />
                </View>

                <View style={tw`flex-row justify-between items-center pt-2 border-t border-slate-50`}>
                  <Text style={tw`text-xs text-slate-400`}>Hạn: {goal.deadline}</Text>

                  <TouchableOpacity
                    onPress={() => handleIncrement(goal)}
                    style={tw`bg-violet-50 px-3 py-1.5 rounded-xl flex-row items-center`}
                  >
                    <Ionicons name="add" size={14} color="#7C3AED" style={tw`mr-1`} />
                    <Text style={tw`text-xs font-bold text-violet-700`}>Cập nhật tiến độ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => router.push('/goals/add')}
        style={tw`absolute bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 items-center justify-center shadow-lg`}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}
