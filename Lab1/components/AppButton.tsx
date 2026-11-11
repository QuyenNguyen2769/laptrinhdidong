import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

interface AppButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  secondary: { backgroundColor: '#6c757d', borderColor: '#6c757d' },
  outline: { backgroundColor: 'transparent', borderColor: '#007AFF' },
  danger: { backgroundColor: '#dc3545', borderColor: '#dc3545' },
};

const variantTextStyles: Record<ButtonVariant, TextStyle> = {
  primary: { color: '#fff' },
  secondary: { color: '#fff' },
  outline: { color: '#007AFF' },
  danger: { color: '#fff' },
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  small: { paddingVertical: 6, paddingHorizontal: 12 },
  medium: { paddingVertical: 10, paddingHorizontal: 18 },
  large: { paddingVertical: 14, paddingHorizontal: 26 },
};

const sizeTextStyles: Record<ButtonSize, TextStyle> = {
  small: { fontSize: 12 },
  medium: { fontSize: 16 },
  large: { fontSize: 20 },
};

export default function AppButton({
  title,
  variant = 'primary',
  size = 'medium',
  onPress,
  disabled = false,
  loading = false,
  icon,
}: AppButtonProps) {
  const isDisabled = disabled || loading;
  const spinnerColor = variantTextStyles[variant].color as string;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <View style={styles.content}>
          {icon}
          <Text
            style={[styles.text, variantTextStyles[variant], sizeTextStyles[size]]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  content: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  text: { fontWeight: 'bold' },
  disabled: { opacity: 0.5 },
});
