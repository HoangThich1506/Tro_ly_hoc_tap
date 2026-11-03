import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  error,
  style = '',
}) {
  return (
    <View style={tw`mb-4 ${style}`}>
      {label && <Text style={tw`text-sm font-semibold text-slate-700 mb-1.5`}>{label}</Text>}
      <View
        style={tw`flex-row items-center bg-slate-50 border ${
          error ? 'border-red-400' : 'border-slate-200'
        } rounded-xl px-3.5 ${multiline ? 'py-2.5 items-start' : 'py-1'}`}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color="#64748B"
            style={tw`mr-2.5 ${multiline ? 'mt-1' : ''}`}
          />
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={tw`flex-1 text-slate-800 text-base ${multiline ? 'min-h-20 text-top' : 'py-2.5'}`}
        />
      </View>
      {error && <Text style={tw`text-xs text-red-500 mt-1`}>{error}</Text>}
    </View>
  );
}
