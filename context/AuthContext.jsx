import React, { createContext, useContext, useState } from 'react';
import { router } from 'expo-router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authError, setAuthError] = useState(null);

  const login = async (email, password) => {
    setAuthError(null);
    if (!email || !password) {
      setAuthError('Vui lòng điền đầy đủ Email và Mật khẩu.');
      return false;
    }
    setIsAuthenticated(true);
    router.replace('/home');
    return true;
  };

  const register = async (name, email, password, confirmPassword) => {
    setAuthError(null);
    if (!name || !email || !password) {
      setAuthError('Vui lòng điền đầy đủ các trường thông tin.');
      return false;
    }
    if (password !== confirmPassword) {
      setAuthError('Mật khẩu xác nhận không khớp.');
      return false;
    }
    router.push({
      pathname: '/(auth)/verify-email',
      params: { email },
    });
    return true;
  };

  const verifyEmail = async (code) => {
    setAuthError(null);
    if (!code || code.length < 6) {
      setAuthError('Mã xác thực 6 số không hợp lệ.');
      return false;
    }
    setIsAuthenticated(true);
    router.replace('/home');
    return true;
  };

  const forgotPassword = async (email) => {
    setAuthError(null);
    if (!email) {
      setAuthError('Vui lòng nhập địa chỉ email hợp lệ.');
      return false;
    }
    return true;
  };

  const changePassword = async (currentPass, newPass, confirmPass) => {
    setAuthError(null);
    if (!currentPass || !newPass || !confirmPass) {
      setAuthError('Vui lòng điền đầy đủ các mục mật khẩu.');
      return false;
    }
    if (newPass !== confirmPass) {
      setAuthError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return false;
    }
    return true;
  };

  const logout = async () => {
    setIsAuthenticated(false);
    router.replace('/(auth)/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authError,
        setAuthError,
        login,
        register,
        verifyEmail,
        forgotPassword,
        changePassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
