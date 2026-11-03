import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function PlanDetailScreen() {
  const { id } = useLocalSearchParams();
  const { plans, togglePlanTask, deletePlan } = useApp();

  const plan = plans.find((p) => p.id === id);

  if (!plan) {
    return (
      <View style={tw`flex-1 bg-slate-50 items-center justify-center p-6`}>
        <Ionicons name="alert-circle-outline" size={48} color="#EF4444" style={tw`mb-2`} />
        <Text style={tw`text-lg font-bold text-slate-800`}>Không tìm thấy kế hoạch</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`mt-4 bg-blue-600 px-5 py-2.5 rounded-xl`}
        >
          <Text style={tw`text-white font-bold`}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const completedCount = plan.tasks ? plan.tasks.filter((t) => t.completed).length : 0;
  const totalTasks = plan.tasks ? plan.tasks.length : 0;

  const handleDelete = () => {
    deletePlan(plan.id);
    router.back();
  };

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Chi tiết kế hoạch"
        subtitle={`${plan.progress}% hoàn thành`}
      />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        {/* Main Banner */}
        <View style={tw`bg-blue-600 rounded-3xl p-6 mb-5 shadow-sm`}>
          <Text style={tw`text-blue-100 text-xs font-bold uppercase`}>Kế hoạch học tập</Text>
          <Text style={tw`text-white text-xl font-black mt-1 mb-2`}>{plan.title}</Text>
          <Text style={tw`text-blue-100 text-xs mb-4 leading-5`}>{plan.goal}</Text>

          {/* Progress Box */}
          <View style={tw`bg-white/10 rounded-2xl p-4 border border-white/20`}>
            <View style={tw`flex-row justify-between items-center mb-2`}>
              <Text style={tw`text-white text-xs font-semibold`}>Tiến độ hoàn thành</Text>
              <Text style={tw`text-white text-base font-extrabold`}>{plan.progress}%</Text>
            </View>
            <View style={tw`w-full h-2 bg-white/20 rounded-full overflow-hidden`}>
              <View
                style={tw`h-full rounded-full bg-white w-[${Math.max(plan.progress, 5)}%]`}
              />
            </View>
            <Text style={tw`text-blue-200 text-10px mt-2`}>
              Đã xong {completedCount} trên tổng số {totalTasks} đầu việc
            </Text>
          </View>
        </View>

        {/* Tasks Checklist */}
        <Text style={tw`text-base font-bold text-slate-800 mb-3`}>
          Danh sách đầu việc ({totalTasks})
        </Text>

        {plan.tasks && plan.tasks.length > 0 ? (
          plan.tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              activeOpacity={0.8}
              onPress={() => togglePlanTask(plan.id, task.id)}
              style={tw`bg-white rounded-2xl p-4 mb-2.5 border border-slate-100 shadow-xs flex-row items-center justify-between`}
            >
              <View style={tw`flex-row items-center flex-1 mr-3`}>
                <Ionicons
                  name={task.completed ? 'checkbox' : 'square-outline'}
                  size={24}
                  color={task.completed ? '#10B981' : '#94A3B8'}
                  style={tw`mr-3`}
                />
                <Text
                  style={tw`text-sm font-semibold flex-1 ${
                    task.completed
                      ? 'text-slate-400 line-through'
                      : 'text-slate-800'
                  }`}
                >
                  {task.title}
                </Text>
              </View>

              <View
                style={tw`px-2 py-0.5 rounded-full ${
                  task.completed ? 'bg-emerald-50' : 'bg-slate-100'
                }`}
              >
                <Text
                  style={tw`text-10px font-bold ${
                    task.completed ? 'text-emerald-700' : 'text-slate-500'
                  }`}
                >
                  {task.completed ? 'ĐÃ XONG' : 'CHƯA'}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={tw`bg-white rounded-2xl p-6 items-center border border-slate-100 mb-4`}>
            <Text style={tw`text-xs text-slate-400`}>Chưa có đầu việc nào trong kế hoạch này.</Text>
          </View>
        )}

        {/* Date details */}
        <View style={tw`bg-white rounded-2xl p-4 border border-slate-100 shadow-xs mb-5 mt-2`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="calendar-outline" size={16} color="#64748B" style={tw`mr-2`} />
            <Text style={tw`text-xs text-slate-500 w-28`}>Thời gian thực hiện:</Text>
            <Text style={tw`text-xs font-semibold text-slate-800`}>
              {plan.startDate} → {plan.endDate}
            </Text>
          </View>
        </View>

        {/* Delete button */}
        <TouchableOpacity
          onPress={handleDelete}
          style={tw`bg-red-50 border border-red-200 py-3.5 rounded-2xl items-center flex-row justify-center`}
        >
          <Ionicons name="trash-outline" size={18} color="#DC2626" style={tw`mr-2`} />
          <Text style={tw`text-red-600 font-bold text-sm`}>Xóa kế hoạch này</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
