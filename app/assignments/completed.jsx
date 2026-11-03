import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function CompletedAssignmentsScreen() {
  const { assignments, toggleAssignmentStatus, deleteAssignment } = useApp();

  const completed = assignments.filter((a) => a.status === 'completed');

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Bài tập đã hoàn thành"
        subtitle={`${completed.length} bài đã nộp thành công`}
      />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        {/* Achievement banner */}
        <View style={tw`bg-emerald-600 rounded-3xl p-5 mb-5 shadow-sm`}>
          <View style={tw`flex-row items-center mb-2`}>
            <View style={tw`w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-3`}>
              <Ionicons name="trophy" size={20} color="#FFFFFF" />
            </View>
            <View>
              <Text style={tw`text-emerald-100 text-xs`}>Thành tích học tập</Text>
              <Text style={tw`text-white text-lg font-bold`}>Rất xuất sắc! 🎉</Text>
            </View>
          </View>
          <Text style={tw`text-emerald-100 text-xs leading-5`}>
            Bạn đã nộp đúng hạn {completed.length} bài tập. Hãy tiếp tục duy trì phong độ này nhé!
          </Text>
        </View>

        {completed.length === 0 ? (
          <View style={tw`bg-white rounded-2xl p-8 items-center border border-slate-100 my-6`}>
            <Ionicons name="file-tray-outline" size={48} color="#CBD5E1" style={tw`mb-2`} />
            <Text style={tw`text-base font-bold text-slate-700`}>Chưa có bài tập hoàn thành</Text>
            <Text style={tw`text-xs text-slate-400 mt-1 text-center`}>
              Các bài tập bạn đánh dấu hoàn thành sẽ xuất hiện tại danh sách này.
            </Text>
          </View>
        ) : (
          completed.map((asg) => (
            <View
              key={asg.id}
              style={tw`bg-white rounded-2xl p-4 mb-3 border border-slate-100 shadow-xs`}
            >
              <View style={tw`flex-row items-start justify-between`}>
                <TouchableOpacity
                  onPress={() => toggleAssignmentStatus(asg.id)}
                  style={tw`mr-3 mt-0.5`}
                >
                  <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                </TouchableOpacity>

                <View style={tw`flex-1 mr-2`}>
                  <Text style={tw`text-sm font-bold text-slate-800 line-through text-slate-500`}>
                    {asg.title}
                  </Text>
                  <Text style={tw`text-xs font-semibold text-blue-600 mt-1`}>
                    {asg.subjectName}
                  </Text>
                </View>

                <View style={tw`px-2 py-0.5 rounded-full bg-emerald-50`}>
                  <Text style={tw`text-10px font-bold text-emerald-700`}>ĐÃ XONG</Text>
                </View>
              </View>

              <View style={tw`flex-row items-center justify-between mt-3 pt-2.5 border-t border-slate-50`}>
                <Text style={tw`text-xs text-slate-400`}>Hạn bài: {asg.dueDate}</Text>
                <View style={tw`flex-row items-center`}>
                  <TouchableOpacity
                    onPress={() => toggleAssignmentStatus(asg.id)}
                    style={tw`mr-4`}
                  >
                    <Text style={tw`text-xs font-semibold text-blue-600`}>Làm lại</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteAssignment(asg.id)}>
                    <Text style={tw`text-xs font-semibold text-red-500`}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
