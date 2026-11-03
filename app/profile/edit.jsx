import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import { useApp } from '../../context/AppContext.jsx';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200';

export default function EditProfileScreen() {
  const { user, updateProfile } = useApp();

  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [major, setMajor] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [gpa, setGpa] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar || DEFAULT_AVATAR);
      setName(user.name || '');
      setEmail(user.email || '');
      setStudentId(user.studentId || '');
      setUniversity(user.university || '');
      setFaculty(user.faculty || '');
      setMajor(user.major || '');
      setAcademicYear(user.academicYear || '');
      setGpa(String(user.gpa || '3.65'));
    }
  }, [user]);

  // Pick image from local gallery or file picker
  const handlePickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Cần cấp quyền truy cập thư viện ảnh để đổi ảnh đại diện.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAvatar(result.assets[0].uri);
      }
    } catch (e) {
      alert('Không thể chọn ảnh: ' + (e.message || 'Vui lòng thử lại'));
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Vui lòng nhập họ tên sinh viên');
      return;
    }
    setLoading(true);
    await updateProfile({
      avatar: avatar.trim() || DEFAULT_AVATAR,
      name: name.trim(),
      email: email.trim(),
      studentId: studentId.trim(),
      university: university.trim(),
      faculty: faculty.trim(),
      major: major.trim(),
      academicYear: academicYear.trim(),
      gpa: parseFloat(gpa) || 3.65,
    });
    setLoading(false);
    router.back();
  };

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header title="Chỉnh sửa hồ sơ" subtitle="Cập nhật thông tin & ảnh đại diện" />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        {/* Avatar Section */}
        <View style={tw`bg-white rounded-3xl p-5 border border-slate-100 shadow-xs mb-5 items-center`}>
          <Text style={tw`text-sm font-bold text-slate-800 mb-3`}>Ảnh đại diện</Text>

          {/* Current Avatar with change button */}
          <View style={tw`relative mb-4`}>
            <Image
              source={{ uri: avatar || DEFAULT_AVATAR }}
              style={tw`w-28 h-28 rounded-full border-4 border-blue-100`}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handlePickImage}
              style={tw`absolute bottom-0 right-0 w-9 h-9 rounded-full bg-blue-600 items-center justify-center border-2 border-white shadow-sm`}
            >
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handlePickImage}
            style={tw`bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl flex-row items-center`}
          >
            <Ionicons name="image-outline" size={16} color="#2563EB" style={tw`mr-1.5`} />
            <Text style={tw`text-blue-600 font-semibold text-xs`}>Tải ảnh từ máy tính / điện thoại</Text>
          </TouchableOpacity>
        </View>

        {/* Academic Profile Form */}
        <View style={tw`bg-white rounded-3xl p-5 border border-slate-100 shadow-xs mb-5`}>
          <Text style={tw`text-sm font-bold text-slate-800 mb-4`}>Thông tin học vụ</Text>

          <InputField
            label="Họ và tên sinh viên *"
            placeholder="Họ và tên"
            icon="person-outline"
            value={name}
            onChangeText={setName}
          />

          <InputField
            label="Mã số sinh viên (MSSV)"
            placeholder="MSSV"
            icon="card-outline"
            value={studentId}
            onChangeText={setStudentId}
          />

          <InputField
            label="Địa chỉ Email"
            placeholder="Email"
            icon="mail-outline"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <InputField
            label="Trường Đại học"
            placeholder="Trường Đại học"
            icon="school-outline"
            value={university}
            onChangeText={setUniversity}
          />

          <View style={tw`flex-row justify-between`}>
            <View style={tw`w-[48%]`}>
              <InputField
                label="Khoa / Viện"
                placeholder="Khoa"
                icon="business-outline"
                value={faculty}
                onChangeText={setFaculty}
              />
            </View>
            <View style={tw`w-[48%]`}>
              <InputField
                label="Chuyên ngành"
                placeholder="Chuyên ngành"
                icon="book-outline"
                value={major}
                onChangeText={setMajor}
              />
            </View>
          </View>

          <View style={tw`flex-row justify-between`}>
            <View style={tw`w-[48%]`}>
              <InputField
                label="Niên khóa"
                placeholder="2022 - 2026"
                icon="calendar-outline"
                value={academicYear}
                onChangeText={setAcademicYear}
              />
            </View>
            <View style={tw`w-[48%]`}>
              <InputField
                label="Điểm GPA hiện tại"
                placeholder="3.65"
                icon="star-outline"
                value={gpa}
                onChangeText={setGpa}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <Button
          title="Lưu thông tin & Ảnh đại diện"
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
