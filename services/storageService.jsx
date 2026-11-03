import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER: '@studymate_user',
  SUBJECTS: '@studymate_subjects',
  ASSIGNMENTS: '@studymate_assignments',
  SCHEDULE: '@studymate_schedule',
  NOTES: '@studymate_notes',
  DOCUMENTS: '@studymate_documents',
  PLANS: '@studymate_plans',
  GOALS: '@studymate_goals',
  NOTIFICATIONS: '@studymate_notifications',
  SETTINGS: '@studymate_settings',
};

const DEFAULT_USER = {
  id: 'u1',
  name: 'Nguyễn Hoàng Thích',
  email: 'hoangthich@example.com',
  studentId: '20210001',
  university: 'Đại học Bách Khoa',
  faculty: 'Công nghệ Thông tin',
  major: 'Kỹ thuật Phần mềm',
  academicYear: '2022 - 2026',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  gpa: 3.65,
  completedCredits: 82,
  totalCredits: 135,
};

const DEFAULT_SUBJECTS = [
  {
    id: 'sub_1',
    name: 'Lập trình Thiết bị Di động',
    code: 'IT3080',
    credits: 3,
    teacher: 'TS. Trần Văn B',
    room: 'Phòng B1-302',
    color: '#3B82F6', // Blue
    semester: 'Học kỳ 2 - 2025-2026',
    description: 'Xây dựng ứng dụng di động đa nền tảng với React Native & Expo.',
  },
  {
    id: 'sub_2',
    name: 'Cấu trúc Dữ liệu & Giải thuật',
    code: 'IT2010',
    credits: 4,
    teacher: 'PGS. TS. Lê Thị H',
    room: 'Phòng D9-401',
    color: '#10B981', // Green
    semester: 'Học kỳ 2 - 2025-2026',
    description: 'Nghiên cứu cấu trúc cây, đồ thị và các giải thuật tối ưu hóa.',
  },
  {
    id: 'sub_3',
    name: 'Cơ sở Dữ liệu Nâng cao',
    code: 'IT3100',
    credits: 3,
    teacher: 'ThS. Nguyễn Đức M',
    room: 'Phòng TC-205',
    color: '#F59E0B', // Amber
    semester: 'Học kỳ 2 - 2025-2026',
    description: 'Tối ưu hóa câu truy vấn, NoSQL, phân mảnh và phục hồi dữ liệu.',
  },
  {
    id: 'sub_4',
    name: 'Trí tuệ Nhân tạo',
    code: 'IT4020',
    credits: 3,
    teacher: 'TS. Phạm Minh K',
    room: 'Phòng B1-201',
    color: '#8B5CF6', // Purple
    semester: 'Học kỳ 2 - 2025-2026',
    description: 'Học máy, mạng nơ-ron và các thuật toán tìm kiếm heuristic.',
  },
  {
    id: 'sub_5',
    name: 'Tiếng Anh Chuyên ngành CNTT',
    code: 'FL2040',
    credits: 2,
    teacher: 'Cô Emma Watson',
    room: 'Phòng D3-102',
    color: '#EC4899', // Pink
    semester: 'Học kỳ 2 - 2025-2026',
    description: 'Kỹ năng đọc hiểu tài liệu kỹ thuật và thuyết trình công nghệ.',
  },
];

