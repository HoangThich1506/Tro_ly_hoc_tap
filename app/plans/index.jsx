import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function PlansListScreen() {
  const { plans } = useApp();

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Kế hoạch học tập"
        subtitle={`${plans.length} kế hoạch đang triển khai`}
        rightIcon="add"
        onRightPress={() => router.push('/plans/add')}
      />

      <ScrollView contentContainerStyle={tw`p-5 pb-20`}>
        {plans.length === 0 ? (
          <View style={tw`bg-white rounded-2xl p-8 items-center border border-slate-100 my-8`}>
            <Ionicons name="pie-chart-outline" size={48} color="#CBD5E1" style={tw`mb-2`} />
            <Text style={tw`text-base font-bold text-slate-700`}>Chưa có kế hoạch nào</Text>
            <Text style={tw`text-xs text-slate-400 mt-1`}>
              Tạo kế hoạch để chia nhỏ mục tiêu và theo dõi tiến độ từng ngày!
            </Text>
          </View>
        ) : (
          plans.map((plan) => {
            const completedCount = plan.tasks ? plan.tasks.filter((t) => t.completed).length : 0;
            const totalTasks = plan.tasks ? plan.tasks.length : 0;

            return (
              <TouchableOpacity
                key={plan.id}
                activeOpacity={0.8}
                onPress={() => router.push(`/plans/${plan.id}`)}
                style={tw`bg-white rounded-3xl p-5 mb-4 border border-slate-100 shadow-xs`}
              >
                <View style={tw`flex-row justify-between items-start mb-2`}>
                  <Text style={tw`text-base font-bold text-slate-800 flex-1 mr-2`}>
                    {plan.title}
                  </Text>
                  <View style={tw`px-2.5 py-1 rounded-full bg-blue-50`}>
                    <Text style={tw`text-xs font-bold text-blue-600`}>{plan.progress}%</Text>
                  </View>
                </View>

                <Text style={tw`text-xs text-slate-500 mb-4`}>{plan.goal}</Text>

                {/* Progress Bar */}
                <View style={tw`w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3`}>
                  <View
                    style={tw`h-full rounded-full bg-blue-600 w-[${Math.max(plan.progress, 5)}%]`}
                  />
                </View>

                <View style={tw`flex-row justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-50`}>
                  <Text style={tw`text-xs text-slate-500`}>
                    Đã xong {completedCount}/{totalTasks} đầu việc
                  </Text>
                  <Text style={tw`text-11px text-slate-400`}>
                    {plan.startDate} → {plan.endDate}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => router.push('/plans/add')}
        style={tw`absolute bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 items-center justify-center shadow-lg`}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}
