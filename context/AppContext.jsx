import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService.jsx';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [notes, setNotes] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [plans, setPlans] = useState([]);
  const [goals, setGoals] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    async function init() {
      const data = await storageService.loadAllInitialData();
      setUser(data.user);
      setSubjects(data.subjects);
      setAssignments(data.assignments);
      setSchedule(data.schedule);
      setNotes(data.notes);
      setDocuments(data.documents);
      setPlans(data.plans);
      setGoals(data.goals);
      setNotifications(data.notifications);
      setSettings(data.settings);
      setLoading(false);
    }
    init();
  }, []);

  // --- Profile Actions ---
  const updateProfile = async (updatedFields) => {
    const newUser = { ...user, ...updatedFields };
    setUser(newUser);
    await storageService.set(storageService.STORAGE_KEYS.USER, newUser);
  };

  // --- Subject Actions ---
  const addSubject = async (subjectData) => {
    const newSubject = {
      id: 'sub_' + Date.now(),
      ...subjectData,
    };
    const updated = [newSubject, ...subjects];
    setSubjects(updated);
    await storageService.set(storageService.STORAGE_KEYS.SUBJECTS, updated);
    return newSubject;
  };

  const updateSubject = async (id, updatedFields) => {
    const updated = subjects.map((sub) => (sub.id === id ? { ...sub, ...updatedFields } : sub));
    setSubjects(updated);
    await storageService.set(storageService.STORAGE_KEYS.SUBJECTS, updated);
  };

  const deleteSubject = async (id) => {
    const updated = subjects.filter((sub) => sub.id !== id);
    setSubjects(updated);
    await storageService.set(storageService.STORAGE_KEYS.SUBJECTS, updated);
  };

  // --- Assignment Actions ---
  const addAssignment = async (data) => {
    const newAssignment = {
      id: 'asg_' + Date.now(),
      status: 'pending',
      ...data,
    };
    const updated = [newAssignment, ...assignments];
    setAssignments(updated);
    await storageService.set(storageService.STORAGE_KEYS.ASSIGNMENTS, updated);
    return newAssignment;
  };

  const updateAssignment = async (id, updatedFields) => {
    const updated = assignments.map((asg) => (asg.id === id ? { ...asg, ...updatedFields } : asg));
    setAssignments(updated);
    await storageService.set(storageService.STORAGE_KEYS.ASSIGNMENTS, updated);
  };

  const toggleAssignmentStatus = async (id) => {
    const updated = assignments.map((asg) => {
      if (asg.id === id) {
        const nextStatus = asg.status === 'completed' ? 'in_progress' : 'completed';
        return { ...asg, status: nextStatus };
      }
      return asg;
    });
    setAssignments(updated);
    await storageService.set(storageService.STORAGE_KEYS.ASSIGNMENTS, updated);
  };

  const deleteAssignment = async (id) => {
    const updated = assignments.filter((asg) => asg.id !== id);
    setAssignments(updated);
    await storageService.set(storageService.STORAGE_KEYS.ASSIGNMENTS, updated);
  };

  // --- Note Actions ---
  const addNote = async (data) => {
    const newNote = {
      id: 'note_' + Date.now(),
      updatedAt: new Date().toISOString().split('T')[0],
      isPinned: false,
      color: '#DBEAFE',
      ...data,
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    await storageService.set(storageService.STORAGE_KEYS.NOTES, updated);
    return newNote;
  };

  const updateNote = async (id, updatedFields) => {
    const updated = notes.map((note) =>
      note.id === id ? { ...note, ...updatedFields, updatedAt: new Date().toISOString().split('T')[0] } : note
    );
    setNotes(updated);
    await storageService.set(storageService.STORAGE_KEYS.NOTES, updated);
  };

  const togglePinNote = async (id) => {
    const updated = notes.map((note) =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    );
    setNotes(updated);
    await storageService.set(storageService.STORAGE_KEYS.NOTES, updated);
  };

  const deleteNote = async (id) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    await storageService.set(storageService.STORAGE_KEYS.NOTES, updated);
  };

  // --- Document Actions ---
  const addDocument = async (data) => {
    const newDoc = {
      id: 'doc_' + Date.now(),
      uploadedAt: new Date().toISOString().split('T')[0],
      size: '2.5 MB',
      ...data,
    };
    const updated = [newDoc, ...documents];
    setDocuments(updated);
    await storageService.set(storageService.STORAGE_KEYS.DOCUMENTS, updated);
    return newDoc;
  };

  const deleteDocument = async (id) => {
    const updated = documents.filter((d) => d.id !== id);
    setDocuments(updated);
    await storageService.set(storageService.STORAGE_KEYS.DOCUMENTS, updated);
  };

  // --- Study Plan Actions ---
  const addPlan = async (data) => {
    const newPlan = {
      id: 'plan_' + Date.now(),
      progress: 0,
      tasks: [],
      ...data,
    };
    const updated = [newPlan, ...plans];
    setPlans(updated);
    await storageService.set(storageService.STORAGE_KEYS.PLANS, updated);
    return newPlan;
  };

  const updatePlan = async (id, updatedFields) => {
    const updated = plans.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setPlans(updated);
    await storageService.set(storageService.STORAGE_KEYS.PLANS, updated);
  };

  const togglePlanTask = async (planId, taskId) => {
    const updated = plans.map((plan) => {
      if (plan.id === planId) {
        const nextTasks = plan.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
        const completedCount = nextTasks.filter((t) => t.completed).length;
        const progress = nextTasks.length > 0 ? Math.round((completedCount / nextTasks.length) * 100) : 0;
        return { ...plan, tasks: nextTasks, progress };
      }
      return plan;
    });
    setPlans(updated);
    await storageService.set(storageService.STORAGE_KEYS.PLANS, updated);
  };

  const deletePlan = async (id) => {
    const updated = plans.filter((p) => p.id !== id);
    setPlans(updated);
    await storageService.set(storageService.STORAGE_KEYS.PLANS, updated);
  };

  // --- Goal Actions ---
  const addGoal = async (data) => {
    const newGoal = {
      id: 'goal_' + Date.now(),
      current: 0,
      ...data,
    };
    const updated = [newGoal, ...goals];
    setGoals(updated);
    await storageService.set(storageService.STORAGE_KEYS.GOALS, updated);
    return newGoal;
  };

  const updateGoal = async (id, updatedFields) => {
    const updated = goals.map((g) => (g.id === id ? { ...g, ...updatedFields } : g));
    setGoals(updated);
    await storageService.set(storageService.STORAGE_KEYS.GOALS, updated);
  };

  const deleteGoal = async (id) => {
    const updated = goals.filter((g) => g.id !== id);
    setGoals(updated);
    await storageService.set(storageService.STORAGE_KEYS.GOALS, updated);
  };

  // --- Notification Actions ---
  const markNotificationAsRead = async (id) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    setNotifications(updated);
    await storageService.set(storageService.STORAGE_KEYS.NOTIFICATIONS, updated);
  };

  const clearAllNotifications = async () => {
    const updated = [];
    setNotifications(updated);
    await storageService.set(storageService.STORAGE_KEYS.NOTIFICATIONS, updated);
  };

  // --- Settings Actions ---
  const updateSettings = async (updatedFields) => {
    const newSettings = { ...settings, ...updatedFields };
    setSettings(newSettings);
    await storageService.set(storageService.STORAGE_KEYS.SETTINGS, newSettings);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        user,
        updateProfile,
        subjects,
        addSubject,
        updateSubject,
        deleteSubject,
        assignments,
        addAssignment,
        updateAssignment,
        toggleAssignmentStatus,
        deleteAssignment,
        schedule,
        notes,
        addNote,
        updateNote,
        togglePinNote,
        deleteNote,
        documents,
        addDocument,
        deleteDocument,
        plans,
        addPlan,
        updatePlan,
        togglePlanTask,
        deletePlan,
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        settings,
        updateSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
