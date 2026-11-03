import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import BottomTaskbar from '../../components/common/BottomTaskbar.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function SubjectsListScreen() {
  const { subjects, assignments } = useApp();
  const [search, setSearch] = useState('');

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.teacher.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Danh sách môn học"
        subtitle={`${subjects.length} môn học trong kỳ`}
        rightIcon="add"
        onRightPress={() => router.push('/subjects/add')}
      />

      {/* Search Input */}
      <View style={tw`p-4 bg-white border-b border-slate-100`}>
        <View style={tw`flex-row items-center bg-slate-100 rounded-xl px-3 py-2`}>
          <Ionicons name="search" size={18} color="#64748B" style={tw`mr-2`} />
          <TextInput
            placeholder="Tìm theo tên môn, mã môn, giảng viên..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
            style={tw`flex-1 text-slate-800 text-sm`}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView contentContainerStyle={tw`p-5 pb-20`}>
        {filteredSubjects.length === 0 ? (
          <View style={tw`bg-white rounded-2xl p-8 items-center border border-slate-100 my-8`}>
            <Ionicons name="book-outline" size={48} color="#CBD5E1" style={tw`mb-2`} />
            <Text style={tw`text-base font-bold text-slate-700`}>Không tìm thấy môn học</Text>
            <Text style={tw`text-xs text-slate-400 mt-1`}>Thử tìm kiếm với từ khóa khác</Text>
          </View>
        ) : (
          filteredSubjects.map((sub) => {
            const subjectAssignments = assignments.filter((a) => a.subjectId === sub.id);

            return (
              <TouchableOpacity
                key={sub.id}
                activeOpacity={0.8}
                onPress={() => router.push(`/subjects/${sub.id}`)}
                style={tw`bg-white rounded-2xl p-4 mb-3 border border-slate-100 shadow-xs`}
              >
                <View style={tw`flex-row items-start justify-between mb-2`}>
                  <View style={tw`flex-row items-center flex-1 mr-2`}>
                    <View
                      style={tw`w-3.5 h-10 rounded-full mr-3 bg-[${sub.color || '#3B82F6'}]`}
                    />
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-xs font-bold text-blue-600 uppercase`}>
                        {sub.code} • {sub.credits} Tín chỉ
                      </Text>
                      <Text style={tw`text-base font-bold text-slate-800 mt-0.5`} numberOfLines={1}>
                        {sub.name}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                </View>

                <View style={tw`bg-slate-50 rounded-xl p-2.5 mt-1 flex-row justify-between items-center`}>
                  <View style={tw`flex-row items-center`}>
                    <Ionicons name="person-outline" size={14} color="#64748B" style={tw`mr-1`} />
                    <Text style={tw`text-xs text-slate-600`}>{sub.teacher}</Text>
                  </View>
                  <View style={tw`flex-row items-center`}>
                    <Ionicons name="location-outline" size={14} color="#64748B" style={tw`mr-1`} />
                    <Text style={tw`text-xs text-slate-600`}>{sub.room}</Text>
                  </View>
                </View>

                <View style={tw`flex-row justify-between items-center mt-3 pt-2 border-t border-slate-50`}>
                  <Text style={tw`text-11px text-slate-400`}>
                    {subjectAssignments.length} bài tập giao
                  </Text>
                  <Text style={tw`text-xs font-semibold text-blue-600`}>Xem chi tiết →</Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => router.push('/subjects/add')}
        style={tw`absolute bottom-20 right-6 w-14 h-14 rounded-full bg-blue-600 items-center justify-center shadow-lg`}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <BottomTaskbar activeTab="subjects" />
    </View>
  );
}
