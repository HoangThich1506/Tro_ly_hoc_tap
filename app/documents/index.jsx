import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function DocumentsListScreen() {
  const { documents, deleteDocument } = useApp();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all'); // all | pdf | doc | slide

  const filtered = documents.filter((doc) => {
    const matchSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.subjectName.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (filterType !== 'all') return doc.type === filterType;
    return true;
  });

  const getDocIcon = (type) => {
    switch (type) {
      case 'pdf':
        return { icon: 'document-text', color: '#DC2626', bg: 'bg-red-50' };
      case 'doc':
        return { icon: 'newspaper', color: '#2563EB', bg: 'bg-blue-50' };
      case 'slide':
        return { icon: 'easel', color: '#EA580C', bg: 'bg-orange-50' };
      default:
        return { icon: 'folder', color: '#4B5563', bg: 'bg-slate-100' };
    }
  };

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title="Tài liệu học tập"
        subtitle={`${documents.length} tài liệu đã lưu trữ`}
        rightIcon="add"
        onRightPress={() => router.push('/documents/add')}
      />

      {/* Search & Type filter */}
      <View style={tw`p-4 bg-white border-b border-slate-100`}>
        <View style={tw`flex-row items-center bg-slate-100 rounded-xl px-3 py-2 mb-3`}>
          <Ionicons name="search" size={18} color="#64748B" style={tw`mr-2`} />
          <TextInput
            placeholder="Tìm kiếm tài liệu, môn học..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
            style={tw`flex-1 text-slate-800 text-sm`}
          />
        </View>

        <View style={tw`flex-row justify-between`}>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'pdf', label: 'PDF' },
            { id: 'doc', label: 'Word' },
            { id: 'slide', label: 'Slide/PPT' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setFilterType(tab.id)}
              style={tw`flex-1 py-1.5 mx-1 items-center rounded-xl ${
                filterType === tab.id ? 'bg-blue-600' : 'bg-slate-100'
              }`}
            >
              <Text
                style={tw`text-xs font-bold ${
                  filterType === tab.id ? 'text-white' : 'text-slate-600'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={tw`p-5 pb-20`}>
        {filtered.length === 0 ? (
          <View style={tw`bg-white rounded-2xl p-8 items-center border border-slate-100 my-8`}>
            <Ionicons name="folder-open-outline" size={48} color="#CBD5E1" style={tw`mb-2`} />
            <Text style={tw`text-base font-bold text-slate-700`}>Chưa có tài liệu phù hợp</Text>
            <Text style={tw`text-xs text-slate-400 mt-1`}>Nhấn dấu cộng (+) để thêm tài liệu mới.</Text>
          </View>
        ) : (
          filtered.map((doc) => {
            const iconConfig = getDocIcon(doc.type);

            return (
              <View
                key={doc.id}
                style={tw`bg-white rounded-2xl p-4 mb-3 border border-slate-100 shadow-xs flex-row items-center justify-between`}
              >
                <View style={tw`flex-row items-center flex-1 mr-2`}>
                  <View
                    style={tw`w-12 h-12 rounded-2xl ${iconConfig.bg} items-center justify-center mr-3`}
                  >
                    <Ionicons name={iconConfig.icon} size={24} color={iconConfig.color} />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-sm font-bold text-slate-800`} numberOfLines={1}>
                      {doc.title}
                    </Text>
                    <Text style={tw`text-xs text-blue-600 font-semibold mt-0.5`}>
                      {doc.subjectName}
                    </Text>
                    <Text style={tw`text-10px text-slate-400 mt-0.5`}>
                      {doc.size} • Tải lên: {doc.uploadedAt}
                    </Text>
                  </View>
                </View>

                <View style={tw`flex-row items-center`}>
                  <TouchableOpacity
                    onPress={() => alert(`Mở tài liệu: ${doc.title}`)}
                    style={tw`p-2 bg-blue-50 rounded-xl mr-2`}
                  >
                    <Ionicons name="download-outline" size={18} color="#2563EB" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => deleteDocument(doc.id)}
                    style={tw`p-2 bg-red-50 rounded-xl`}
                  >
                    <Ionicons name="trash-outline" size={18} color="#DC2626" />
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
        onPress={() => router.push('/documents/add')}
        style={tw`absolute bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 items-center justify-center shadow-lg`}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}
