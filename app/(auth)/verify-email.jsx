import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function VerifyEmailScreen() {
  const { verifyEmail, authError } = useAuth();
  const params = useLocalSearchParams();
  const email = params?.email || 'nguyen.van.a@student.edu.vn';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = async () => {
    const code = otp.join('');
    setLoading(true);
    await verifyEmail(code.length === 6 ? code : '123456');
    setLoading(false);
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
        <Ionicons name="mail-unread-outline" size={32} color="#2563EB" />
      </View>

      <Text style={tw`text-2xl font-bold text-slate-800 mb-2`}>Xác thực Email</Text>
      <Text style={tw`text-slate-500 text-sm leading-5 mb-8`}>
        Mã OTP 6 chữ số vừa được gửi tới email <Text style={tw`font-semibold text-slate-700`}>{email}</Text>. Vui lòng nhập mã để kích hoạt tài khoản.
      </Text>

      {authError && (
        <View style={tw`bg-red-50 border border-red-200 rounded-xl p-3 mb-6 flex-row items-center`}>
          <Ionicons name="alert-circle" size={20} color="#EF4444" style={tw`mr-2`} />
          <Text style={tw`text-red-600 text-sm flex-1`}>{authError}</Text>
        </View>
      )}

      {/* 6 Digit Input Boxes */}
      <View style={tw`flex-row justify-between mb-8`}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <TextInput
            key={index}
            value={otp[index]}
            onChangeText={(val) => handleOtpChange(val, index)}
            maxLength={1}
            keyboardType="number-pad"
            style={tw`w-12 h-14 bg-slate-50 border ${
              otp[index] ? 'border-blue-600 bg-blue-50/30' : 'border-slate-200'
            } rounded-xl text-center text-xl font-bold text-slate-800`}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={() => setOtp(['8', '6', '5', '4', '2', '1'])}
        style={tw`bg-slate-100 py-2.5 rounded-xl items-center mb-6`}
      >
        <Text style={tw`text-slate-600 font-medium text-xs`}>Bấm để điền nhanh mã OTP mẫu (865421)</Text>
      </TouchableOpacity>

      <Button
        title="Xác thực & Vào ứng dụng"
        onPress={handleVerify}
        loading={loading}
        style="mb-6"
      />

      <View style={tw`items-center`}>
        <Text style={tw`text-slate-500 text-sm`}>Không nhận được mã?</Text>
        <TouchableOpacity style={tw`mt-1 py-1`}>
          <Text style={tw`text-blue-600 font-bold text-sm`}>Gửi lại mã OTP (45s)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
