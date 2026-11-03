import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import tw from 'twrnc';

export default function Button({
  title,
  onPress,
  variant = 'primary', // primary | secondary | outline | danger
  loading = false,
  disabled = false,
  style = '',
  textStyle = '',
  icon,
}) {
  let baseStyle = 'flex-row items-center justify-center py-3.5 px-5 rounded-xl';
  let colorStyle = 'bg-blue-600 shadow-sm';
  let titleColor = 'text-white font-semibold text-base';

  if (variant === 'secondary') {
    colorStyle = 'bg-slate-100';
    titleColor = 'text-slate-800 font-semibold text-base';
  } else if (variant === 'outline') {
    colorStyle = 'bg-transparent border border-blue-600';
    titleColor = 'text-blue-600 font-semibold text-base';
  } else if (variant === 'danger') {
    colorStyle = 'bg-red-600';
    titleColor = 'text-white font-semibold text-base';
  }

  if (disabled || loading) {
    colorStyle += ' opacity-60';
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={tw`${baseStyle} ${colorStyle} ${style}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'secondary' ? '#2563EB' : '#FFFFFF'} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={tw`${titleColor} ${icon ? 'ml-2' : ''} ${textStyle}`}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
