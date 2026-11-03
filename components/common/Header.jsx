import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function Header({
  title,
  subtitle,
  showBack = true,
  onBack,
  rightAction,
  rightIcon,
  onRightPress,
}) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={tw`bg-white px-4 py-3 border-b border-slate-100 flex-row items-center justify-between`}>
      <View style={tw`flex-row items-center flex-1`}>
        {showBack && (
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.7}
            style={tw`w-10 h-10 rounded-full bg-slate-100 items-center justify-center mr-3`}
          >
            <Ionicons name="arrow-back" size={20} color="#1E293B" />
          </TouchableOpacity>
        )}
        <View style={tw`flex-1`}>
          <Text style={tw`text-lg font-bold text-slate-800`} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={tw`text-xs text-slate-500`} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      {rightAction ? (
        rightAction
      ) : rightIcon ? (
        <TouchableOpacity
          onPress={onRightPress}
          activeOpacity={0.7}
          style={tw`w-10 h-10 rounded-full bg-blue-50 items-center justify-center ml-2`}
        >
          <Ionicons name={rightIcon} size={20} color="#2563EB" />
        </TouchableOpacity>
      ) : (
        <View style={tw`w-2`} />
      )}
    </View>
  );
}
