import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import BottomTaskbar from '../../components/common/BottomTaskbar.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function NotesListScreen() {
  const { notes, togglePinNote } = useApp();
  const [search, setSearch] = useState('');

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      n.subjectName.toLowerCase().includes(search.toLowerCase())
  );

  const pinnedNotes = filtered.filter((n) => n.isPinned);
  const otherNotes = filtered.filter((n) => !n.isPinned);

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Sổ tay Ghi chú"
        subtitle={`${notes.length} ghi chú đã lưu`}
        rightIcon="add"
        onRightPress={() => router.push('/notes/add')}
      />

      {/* Search Input */}
      <View style={tw`p-4 bg-white border-b border-slate-100`}>
        <View style={tw`flex-row items-center bg-slate-100 rounded-xl px-3 py-2`}>
          <Ionicons name="search" size={18} color="#64748B" style={tw`mr-2`} />
          <TextInput
            placeholder="Tìm theo tiêu đề, nội dung, môn học..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
            style={tw`flex-1 text-slate-800 text-sm`}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={tw`p-5 pb-20`}>
        {/* Pinned Section */}
        {pinnedNotes.length > 0 && (
          <View style={tw`mb-6`}>
            <View style={tw`flex-row items-center mb-3`}>
              <Ionicons name="pin" size={16} color="#2563EB" style={tw`mr-1.5`} />
              <Text style={tw`text-xs font-bold text-slate-700 uppercase tracking-wider`}>
                Ghi chú đã ghim ({pinnedNotes.length})
              </Text>
            </View>

            <View style={tw`flex-row flex-wrap justify-between`}>
              {pinnedNotes.map((note) => (
                <TouchableOpacity
                  key={note.id}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/notes/${note.id}`)}
                  style={tw`w-[48%] rounded-2xl p-4 mb-3 border border-slate-200/60 shadow-xs bg-[${
                    note.color || '#DBEAFE'
                  }]`}
                >
                  <View style={tw`flex-row justify-between items-start mb-2`}>
                    <Text style={tw`text-10px font-bold text-slate-600 uppercase`} numberOfLines={1}>
                      {note.subjectName}
                    </Text>
                    <TouchableOpacity onPress={() => togglePinNote(note.id)}>
                      <Ionicons name="pin" size={14} color="#2563EB" />
                    </TouchableOpacity>
                  </View>
                  <Text style={tw`text-sm font-bold text-slate-900 mb-1.5`} numberOfLines={2}>
                    {note.title}
                  </Text>
                  <Text style={tw`text-xs text-slate-600 leading-4 mb-2`} numberOfLines={4}>
                    {note.content}
                  </Text>
                  <Text style={tw`text-10px text-slate-500`}>{note.updatedAt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Other Notes Section */}
        <Text style={tw`text-xs font-bold text-slate-700 uppercase tracking-wider mb-3`}>
          Tất cả ghi chú ({otherNotes.length})
        </Text>

        {otherNotes.length === 0 && pinnedNotes.length === 0 ? (
          <View style={tw`bg-white rounded-2xl p-8 items-center border border-slate-100 my-6`}>
            <Ionicons name="document-text-outline" size={48} color="#CBD5E1" style={tw`mb-2`} />
            <Text style={tw`text-base font-bold text-slate-700`}>Chưa có ghi chú nào</Text>
            <Text style={tw`text-xs text-slate-400 mt-1`}>Nhấn dấu cộng (+) bên dưới để tạo ghi chú đầu tiên.</Text>
          </View>
        ) : (
          <View style={tw`flex-row flex-wrap justify-between`}>
            {otherNotes.map((note) => (
              <TouchableOpacity
                key={note.id}
                activeOpacity={0.8}
                onPress={() => router.push(`/notes/${note.id}`)}
                style={tw`w-[48%] rounded-2xl p-4 mb-3 border border-slate-200/60 shadow-xs bg-[${
                  note.color || '#F1F5F9'
                }]`}
              >
                <View style={tw`flex-row justify-between items-start mb-2`}>
                  <Text style={tw`text-10px font-bold text-slate-600 uppercase`} numberOfLines={1}>
                    {note.subjectName}
                  </Text>
                  <TouchableOpacity onPress={() => togglePinNote(note.id)}>
                    <Ionicons name="pin-outline" size={14} color="#64748B" />
                  </TouchableOpacity>
                </View>
                <Text style={tw`text-sm font-bold text-slate-900 mb-1.5`} numberOfLines={2}>
                  {note.title}
                </Text>
                <Text style={tw`text-xs text-slate-600 leading-4 mb-2`} numberOfLines={4}>
                  {note.content}
                </Text>
                <Text style={tw`text-10px text-slate-500`}>{note.updatedAt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => router.push('/notes/add')}
        style={tw`absolute bottom-20 right-6 w-14 h-14 rounded-full bg-blue-600 items-center justify-center shadow-lg`}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <BottomTaskbar activeTab="notes" />
    </View>
  );
}
