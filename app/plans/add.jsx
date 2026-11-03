import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import InputField from '../../components/common/InputField.jsx';
import Button from '../../components/common/Button.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function AddPlanScreen() {
  const { addPlan } = useApp();
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState('2026-11-05');
  const [endDate, setEndDate] = useState('2026-11-30');
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Đọc tài liệu chương 1 & 2', completed: false },
    { id: 't2', title: 'Làm bài tập ôn luyện cuối chương', completed: false },
  ]);
  const [loading, setLoading] = useState(false);

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    setTasks([...tasks, { id: 't_' + Date.now(), title: taskInput.trim(), completed: false }]);
    setTaskInput('');
  };

  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Vui lòng nhập tên kế hoạch');
      return;
    }
    setLoading(true);
    await addPlan({
      title: title.trim(),
      goal: goal.trim() || 'Hoàn thành các mục tiêu đề ra',
      startDate,
      endDate,
      tasks,
      progress: 0,
    });
    setLoading(false);
    router.back();
  };

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header title="Tạo kế hoạch học tập" subtitle="Thiết lập lộ trình rèn luyện" />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        <View style={tw`bg-white rounded-3xl p-5 border border-slate-100 shadow-xs mb-5`}>
          <InputField
            label="Tên kế hoạch *"
            placeholder="Ví dụ: Ôn tập nước rút môn Di động"
            icon="flag-outline"
            value={title}
            onChangeText={setTitle}
          />

          <InputField
            label="Mục tiêu cốt lõi"
            placeholder="Ví dụ: Đạt điểm A trong kỳ thi cuối kỳ"
            icon="trophy-outline"
            value={goal}
            onChangeText={setGoal}
          />

          <View style={tw`flex-row justify-between`}>
            <View style={tw`w-[48%]`}>
              <InputField
                label="Ngày bắt đầu"
                placeholder="2026-11-05"
                icon="calendar-outline"
                value={startDate}
                onChangeText={setStartDate}
              />
            </View>
            <View style={tw`w-[48%]`}>
              <InputField
                label="Ngày kết thúc"
                placeholder="2026-11-30"
                icon="calendar-outline"
                value={endDate}
                onChangeText={setEndDate}
              />
            </View>
          </View>

          {/* Add Tasks to Plan */}
          <Text style={tw`text-sm font-semibold text-slate-700 mb-2 mt-1`}>
            Các đầu việc cụ thể ({tasks.length})
          </Text>

          {tasks.map((item, index) => (
            <View
              key={item.id}
              style={tw`flex-row items-center justify-between bg-slate-50 rounded-xl px-3 py-2.5 mb-2`}
            >
              <Text style={tw`text-xs font-semibold text-slate-700 flex-1 mr-2`}>
                {index + 1}. {item.title}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
                <Ionicons name="trash-outline" size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}

          <View style={tw`flex-row items-center mt-2`}>
            <View style={tw`flex-1 mr-2`}>
              <InputField
                placeholder="Thêm đầu việc mới..."
                value={taskInput}
                onChangeText={setTaskInput}
                style="mb-0"
              />
            </View>
            <TouchableOpacity
              onPress={handleAddTask}
              style={tw`bg-blue-600 px-4 py-3.5 rounded-xl`}
            >
              <Ionicons name="add" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title="Lưu kế hoạch"
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
