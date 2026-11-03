import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function LoginScreen() {
  const { login, authError } = useAuth();
  const [email, setEmail] = useState('hoangthich@example.com');
  const [password, setPassword] = useState('123456');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-grow justify-center px-6 py-12 bg-white`}>
      <View style={tw`items-center mb-8`}>
        <View style={tw`w-20 h-20 rounded-2xl bg-blue-600 items-center justify-center mb-4 shadow-md`}>
          <Ionicons name="school" size={40} color="#FFFFFF" />
        </View>
        <Text style={tw`text-2xl font-bold text-slate-800`}>Chào mừng trở lại!</Text>
        <Text style={tw`text-slate-500 text-sm mt-1`}>Đăng nhập để tiếp tục quản lý việc học</Text>
      </View>

      {authError && (
        <View style={tw`bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex-row items-center`}>
          <Ionicons name="alert-circle" size={20} color="#EF4444" style={tw`mr-2`} />
          <Text style={tw`text-red-600 text-sm flex-1`}>{authError}</Text>
        </View>
      )}

      <InputField
        label="Địa chỉ Email"
        placeholder="example@student.edu.vn"
        icon="mail-outline"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <InputField
        label="Mật khẩu"
        placeholder="••••••••"
        icon="lock-closed-outline"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={tw`flex-row items-center justify-between mb-6`}>
        <TouchableOpacity
          onPress={() => setRememberMe(!rememberMe)}
          style={tw`flex-row items-center`}
        >
          <Ionicons
            name={rememberMe ? 'checkbox' : 'square-outline'}
            size={20}
            color={rememberMe ? '#2563EB' : '#94A3B8'}
          />
          <Text style={tw`text-slate-600 text-sm ml-2`}>Ghi nhớ đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
          <Text style={tw`text-blue-600 font-semibold text-sm`}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Đăng nhập"
        onPress={handleLogin}
        loading={loading}
        style="mb-4"
      />

      <View style={tw`flex-row items-center my-4`}>
        <View style={tw`flex-1 h-px bg-slate-200`} />
        <Text style={tw`mx-3 text-slate-400 text-xs`}>HOẶC</Text>
        <View style={tw`flex-1 h-px bg-slate-200`} />
      </View>

      <TouchableOpacity
        onPress={() => {
          setEmail('demo@studymate.edu.vn');
          setPassword('123456');
        }}
        style={tw`bg-slate-50 border border-slate-200 py-3 rounded-xl items-center mb-6`}
      >
        <Text style={tw`text-slate-600 font-medium text-sm`}>Tự điền tài khoản mẫu Demo</Text>
      </TouchableOpacity>

      <View style={tw`flex-row justify-center mt-2`}>
        <Text style={tw`text-slate-500 text-sm`}>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text style={tw`text-blue-600 font-bold text-sm`}>Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