const DEFAULT_ASSIGNMENTS = [
  {
    id: 'asg_1',
    title: 'Xây dựng ứng dụng StudyMate 36 màn hình',
    subjectId: 'sub_1',
    subjectName: 'Lập trình Thiết bị Di động',
    dueDate: '2026-11-05',
    priority: 'high',
    status: 'in_progress',
    description: 'Hoàn thiện giao diện Tailwind, tích hợp điều hướng Expo Router và lưu trữ.',
  },
  {
    id: 'asg_2',
    title: 'Bài tập Lớn: Cây AVL và B-Tree',
    subjectId: 'sub_2',
    subjectName: 'Cấu trúc Dữ liệu & Giải thuật',
    dueDate: '2026-11-08',
    priority: 'medium',
    status: 'pending',
    description: 'Cài đặt thao tác chèn, xóa và cân bằng trên cây AVL bằng C++.',
  },
  {
    id: 'asg_3',
    title: 'Thực hành Truy vấn MongoDB Aggregation',
    subjectId: 'sub_3',
    subjectName: 'Cơ sở Dữ liệu Nâng cao',
    dueDate: '2026-11-12',
    priority: 'low',
    status: 'pending',
    description: 'Viết pipeline thống kê doanh số theo tháng và khách hàng.',
  },
  {
    id: 'asg_4',
    title: 'Đồ án Nhóm: Nhận diện khuôn mặt với CNN',
    subjectId: 'sub_4',
    subjectName: 'Trí tuệ Nhân tạo',
    dueDate: '2026-11-20',
    priority: 'high',
    status: 'pending',
    description: 'Huấn luyện mô hình CNN đạt độ chính xác trên 90% trên tập dữ liệu kiểm thử.',
  },
  {
    id: 'asg_5',
    title: 'Bài dịch tài liệu React Native Architecture',
    subjectId: 'sub_5',
    subjectName: 'Tiếng Anh Chuyên ngành CNTT',
    dueDate: '2026-10-30',
    priority: 'medium',
    status: 'completed',
    description: 'Dịch và tóm tắt bài viết về Fabric Renderer và TurboModules.',
  },
];

const DEFAULT_SCHEDULE = [
  {
    id: 'sch_1',
    subjectId: 'sub_1',
    subjectName: 'Lập trình Thiết bị Di động',
    room: 'Phòng B1-302',
    teacher: 'TS. Trần Văn B',
    color: '#3B82F6',
    dayOfWeek: 2, // Thứ 2
    startTime: '07:30',
    endTime: '10:00',
    note: 'Thực hành React Native Expo trên máy tính cá nhân',
  },
  {
    id: 'sch_2',
    subjectId: 'sub_2',
    subjectName: 'Cấu trúc Dữ liệu & Giải thuật',
    room: 'Phòng D9-401',
    teacher: 'PGS. TS. Lê Thị H',
    color: '#10B981',
    dayOfWeek: 2, // Thứ 2
    startTime: '10:15',
    endTime: '11:45',
    note: 'Lý thuyết thuật toán đồ thị Dijkstra',
  },
  {
    id: 'sch_3',
    subjectId: 'sub_3',
    subjectName: 'Cơ sở Dữ liệu Nâng cao',
    room: 'Phòng TC-205',
    teacher: 'ThS. Nguyễn Đức M',
    color: '#F59E0B',
    dayOfWeek: 3, // Thứ 3
    startTime: '13:00',
    endTime: '15:30',
    note: 'Kiểm tra trắc nghiệm 15 phút đầu giờ',
  },
  {
    id: 'sch_4',
    subjectId: 'sub_4',
    subjectName: 'Trí tuệ Nhân tạo',
    room: 'Phòng B1-201',
    teacher: 'TS. Phạm Minh K',
    color: '#8B5CF6',
    dayOfWeek: 4, // Thứ 4
    startTime: '08:00',
    endTime: '11:00',
    note: 'Báo cáo tiến độ đồ án giữa kỳ',
  },
  {
    id: 'sch_5',
    subjectId: 'sub_5',
    subjectName: 'Tiếng Anh Chuyên ngành CNTT',
    room: 'Phòng D3-102',
    teacher: 'Cô Emma Watson',
    color: '#EC4899',
    dayOfWeek: 5, // Thứ 5
    startTime: '09:00',
    endTime: '11:30',
    note: 'Thuyết trình nhóm chủ đề Cloud Computing',
  },
  {
    id: 'sch_6',
    subjectId: 'sub_1',
    subjectName: 'Lập trình Thiết bị Di động (Thực hành)',
    room: 'Lab CNTT 4',
    teacher: 'TS. Trần Văn B',
    color: '#3B82F6',
    dayOfWeek: 6, // Thứ 6
    startTime: '14:00',
    endTime: '17:00',
    note: 'Nộp source code bài tập tuần 8',
  },
];

