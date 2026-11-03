import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ChangePasswordScreen() {
  const { changePassword, authError } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const success = await changePassword(currentPassword, newPassword, confirmPassword);
    setLoading(false);
    if (success) {
      setIsSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        router.back();
      }, 1500);
    }
  };

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header title="Đổi mật khẩu" subtitle="Tăng cường bảo mật tài khoản" />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        <View style={tw`bg-white rounded-3xl p-5 border border-slate-100 shadow-xs mb-5`}>
          {authError && (
            <View style={tw`bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex-row items-center`}>
              <Ionicons name="alert-circle" size={20} color="#EF4444" style={tw`mr-2`} />
              <Text style={tw`text-red-600 text-sm flex-1`}>{authError}</Text>
            </View>
          )}

          {isSuccess && (
            <View style={tw`bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4 flex-row items-center`}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" style={tw`mr-2`} />
              <Text style={tw`text-emerald-700 text-sm font-semibold flex-1`}>
                Đổi mật khẩu thành công! Đang quay lại...
              </Text>
            </View>
          )}

          <InputField
            label="Mật khẩu hiện tại *"
            placeholder="••••••••"
            icon="lock-closed-outline"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
          />

          <InputField
            label="Mật khẩu mới *"
            placeholder="Tối thiểu 6 ký tự"
            icon="key-outline"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          <InputField
            label="Xác nhận mật khẩu mới *"
            placeholder="Nhập lại mật khẩu mới"
            icon="shield-checkmark-outline"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <Button
          title="Cập nhật mật khẩu"
          onPress={handleSubmit}
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
