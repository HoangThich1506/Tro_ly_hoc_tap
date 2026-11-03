import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams();
  const { notes, togglePinNote, deleteNote } = useApp();

  const note = notes.find((n) => n.id === id);

  if (!note) {
    return (
      <View style={tw`flex-1 bg-slate-50 items-center justify-center p-6`}>
        <Ionicons name="alert-circle-outline" size={48} color="#EF4444" style={tw`mb-2`} />
        <Text style={tw`text-lg font-bold text-slate-800`}>Không tìm thấy ghi chú</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`mt-4 bg-blue-600 px-5 py-2.5 rounded-xl`}
        >
          <Text style={tw`text-white font-bold`}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleDelete = () => {
    deleteNote(note.id);
    router.back();
  };

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Nội dung ghi chú"
        subtitle={note.subjectName}
        rightIcon="create-outline"
        onRightPress={() => router.push(`/notes/edit/${note.id}`)}
      />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        <View
          style={tw`rounded-3xl p-6 border border-slate-200/80 shadow-xs mb-5 bg-[${
            note.color || '#FFFFFF'
          }]`}
        >
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <View style={tw`px-3 py-1 rounded-full bg-white/70 border border-slate-200`}>
              <Text style={tw`text-xs font-bold text-slate-700`}>{note.subjectName}</Text>
            </View>

            <TouchableOpacity
              onPress={() => togglePinNote(note.id)}
              style={tw`p-2 rounded-full bg-white/70`}
            >
              <Ionicons
                name={note.isPinned ? 'pin' : 'pin-outline'}
                size={18}
                color={note.isPinned ? '#2563EB' : '#64748B'}
              />
            </TouchableOpacity>
          </View>

          <Text style={tw`text-2xl font-bold text-slate-900 mb-3`}>{note.title}</Text>
          <Text style={tw`text-11px text-slate-500 mb-4`}>Cập nhật lần cuối: {note.updatedAt}</Text>

          <View style={tw`bg-white/80 rounded-2xl p-4 border border-slate-200/50`}>
            <Text style={tw`text-slate-800 text-base leading-7`}>
              {note.content || 'Nội dung ghi chú trống.'}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          onPress={() => router.push(`/notes/edit/${note.id}`)}
          style={tw`bg-white border border-slate-200 py-3.5 rounded-2xl items-center flex-row justify-center mb-3 shadow-xs`}
        >
          <Ionicons name="create-outline" size={18} color="#2563EB" style={tw`mr-2`} />
          <Text style={tw`text-blue-600 font-bold text-sm`}>Chỉnh sửa ghi chú</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          style={tw`bg-red-50 border border-red-200 py-3.5 rounded-2xl items-center flex-row justify-center`}
        >
          <Ionicons name="trash-outline" size={18} color="#DC2626" style={tw`mr-2`} />
          <Text style={tw`text-red-600 font-bold text-sm`}>Xóa ghi chú này</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
