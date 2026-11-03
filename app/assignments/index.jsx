import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import BottomTaskbar from '../../components/common/BottomTaskbar.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function AssignmentsListScreen() {
  const { assignments, toggleAssignmentStatus } = useApp();
  const [filterTab, setFilterTab] = useState('pending'); // pending | all | completed
  const [search, setSearch] = useState('');

  const completedCount = assignments.filter((a) => a.status === 'completed').length;

  const filtered = assignments.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.subjectName.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;
    if (filterTab === 'pending') return a.status !== 'completed';
    if (filterTab === 'completed') return a.status === 'completed';
    return true;
  });

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Danh sách bài tập"
        subtitle={`${assignments.filter((a) => a.status !== 'completed').length} bài cần làm`}
        rightIcon="checkmark-done-circle-outline"
        onRightPress={() => router.push('/assignments/completed')}
      />

      {/* Filter Tabs & Search */}
      <View style={tw`bg-white px-4 pt-3 pb-2 border-b border-slate-100`}>
        <View style={tw`flex-row items-center bg-slate-100 rounded-xl px-3 py-2 mb-3`}>
          <Ionicons name="search" size={18} color="#64748B" style={tw`mr-2`} />
          <TextInput
            placeholder="Tìm bài tập, môn học..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
            style={tw`flex-1 text-slate-800 text-sm`}
          />
        </View>

        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity
            onPress={() => setFilterTab('pending')}
            style={tw`flex-1 py-2 items-center border-b-2 ${
              filterTab === 'pending' ? 'border-blue-600' : 'border-transparent'
            }`}
          >
            <Text
              style={tw`text-xs font-bold ${
                filterTab === 'pending' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              Cần nộp ({assignments.filter((a) => a.status !== 'completed').length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFilterTab('all')}
            style={tw`flex-1 py-2 items-center border-b-2 ${
              filterTab === 'all' ? 'border-blue-600' : 'border-transparent'
            }`}
          >
            <Text
              style={tw`text-xs font-bold ${
                filterTab === 'all' ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              Tất cả ({assignments.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/assignments/completed')}
            style={tw`flex-1 py-2 items-center border-b-2 border-transparent`}
          >
            <Text style={tw`text-xs font-bold text-emerald-600`}>
              Đã xong ({completedCount}) →
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={tw`p-5 pb-20`}>
        {filtered.length === 0 ? (
          <View style={tw`bg-white rounded-2xl p-8 items-center border border-slate-100 my-8`}>
            <Ionicons name="checkbox-outline" size={48} color="#CBD5E1" style={tw`mb-2`} />
            <Text style={tw`text-base font-bold text-slate-700`}>Không có bài tập nào</Text>
            <Text style={tw`text-xs text-slate-400 mt-1`}>Tuyệt vời! Bạn đã hoàn thành các bài tập hiện tại.</Text>
          </View>
        ) : (
          filtered.map((asg) => {
            const isCompleted = asg.status === 'completed';

            return (
              <View
                key={asg.id}
                style={tw`bg-white rounded-2xl p-4 mb-3 border border-slate-100 shadow-xs`}
              >
                <View style={tw`flex-row items-start justify-between`}>
                  <TouchableOpacity
                    onPress={() => toggleAssignmentStatus(asg.id)}
                    style={tw`mr-3 mt-0.5`}
                  >
                    <Ionicons
                      name={isCompleted ? 'checkbox' : 'square-outline'}
                      size={24}
                      color={isCompleted ? '#10B981' : '#94A3B8'}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => router.push(`/assignments/${asg.id}`)}
                    style={tw`flex-1 mr-2`}
                  >
                    <Text
                      style={tw`text-sm font-bold text-slate-800 ${
                        isCompleted ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {asg.title}
                    </Text>
                    <Text style={tw`text-xs font-semibold text-blue-600 mt-1`}>
                      {asg.subjectName}
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={tw`px-2 py-0.5 rounded-full ${
                      asg.priority === 'high'
                        ? 'bg-red-50'
                        : asg.priority === 'medium'
                        ? 'bg-amber-50'
                        : 'bg-slate-100'
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

                <View style={tw`flex-row items-center justify-between mt-3 pt-2.5 border-t border-slate-50`}>
                  <View style={tw`flex-row items-center`}>
                    <Ionicons name="time-outline" size={14} color="#EF4444" style={tw`mr-1`} />
                    <Text style={tw`text-xs font-semibold text-red-500`}>
                      Hạn chót: {asg.dueDate}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => router.push(`/assignments/${asg.id}`)}>
                    <Text style={tw`text-xs font-semibold text-slate-500`}>Chi tiết →</Text>
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
        onPress={() => router.push('/assignments/add')}
        style={tw`absolute bottom-20 right-6 w-14 h-14 rounded-full bg-blue-600 items-center justify-center shadow-lg`}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <BottomTaskbar activeTab="assignments" />
    </View>
  );
}
