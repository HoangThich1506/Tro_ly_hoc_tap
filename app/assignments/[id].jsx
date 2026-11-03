import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function AssignmentDetailScreen() {
  const { id } = useLocalSearchParams();
  const { assignments, toggleAssignmentStatus, deleteAssignment } = useApp();

  const asg = assignments.find((a) => a.id === id);

  if (!asg) {
    return (
      <View style={tw`flex-1 bg-slate-50 items-center justify-center p-6`}>
        <Ionicons name="alert-circle-outline" size={48} color="#EF4444" style={tw`mb-2`} />
        <Text style={tw`text-lg font-bold text-slate-800`}>Không tìm thấy bài tập</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`mt-4 bg-blue-600 px-5 py-2.5 rounded-xl`}
        >
          <Text style={tw`text-white font-bold`}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isCompleted = asg.status === 'completed';

  const handleDelete = () => {
    deleteAssignment(asg.id);
    router.back();
  };

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Chi tiết bài tập"
        subtitle={asg.subjectName}
        rightIcon="create-outline"
        onRightPress={() => router.push(`/assignments/edit/${asg.id}`)}
      />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        <View style={tw`bg-white rounded-3xl p-5 border border-slate-100 shadow-xs mb-5`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <View style={tw`px-3 py-1 rounded-full bg-blue-50`}>
              <Text style={tw`text-blue-600 font-bold text-xs`}>{asg.subjectName}</Text>
            </View>

            <View
              style={tw`px-2.5 py-1 rounded-full ${
                asg.priority === 'high'
                  ? 'bg-red-50'
                  : asg.priority === 'medium'
                  ? 'bg-amber-50'
                  : 'bg-slate-100'
              }`}
            >
              <Text
                style={tw`text-xs font-bold ${
                  asg.priority === 'high'
                    ? 'text-red-600'
                    : asg.priority === 'medium'
                    ? 'text-amber-600'
                    : 'text-slate-600'
                }`}
              >
                {asg.priority === 'high'
                  ? 'Ưu tiên: Gấp'
                  : asg.priority === 'medium'
                  ? 'Ưu tiên: Vừa'
                  : 'Ưu tiên: Thấp'}
              </Text>
            </View>
          </View>

          <Text style={tw`text-xl font-bold text-slate-800 mb-4`}>{asg.title}</Text>

          {/* Status box */}
          <View
            style={tw`p-4 rounded-2xl mb-4 flex-row items-center justify-between ${
              isCompleted ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'
            }`}
          >
            <View style={tw`flex-row items-center flex-1`}>
              <Ionicons
                name={isCompleted ? 'checkmark-circle' : 'time'}
                size={24}
                color={isCompleted ? '#10B981' : '#F59E0B'}
                style={tw`mr-3`}
              />
              <View>
                <Text
                  style={tw`text-sm font-bold ${
                    isCompleted ? 'text-emerald-800' : 'text-amber-800'
                  }`}
                >
                  {isCompleted ? 'Đã nộp / Hoàn thành' : 'Đang thực hiện (Chưa xong)'}
                </Text>
                <Text
                  style={tw`text-xs ${
                    isCompleted ? 'text-emerald-600' : 'text-amber-600'
                  }`}
                >
                  Hạn nộp: {asg.dueDate}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => toggleAssignmentStatus(asg.id)}
              style={tw`px-3 py-1.5 rounded-xl ${
                isCompleted ? 'bg-white border border-emerald-300' : 'bg-blue-600'
              }`}
            >
              <Text
                style={tw`text-xs font-bold ${
                  isCompleted ? 'text-emerald-700' : 'text-white'
                }`}
              >
                {isCompleted ? 'Làm lại' : 'Đánh dấu xong'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={tw`text-sm font-bold text-slate-700 mb-1.5`}>Mô tả & Ghi chú</Text>
          <View style={tw`bg-slate-50 rounded-2xl p-4`}>
            <Text style={tw`text-slate-600 text-sm leading-6`}>
              {asg.description || 'Không có mô tả chi tiết cho bài tập này.'}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          onPress={() => router.push(`/assignments/edit/${asg.id}`)}
          style={tw`bg-white border border-slate-200 py-3.5 rounded-2xl items-center flex-row justify-center mb-3 shadow-xs`}
        >
          <Ionicons name="create-outline" size={18} color="#2563EB" style={tw`mr-2`} />
          <Text style={tw`text-blue-600 font-bold text-sm`}>Chỉnh sửa bài tập</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          style={tw`bg-red-50 border border-red-200 py-3.5 rounded-2xl items-center flex-row justify-center`}
        >
          <Ionicons name="trash-outline" size={18} color="#DC2626" style={tw`mr-2`} />
          <Text style={tw`text-red-600 font-bold text-sm`}>Xóa bài tập này</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
