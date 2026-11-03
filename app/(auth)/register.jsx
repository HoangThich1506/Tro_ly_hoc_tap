import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function RegisterScreen() {
  const { register, authError } = useAuth();
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!agreeTerms) {
      alert('Vui lòng đồng ý với Điều khoản sử dụng.');
      return;
    }
    setLoading(true);
    await register(name, email, password, confirmPassword);
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-grow px-6 py-10 bg-white`}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={tw`w-10 h-10 rounded-full bg-slate-100 items-center justify-center mb-4`}
      >
        <Ionicons name="arrow-back" size={20} color="#1E293B" />
      </TouchableOpacity>

      <View style={tw`mb-6`}>
        <Text style={tw`text-2xl font-bold text-slate-800`}>Tạo tài khoản mới</Text>
        <Text style={tw`text-slate-500 text-sm mt-1`}>Tham gia StudyMate để tối ưu hóa học tập</Text>
      </View>

      {authError && (
        <View style={tw`bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex-row items-center`}>
          <Ionicons name="alert-circle" size={20} color="#EF4444" style={tw`mr-2`} />
          <Text style={tw`text-red-600 text-sm flex-1`}>{authError}</Text>
        </View>
      )}

      <InputField
        label="Họ và tên sinh viên"
        placeholder="Nguyễn Văn A"
        icon="person-outline"
        value={name}
        onChangeText={setName}
      />

      <InputField
        label="Mã số sinh viên (MSSV)"
        placeholder="20221234"
        icon="card-outline"
        value={studentId}
        onChangeText={setStudentId}
      />

      <InputField
        label="Email trường hoặc cá nhân"
        placeholder="a.nguyen@student.edu.vn"
        icon="mail-outline"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <InputField
        label="Mật khẩu"
        placeholder="Tối thiểu 6 ký tự"
        icon="lock-closed-outline"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <InputField
        label="Xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu"
        icon="shield-checkmark-outline"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity
        onPress={() => setAgreeTerms(!agreeTerms)}
        style={tw`flex-row items-center mb-6 mt-1`}
      >
        <Ionicons
          name={agreeTerms ? 'checkbox' : 'square-outline'}
          size={20}
          color={agreeTerms ? '#2563EB' : '#94A3B8'}
        />
        <Text style={tw`text-slate-600 text-xs ml-2 flex-1`}>
          Tôi đồng ý với <Text style={tw`text-blue-600 font-bold`}>Điều khoản sử dụng</Text> và Chính sách bảo mật của StudyMate
        </Text>
      </TouchableOpacity>

      <Button
        title="Đăng ký tài khoản"
        onPress={handleRegister}
        loading={loading}
        style="mb-6"
      />

      <View style={tw`flex-row justify-center pb-6`}>
        <Text style={tw`text-slate-500 text-sm`}>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
          <Text style={tw`text-blue-600 font-bold text-sm`}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
