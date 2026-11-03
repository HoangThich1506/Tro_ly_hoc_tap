import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';
import Header from '../../../components/common/Header.jsx';
import InputField from '../../../components/common/InputField.jsx';
import Button from '../../../components/common/Button.jsx';
import { useApp } from '../../../context/AppContext.jsx';

export default function EditAssignmentScreen() {
  const { id } = useLocalSearchParams();
  const { assignments, subjects, updateAssignment } = useApp();

  const asg = assignments.find((a) => a.id === id);

  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (asg) {
      setSelectedSubjectId(asg.subjectId || '');
      setTitle(asg.title || '');
      setDueDate(asg.dueDate || '');
      setPriority(asg.priority || 'medium');
      setDescription(asg.description || '');
    }
  }, [asg]);

  const handleUpdate = async () => {
    if (!title.trim()) {
      alert('Vui lòng nhập tiêu đề bài tập');
      return;
    }
    const subj = subjects.find((s) => s.id === selectedSubjectId);
    setLoading(true);
    await updateAssignment(id, {
      title: title.trim(),
      subjectId: selectedSubjectId,
      subjectName: subj ? subj.name : asg.subjectName,
      dueDate,
      priority,
      description: description.trim(),
    });
    setLoading(false);
    router.back();
  };

  if (!asg) return null;

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header title="Chỉnh sửa bài tập" subtitle={asg.title} />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        <View style={tw`bg-white rounded-3xl p-5 border border-slate-100 shadow-xs mb-5`}>
          {/* Select Subject */}
          <Text style={tw`text-sm font-semibold text-slate-700 mb-2`}>Chọn môn học *</Text>
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
            label="Tiêu đề bài tập *"
            placeholder="Tiêu đề"
            icon="checkbox-outline"
            value={title}
            onChangeText={setTitle}
          />

          <InputField
            label="Hạn nộp (YYYY-MM-DD)"
            placeholder="2026-11-15"
            icon="calendar-outline"
            value={dueDate}
            onChangeText={setDueDate}
          />

          {/* Priority Picker */}
          <Text style={tw`text-sm font-semibold text-slate-700 mb-2`}>Mức độ ưu tiên</Text>
          <View style={tw`flex-row justify-between mb-4`}>
            {[
              { id: 'low', label: 'Thấp' },
              { id: 'medium', label: 'Vừa' },
              { id: 'high', label: 'Khẩn cấp' },
            ].map((p) => (
              <TouchableOpacity
                key={p.id}
                onPress={() => setPriority(p.id)}
                style={tw`flex-1 mx-1 py-2.5 rounded-xl border items-center ${
                  priority === p.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <Text
                  style={tw`text-xs font-bold ${
                    priority === p.id ? 'text-blue-600' : 'text-slate-600'
                  }`}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <InputField
            label="Mô tả & Hướng dẫn"
            placeholder="Ghi chú chi tiết..."
            icon="document-text-outline"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
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
