import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import { useApp } from '../../context/AppContext.jsx';

const COLOR_PALETTE = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#64748B'];

export default function AddSubjectScreen() {
  const { addSubject } = useApp();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [credits, setCredits] = useState('3');
  const [teacher, setTeacher] = useState('');
  const [room, setRoom] = useState('');
  const [semester, setSemester] = useState('Học kỳ 2 - 2025-2026');
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTE[0]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Vui lòng nhập tên môn học');
      return;
    }
    setLoading(true);
    await addSubject({
      name: name.trim(),
      code: code.trim().toUpperCase() || 'MH' + Math.floor(1000 + Math.random() * 9000),
      credits: parseInt(credits, 10) || 3,
      teacher: teacher.trim() || 'Chưa cập nhật',
      room: room.trim() || 'Chưa xếp phòng',
      semester,
      color: selectedColor,
      description: description.trim(),
    });
    setLoading(false);
    router.back();
  };

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header title="Thêm môn học mới" subtitle="Đăng ký môn học vào học kỳ" />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        <View style={tw`bg-white rounded-3xl p-5 border border-slate-100 shadow-xs mb-5`}>
          <InputField
            label="Tên môn học *"
            placeholder="Ví dụ: Lập trình Thiết bị Di động"
            icon="book-outline"
            value={name}
            onChangeText={setName}
          />

          <View style={tw`flex-row justify-between`}>
            <View style={tw`w-[48%]`}>
              <InputField
                label="Mã môn học"
                placeholder="IT3080"
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
            placeholder="TS. Nguyễn Văn B"
            icon="person-outline"
            value={teacher}
            onChangeText={setTeacher}
          />

          <InputField
            label="Phòng học / Giảng đường"
            placeholder="Phòng B1-302"
            icon="location-outline"
            value={room}
            onChangeText={setRoom}
          />

          <InputField
            label="Học kỳ"
            placeholder="Học kỳ 2 - 2025-2026"
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
            label="Mô tả / Ghi chú môn học"
            placeholder="Nhập nội dung tóm tắt môn học..."
            icon="document-text-outline"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
        </View>

        <Button
          title="Lưu môn học"
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
