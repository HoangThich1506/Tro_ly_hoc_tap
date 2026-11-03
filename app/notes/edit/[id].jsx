import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';
import Header from '../../../components/common/Header.jsx';
import InputField from '../../../components/common/InputField.jsx';
import Button from '../../../components/common/Button.jsx';
import { useApp } from '../../../context/AppContext.jsx';

const NOTE_COLORS = ['#DBEAFE', '#D1FAE5', '#FEF3C7', '#FCE7F3', '#EDE9FE', '#F1F5F9'];

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams();
  const { notes, subjects, updateNote } = useApp();

  const note = notes.find((n) => n.id === id);

  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (note) {
      setSelectedSubjectId(note.subjectId || '');
      setTitle(note.title || '');
      setContent(note.content || '');
      setSelectedColor(note.color || NOTE_COLORS[0]);
    }
  }, [note]);

  const handleUpdate = async () => {
    if (!title.trim()) {
      alert('Vui lòng nhập tiêu đề ghi chú');
      return;
    }
    const subj = subjects.find((s) => s.id === selectedSubjectId);
    setLoading(true);
    await updateNote(id, {
      title: title.trim(),
      content: content.trim(),
      subjectId: selectedSubjectId,
      subjectName: subj ? subj.name : note.subjectName,
      color: selectedColor,
    });
    setLoading(false);
    router.back();
  };

  if (!note) return null;

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header title="Chỉnh sửa ghi chú" subtitle={note.title} />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        <View style={tw`bg-white rounded-3xl p-5 border border-slate-100 shadow-xs mb-5`}>
          {/* Select Subject */}
          <Text style={tw`text-sm font-semibold text-slate-700 mb-2`}>Chọn môn học</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
            {subjects.map((sub) => {
              const isSelected = selectedSubjectId === sub.id;
              return (
                <TouchableOpacity
                  key={sub.id}
                  onPress={() => setSelectedSubjectId(sub.id)}
                  style={tw`mr-2 px-3.5 py-2 rounded-xl border ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <Text
                    style={tw`text-xs font-semibold ${
                      isSelected ? 'text-white' : 'text-slate-700'
                    }`}
                  >
                    {sub.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <InputField
            label="Tiêu đề ghi chú *"
            placeholder="Tiêu đề"
            icon="document-text-outline"
            value={title}
            onChangeText={setTitle}
          />

          {/* Color Tag Picker */}
          <Text style={tw`text-sm font-semibold text-slate-700 mb-2`}>Màu sắc thẻ ghi chú</Text>
          <View style={tw`flex-row justify-between mb-4`}>
            {NOTE_COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(color)}
                style={tw`w-10 h-10 rounded-xl bg-[${color}] items-center justify-center border ${
                  selectedColor === color ? 'border-slate-800 scale-110' : 'border-slate-200'
                }`}
              />
            ))}
          </View>

          <InputField
            label="Nội dung ghi chú"
            placeholder="Nội dung..."
            icon="create-outline"
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={8}
          />
        </View>

        <Button
          title="Lưu thay đổi"
          onPress={handleUpdate}
          loading={loading}
          style="mb-4"
        />

        <Button
          title="Hủy bỏ"
          variant="secondary"
          onPress={() => router.back()}
        />
      </ScrollView>
    </View>
  );
}
