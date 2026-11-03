import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ForgotPasswordScreen() {
  const { forgotPassword, authError } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const success = await forgotPassword(email);
    setLoading(false);
    if (success) {
      setIsSubmitted(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-grow px-6 py-10 bg-white`}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={tw`w-10 h-10 rounded-full bg-slate-100 items-center justify-center mb-6`}
      >
        <Ionicons name="arrow-back" size={20} color="#1E293B" />
      </TouchableOpacity>

      <View style={tw`w-16 h-16 rounded-2xl bg-blue-100 items-center justify-center mb-6`}>
        <Ionicons name="key-outline" size={32} color="#2563EB" />
      </View>

      <Text style={tw`text-2xl font-bold text-slate-800 mb-2`}>Khôi phục mật khẩu</Text>
      <Text style={tw`text-slate-500 text-sm leading-5 mb-6`}>
        Nhập địa chỉ email đăng ký tài khoản của bạn. Chúng tôi sẽ gửi hướng dẫn và mã đặt lại mật khẩu.
      </Text>

      {authError && (
        <View style={tw`bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex-row items-center`}>
          <Ionicons name="alert-circle" size={20} color="#EF4444" style={tw`mr-2`} />
          <Text style={tw`text-red-600 text-sm flex-1`}>{authError}</Text>
        </View>
      )}

      {isSubmitted ? (
        <View style={tw`bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-8 items-center`}>
          <Ionicons name="checkmark-circle" size={48} color="#10B981" style={tw`mb-2`} />
          <Text style={tw`text-emerald-800 font-bold text-base mb-1`}>Đã gửi email khôi phục!</Text>
          <Text style={tw`text-emerald-700 text-sm text-center`}>
            Vui lòng kiểm tra hộp thư đến của <Text style={tw`font-semibold`}>{email}</Text> để lấy đường dẫn tạo mật khẩu mới.
          </Text>
        </View>
      ) : (
        <>
          <InputField
            label="Địa chỉ Email"
            placeholder="nhap-email@student.edu.vn"
            icon="mail-outline"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Button
            title="Gửi mã xác nhận"
            onPress={handleSubmit}
            loading={loading}
            style="mt-2 mb-6"
          />
        </>
      )}

      <TouchableOpacity
        onPress={() => router.replace('/(auth)/login')}
        style={tw`items-center py-2`}
      >
        <Text style={tw`text-slate-600 font-semibold text-sm`}>
          Quay lại màn hình <Text style={tw`text-blue-600`}>Đăng nhập</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
