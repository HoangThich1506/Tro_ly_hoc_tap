import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';
import Header from '../../../components/common/Header.jsx';
import InputField from '../../../components/common/InputField.jsx';
import Button from '../../../components/common/Button.jsx';
import { useApp } from '../../../context/AppContext.jsx';

const COLOR_PALETTE = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#64748B'];

export default function EditSubjectScreen() {
  const { id } = useLocalSearchParams();
  const { subjects, updateSubject } = useApp();

  const subject = subjects.find((s) => s.id === id);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [credits, setCredits] = useState('3');
  const [teacher, setTeacher] = useState('');
  const [room, setRoom] = useState('');
  const [semester, setSemester] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTE[0]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (subject) {
      setName(subject.name || '');
      setCode(subject.code || '');
      setCredits(String(subject.credits || 3));
      setTeacher(subject.teacher || '');
      setRoom(subject.room || '');
      setSemester(subject.semester || '');
      setSelectedColor(subject.color || COLOR_PALETTE[0]);
      setDescription(subject.description || '');
    }
  }, [subject]);

  const handleUpdate = async () => {
    if (!name.trim()) {
      alert('Vui lòng nhập tên môn học');
      return;
    }
    setLoading(true);
    await updateSubject(id, {
      name: name.trim(),
      code: code.trim().toUpperCase(),
      credits: parseInt(credits, 10) || 3,
      teacher: teacher.trim(),
      room: room.trim(),
      semester,
      color: selectedColor,
      description: description.trim(),
    });
    setLoading(false);
    router.back();
  };

  if (!subject) {
    return null;
  }

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header title="Chỉnh sửa môn học" subtitle={subject.name} />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        <View style={tw`bg-white rounded-3xl p-5 border border-slate-100 shadow-xs mb-5`}>
          <InputField
            label="Tên môn học *"
            placeholder="Tên môn học"
            icon="book-outline"
            value={name}
            onChangeText={setName}
          />

          <View style={tw`flex-row justify-between`}>
            <View style={tw`w-[48%]`}>
              <InputField
                label="Mã môn học"
                placeholder="Mã môn"
                icon="barcode-outline"
                value={code}
                onChangeText={setCode}
              />
            </View>
            <View style={tw`w-[48%]`}>
              <InputField
                label="Số tín chỉ"
                placeholder="3"
                icon="ribbon-outline"
                value={credits}
                onChangeText={setCredits}
                keyboardType="numeric"
              />
            </View>
          </View>

          <InputField
            label="Giảng viên phụ trách"
            placeholder="Tên giảng viên"
            icon="person-outline"
            value={teacher}
            onChangeText={setTeacher}
          />

          <InputField
            label="Phòng học"
            placeholder="Phòng học"
            icon="location-outline"
            value={room}
            onChangeText={setRoom}
          />

          <InputField
            label="Học kỳ"
            placeholder="Học kỳ"
            icon="calendar-outline"
            value={semester}
            onChangeText={setSemester}
          />

          {/* Color Picker */}
          <Text style={tw`text-sm font-semibold text-slate-700 mb-2`}>Màu sắc đại diện</Text>
          <View style={tw`flex-row justify-between mb-4`}>
            {COLOR_PALETTE.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(color)}
                style={tw`w-9 h-9 rounded-full bg-[${color}] items-center justify-center ${
                  selectedColor === color ? 'border-2 border-slate-800 scale-110' : ''
                }`}
              />
            ))}
          </View>

          <InputField
            label="Mô tả / Ghi chú"
            placeholder="Nội dung tóm tắt..."
            icon="document-text-outline"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
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
