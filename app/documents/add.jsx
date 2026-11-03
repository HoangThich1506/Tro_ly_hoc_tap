import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function AddDocumentScreen() {
  const { subjects, addDocument } = useApp();
  const [selectedSubjectId, setSelectedSubjectId] = useState(
    subjects[0]?.id || ''
  );
  const [title, setTitle] = useState('');
  const [type, setType] = useState('pdf'); // pdf | doc | slide
  const [url, setUrl] = useState('');
  const [size, setSize] = useState('3.5 MB');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Vui lòng nhập tên tài liệu');
      return;
    }
    const subj = subjects.find((s) => s.id === selectedSubjectId);
    setLoading(true);
    await addDocument({
      title: title.trim().endsWith(`.${type}`) ? title.trim() : `${title.trim()}.${type}`,
      subjectId: selectedSubjectId,
      subjectName: subj ? subj.name : 'Tài liệu chung',
      type,
      url: url.trim() || 'https://example.com/document',
      size: size.trim() || '2.0 MB',
    });
    setLoading(false);
    router.back();
  };

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header title="Thêm tài liệu mới" subtitle="Đính kèm tài liệu học tập" />

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
            label="Tên tài liệu / Giáo trình *"
            placeholder="Ví dụ: Đề cương ôn thi cuối kỳ"
            icon="document-text-outline"
            value={title}
            onChangeText={setTitle}
          />

          {/* Doc Type Selector */}
          <Text style={tw`text-sm font-semibold text-slate-700 mb-2`}>Định dạng tài liệu</Text>
          <View style={tw`flex-row justify-between mb-4`}>
            {[
              { id: 'pdf', label: 'PDF Document' },
              { id: 'doc', label: 'Word (.docx)' },
              { id: 'slide', label: 'PowerPoint (.pptx)' },
            ].map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setType(item.id)}
                style={tw`flex-1 mx-1 py-2.5 rounded-xl border items-center ${
                  type === item.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <Text
                  style={tw`text-xs font-bold ${
                    type === item.id ? 'text-blue-600' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <InputField
            label="Dung lượng tệp (ước tính)"
            placeholder="3.5 MB"
            icon="server-outline"
            value={size}
            onChangeText={setSize}
          />

          <InputField
            label="Đường dẫn liên kết / URL"
            placeholder="https://drive.google.com/..."
            icon="link-outline"
            value={url}
            onChangeText={setUrl}
          />
        </View>

        <Button
          title="Lưu tài liệu"
          onPress={handleSave}
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