const DEFAULT_NOTES = [
  {
    id: 'note_1',
    title: 'Kiến trúc Expo Router & Tailwind trong React Native',
    content: 'Expo Router dựa trên cấu trúc file trong thư mục app. Mọi file .jsx là một màn hình. Sử dụng twrnc để viết class Tailwind tiện lợi và mượt mà.',
    subjectId: 'sub_1',
    subjectName: 'Lập trình Thiết bị Di động',
    color: '#DBEAFE',
    isPinned: true,
    updatedAt: '2026-11-01',
  },
  {
    id: 'note_2',
    title: 'Ghi chú ôn thi Giải thuật đồ thị',
    content: 'Nhớ các thuật toán: BFS tìm đường ngắn nhất đồ thị không trọng số, Dijkstra đồ thị trọng số dương, Bellman-Ford xử lý trọng số âm.',
    subjectId: 'sub_2',
    subjectName: 'Cấu trúc Dữ liệu & Giải thuật',
    color: '#D1FAE5',
    isPinned: true,
    updatedAt: '2026-10-29',
  },
  {
    id: 'note_3',
    title: 'Indexing & Sharding trong MongoDB',
    content: 'Tạo compound index cần chú ý thứ tự: Equality, Sort, Range (Quy tắc ESR).',
    subjectId: 'sub_3',
    subjectName: 'Cơ sở Dữ liệu Nâng cao',
    color: '#FEF3C7',
    isPinned: false,
    updatedAt: '2026-10-25',
  },
];

const DEFAULT_DOCUMENTS = [
  {
    id: 'doc_1',
    title: 'Slide Bài giảng React Native & Navigation.pdf',
    subjectId: 'sub_1',
    subjectName: 'Lập trình Thiết bị Di động',
    type: 'pdf',
    size: '4.8 MB',
    url: 'https://example.com/slide1.pdf',
    uploadedAt: '2026-10-20',
  },
  {
    id: 'doc_2',
    title: 'Giáo trình Cấu trúc dữ liệu và giải thuật (ĐHBK).pdf',
    subjectId: 'sub_2',
    subjectName: 'Cấu trúc Dữ liệu & Giải thuật',
    type: 'pdf',
    size: '12.5 MB',
    url: 'https://example.com/dsa.pdf',
    uploadedAt: '2026-09-15',
  },
  {
    id: 'doc_3',
    title: 'Đề thi mẫu Cơ sở dữ liệu nâng cao 2025.docx',
    subjectId: 'sub_3',
    subjectName: 'Cơ sở Dữ liệu Nâng cao',
    type: 'doc',
    size: '1.2 MB',
    url: 'https://example.com/exam.docx',
    uploadedAt: '2026-10-18',
  },
  {
    id: 'doc_4',
    title: 'Mạng Neural Tích chập CNN - Lý thuyết và Thực nghiệm.pptx',
    subjectId: 'sub_4',
    subjectName: 'Trí tuệ Nhân tạo',
    type: 'slide',
    size: '8.4 MB',
    url: 'https://example.com/cnn.pptx',
    uploadedAt: '2026-10-28',
  },
];

const DEFAULT_PLANS = [
  {
    id: 'plan_1',
    title: 'Kế hoạch ôn thi Giữa kỳ Học kỳ 2',
    goal: 'Đạt điểm A tất cả 5 môn học trong kỳ',
    startDate: '2026-11-01',
    endDate: '2026-11-25',
    progress: 40,
    tasks: [
      { id: 'pt_1', title: 'Luyện 5 đề thi mẫu môn Cấu trúc dữ liệu', completed: true },
      { id: 'pt_2', title: 'Hoàn thành bài tập lớn Thiết bị di động', completed: true },
      { id: 'pt_3', title: 'Ôn tập lý thuyết NoSQL & Tối ưu hóa truy vấn', completed: false },
      { id: 'pt_4', title: 'Huấn luyện xong mô hình AI nhận diện ảnh', completed: false },
      { id: 'pt_5', title: 'Thực hành 3 bài thuyết trình tiếng Anh', completed: false },
    ],
  },
  {
    id: 'plan_2',
    title: 'Kế hoạch tự học Lập trình Flutter & iOS Native',
    goal: 'Mở rộng kỹ năng lập trình mobile toàn diện',
    startDate: '2026-12-01',
    endDate: '2027-01-15',
    progress: 15,
    tasks: [
      { id: 'pt_6', title: 'Học cú pháp Dart nâng cao', completed: true },
      { id: 'pt_7', title: 'Xây dựng 1 app Flutter nhỏ kết nối Firebase', completed: false },
      { id: 'pt_8', title: 'Tìm hiểu Swift và SwiftUI trên Xcode', completed: false },
    ],
  },
];

