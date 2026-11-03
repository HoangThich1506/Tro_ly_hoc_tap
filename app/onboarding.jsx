import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const SLIDES = [
  {
    id: 1,
    icon: 'calendar',
    color: 'bg-blue-500',
    title: 'Quản lý Thời khóa biểu',
    desc: 'Theo dõi lịch học theo ngày, theo tuần và theo tháng một cách trực quan, không bao giờ bỏ lỡ buổi học nào.',
  },
  {
    id: 2,
    icon: 'checkbox',
    color: 'bg-emerald-500',
    title: 'Kiểm soát Deadline & Bài tập',
    desc: 'Lên danh sách bài tập, phân loại theo độ ưu tiên, nhận thông báo nhắc nhở nộp bài đúng hạn.',
  },
  {
    id: 3,
    icon: 'trending-up',
    color: 'bg-violet-500',
    title: 'Mục tiêu & Thống kê tiến độ',
    desc: 'Lập kế hoạch ôn thi, theo dõi chỉ số GPA và biểu đồ học tập chi tiết để bứt phá kết quả học tập.',
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace('/(auth)/login');
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <View style={tw`flex-1 bg-white justify-between px-6 py-12`}>
      {/* Top Bar with Skip */}
      <View style={tw`flex-row justify-end pt-4`}>
        <TouchableOpacity
          onPress={() => router.replace('/(auth)/login')}
          style={tw`px-3 py-1.5 rounded-full bg-slate-100`}
        >
          <Text style={tw`text-slate-600 font-semibold text-xs`}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>

      {/* Main Slide Content */}
      <View style={tw`items-center my-auto px-4`}>
        <View style={tw`w-36 h-36 rounded-full ${slide.color} items-center justify-center mb-8 shadow-lg`}>
          <Ionicons name={slide.icon} size={64} color="#FFFFFF" />
        </View>
        <Text style={tw`text-2xl font-bold text-slate-800 text-center mb-3`}>
          {slide.title}
        </Text>
        <Text style={tw`text-slate-500 text-center text-base leading-6 px-2`}>
          {slide.desc}
        </Text>
      </View>

      {/* Bottom Controls */}
      <View>
        {/* Indicators */}
        <View style={tw`flex-row justify-center mb-8`}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={tw`h-2.5 rounded-full mx-1 ${
                currentSlide === index ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-200'
              }`}
            />
          ))}
        </View>

        {/* Buttons */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleNext}
          style={tw`w-full bg-blue-600 py-4 rounded-2xl items-center shadow-md mb-3`}
        >
          <Text style={tw`text-white font-bold text-base`}>
            {currentSlide === SLIDES.length - 1 ? 'Khám phá ngay' : 'Tiếp tục'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace('/(auth)/login')}
          style={tw`py-2 items-center`}
        >
          <Text style={tw`text-slate-500 font-medium text-sm`}>
            Đã có tài khoản? <Text style={tw`text-blue-600 font-bold`}>Đăng nhập</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
