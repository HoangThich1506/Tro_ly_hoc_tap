import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import { useApp } from '../../context/AppContext.jsx';

const CATEGORIES = ['Học tập', 'Kỷ luật', 'Ngoại ngữ', 'Thói quen', 'Khác'];

export default function AddGoalScreen() {
  const { addGoal } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [target, setTarget] = useState('100');
  const [unit, setUnit] = useState('%');
  const [deadline, setDeadline] = useState('2026-12-30');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Vui lòng nhập tên mục tiêu');
      return;
    }
    setLoading(true);
    await addGoal({
      title: title.trim(),
      category,
      target: parseFloat(target) || 100,
      current: 0,
      unit: unit.trim() || 'Lần',
      deadline,
    });
    setLoading(false);
    router.back();
  };

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header title="Tạo mục tiêu mới" subtitle="Định hướng thành công cho học kỳ" />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        <View style={tw`bg-white rounded-3xl p-5 border border-slate-100 shadow-xs mb-5`}>
          <InputField
            label="Tên mục tiêu *"
            placeholder="Ví dụ: Đạt chứng chỉ TOEIC 800"
            icon="trophy-outline"
            value={title}
            onChangeText={setTitle}
          />

          {/* Category Picker */}
          <Text style={tw`text-sm font-semibold text-slate-700 mb-2`}>Phân loại mục tiêu</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                style={tw`mr-2 px-3.5 py-2 rounded-xl border ${
                  category === cat
                    ? 'bg-violet-600 border-violet-600'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <Text
                  style={tw`text-xs font-semibold ${
                    category === cat ? 'text-white' : 'text-slate-700'
                  }`}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={tw`flex-row justify-between`}>
            <View style={tw`w-[48%]`}>
              <InputField
                label="Chỉ số mục tiêu"
                placeholder="100"
                icon="speedometer-outline"
                value={target}
                onChangeText={setTarget}
                keyboardType="numeric"
              />
            </View>
            <View style={tw`w-[48%]`}>
              <InputField
                label="Đơn vị tính"
                placeholder="Điểm, Giờ, %"
                icon="pricetag-outline"
                value={unit}
                onChangeText={setUnit}
              />
            </View>
          </View>

          <InputField
            label="Hạn hoàn thành (YYYY-MM-DD)"
            placeholder="2026-12-30"
            icon="calendar-outline"
            value={deadline}
            onChangeText={setDeadline}
          />
        </View>

        <Button
          title="Lưu mục tiêu"
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