const DEFAULT_GOALS = [
  {
    id: 'goal_1',
    title: 'Đạt điểm GPA học kỳ 3.8/4.0',
    target: 3.8,
    current: 3.65,
    unit: 'Điểm',
    category: 'Học tập',
    deadline: '2026-12-30',
  },
  {
    id: 'goal_2',
    title: 'Tự học 25 giờ mỗi tuần',
    target: 25,
    current: 18,
    unit: 'Giờ/tuần',
    category: 'Kỷ luật',
    deadline: '2026-11-30',
  },
  {
    id: 'goal_3',
    title: 'Đạt chứng chỉ IELTS 7.5',
    target: 7.5,
    current: 6.5,
    unit: 'Band',
    category: 'Ngoại ngữ',
    deadline: '2027-03-30',
  },
  {
    id: 'goal_4',
    title: 'Hoàn thành 100% bài tập trước deadline 24h',
    target: 100,
    current: 85,
    unit: '%',
    category: 'Thói quen',
    deadline: '2026-12-15',
  },
];

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif_1',
    title: 'Nhắc nhở nộp bài tập',
    message: 'Bài tập "Xây dựng ứng dụng StudyMate 36 màn hình" có hạn nộp vào ngày 05/11/2026.',
    time: '15 phút trước',
    isRead: false,
    type: 'deadline',
  },
  {
    id: 'notif_2',
    title: 'Lịch học sắp tới',
    message: 'Tiết học "Lập trình Thiết bị Di động" bắt đầu lúc 07:30 tại Phòng B1-302.',
    time: '2 giờ trước',
    isRead: false,
    type: 'schedule',
  },
  {
    id: 'notif_3',
    title: 'Tài liệu mới',
    message: 'Giảng viên vừa tải lên tài liệu mới cho môn Trí tuệ Nhân tạo.',
    time: '1 ngày trước',
    isRead: true,
    type: 'document',
  },
  {
    id: 'notif_4',
    title: 'Hoàn thành mục tiêu tuần',
    message: 'Chúc mừng bạn đã hoàn thành 85% mục tiêu bài tập trong tuần qua!',
    time: '2 ngày trước',
    isRead: true,
    type: 'achievement',
  },
];

const DEFAULT_SETTINGS = {
  darkMode: false,
  pushNotifications: true,
  studyReminder: true,
  reminderTimeBeforeClass: 30, // phút
  language: 'vi',
  autoSync: true,
};

export const storageService = {
  async getOrInit(key, defaultValue) {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
      await AsyncStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },

  async set(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // ignore
    }
  },

  async loadAllInitialData() {
    const user = await this.getOrInit(STORAGE_KEYS.USER, DEFAULT_USER);
    const subjects = await this.getOrInit(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
    const assignments = await this.getOrInit(STORAGE_KEYS.ASSIGNMENTS, DEFAULT_ASSIGNMENTS);
    const schedule = await this.getOrInit(STORAGE_KEYS.SCHEDULE, DEFAULT_SCHEDULE);
    const notes = await this.getOrInit(STORAGE_KEYS.NOTES, DEFAULT_NOTES);
    const documents = await this.getOrInit(STORAGE_KEYS.DOCUMENTS, DEFAULT_DOCUMENTS);
    const plans = await this.getOrInit(STORAGE_KEYS.PLANS, DEFAULT_PLANS);
    const goals = await this.getOrInit(STORAGE_KEYS.GOALS, DEFAULT_GOALS);
    const notifications = await this.getOrInit(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS);
    const settings = await this.getOrInit(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);

    return {
      user,
      subjects,
      assignments,
      schedule,
      notes,
      documents,
      plans,
      goals,
      notifications,
      settings,
    };
  },

  STORAGE_KEYS,
};
