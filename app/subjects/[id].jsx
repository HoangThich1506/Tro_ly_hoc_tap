import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Header from '../../components/common/Header.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function SubjectDetailScreen() {
  const { id } = useLocalSearchParams();
  const { subjects, assignments, documents, deleteSubject } = useApp();

  const subject = subjects.find((s) => s.id === id);

  if (!subject) {
    return (
      <View style={tw`flex-1 bg-slate-50 items-center justify-center p-6`}>
        <Ionicons name="alert-circle-outline" size={48} color="#EF4444" style={tw`mb-2`} />
        <Text style={tw`text-lg font-bold text-slate-800`}>Không tìm thấy môn học</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`mt-4 bg-blue-600 px-5 py-2.5 rounded-xl`}
        >
          <Text style={tw`text-white font-bold`}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const subjectAssignments = assignments.filter((a) => a.subjectId === subject.id);
  const subjectDocs = documents.filter((d) => d.subjectId === subject.id);

  const handleDelete = () => {
    deleteSubject(subject.id);
    router.back();
  };

  return (
    <View style={tw`flex-1 bg-slate-50`}>
      <Header
        title={subject.name}
        subtitle={subject.code}
        rightIcon="create-outline"
        onRightPress={() => router.push(`/subjects/edit/${subject.id}`)}
      />

      <ScrollView contentContainerStyle={tw`p-5 pb-12`}>
        {/* Main Subject Info Card */}
        <View style={tw`bg-white rounded-3xl p-5 border border-slate-100 shadow-xs mb-5`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <View style={tw`px-3 py-1 rounded-full bg-blue-50`}>
              <Text style={tw`text-blue-600 font-bold text-xs`}>{subject.code}</Text>
            </View>
            <Text style={tw`text-slate-500 font-semibold text-xs`}>
              {subject.credits} Tín chỉ
            </Text>
          </View>

          <Text style={tw`text-xl font-bold text-slate-800 mb-2`}>{subject.name}</Text>
          <Text style={tw`text-slate-500 text-sm mb-4 leading-5`}>
            {subject.description || 'Chưa có mô tả cho môn học này.'}
          </Text>

          <View style={tw`bg-slate-50 rounded-2xl p-4`}>
            <View style={tw`flex-row items-center mb-2.5`}>
              <Ionicons name="person-outline" size={16} color="#64748B" style={tw`mr-3`} />
              <Text style={tw`text-xs text-slate-500 w-24`}>Giảng viên:</Text>
              <Text style={tw`text-xs font-semibold text-slate-800 flex-1`}>{subject.teacher}</Text>
            </View>
            <View style={tw`flex-row items-center mb-2.5`}>
              <Ionicons name="location-outline" size={16} color="#64748B" style={tw`mr-3`} />
              <Text style={tw`text-xs text-slate-500 w-24`}>Phòng học:</Text>
              <Text style={tw`text-xs font-semibold text-slate-800 flex-1`}>{subject.room}</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="calendar-outline" size={16} color="#64748B" style={tw`mr-3`} />
              <Text style={tw`text-xs text-slate-500 w-24`}>Học kỳ:</Text>
              <Text style={tw`text-xs font-semibold text-slate-800 flex-1`}>{subject.semester}</Text>
            </View>
          </View>
        </View>

        {/* Assignments of this Subject */}
        <View style={tw`mb-5`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-base font-bold text-slate-800`}>
              Bài tập của môn ({subjectAssignments.length})
            </Text>
            <TouchableOpacity onPress={() => router.push('/assignments/add')}>
              <Text style={tw`text-blue-600 text-xs font-semibold`}>+ Thêm bài tập</Text>
            </TouchableOpacity>
          </View>

          {subjectAssignments.length === 0 ? (
            <View style={tw`bg-white rounded-2xl p-5 items-center border border-slate-100`}>
              <Text style={tw`text-xs text-slate-400`}>Chưa có bài tập nào cho môn này</Text>
            </View>
          ) : (
            subjectAssignments.map((asg) => (
              <TouchableOpacity
                key={asg.id}
                onPress={() => router.push(`/assignments/${asg.id}`)}
                style={tw`bg-white rounded-2xl p-4 mb-2.5 border border-slate-100 shadow-xs flex-row justify-between items-center`}
              >
                <View style={tw`flex-1 mr-2`}>
                  <Text style={tw`text-sm font-bold text-slate-800 mb-1`}>{asg.title}</Text>
                  <Text style={tw`text-xs text-red-500 font-semibold`}>Hạn: {asg.dueDate}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Documents of this Subject */}
        <View style={tw`mb-6`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-base font-bold text-slate-800`}>
              Tài liệu học tập ({subjectDocs.length})
            </Text>
            <TouchableOpacity onPress={() => router.push('/documents/add')}>
              <Text style={tw`text-blue-600 text-xs font-semibold`}>+ Thêm tài liệu</Text>
            </TouchableOpacity>
          </View>

          {subjectDocs.length === 0 ? (
            <View style={tw`bg-white rounded-2xl p-5 items-center border border-slate-100`}>
              <Text style={tw`text-xs text-slate-400`}>Chưa có tài liệu đính kèm</Text>
            </View>
          ) : (
            subjectDocs.map((doc) => (
              <View
                key={doc.id}
                style={tw`bg-white rounded-2xl p-3.5 mb-2.5 border border-slate-100 shadow-xs flex-row items-center justify-between`}
              >
                <View style={tw`flex-row items-center flex-1 mr-2`}>
                  <View style={tw`w-10 h-10 rounded-xl bg-red-50 items-center justify-center mr-3`}>
                    <Ionicons name="document-text" size={20} color="#DC2626" />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-xs font-bold text-slate-800`} numberOfLines={1}>
                      {doc.title}
                    </Text>
                    <Text style={tw`text-10px text-slate-400`}>{doc.size}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => alert(`Đang mở tài liệu: ${doc.title}`)}
                  style={tw`px-3 py-1.5 rounded-lg bg-blue-50`}
                >
                  <Text style={tw`text-blue-600 text-xs font-semibold`}>Mở</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* Delete Subject Button */}
        <TouchableOpacity
          onPress={handleDelete}
          style={tw`bg-red-50 border border-red-200 py-3.5 rounded-2xl items-center flex-row justify-center`}
        >
          <Ionicons name="trash-outline" size={18} color="#DC2626" style={tw`mr-2`} />
          <Text style={tw`text-red-600 font-bold text-sm`}>Xóa môn học này</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
