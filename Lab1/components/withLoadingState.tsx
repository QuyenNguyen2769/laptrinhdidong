import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import ErrorView from './ErrorView';

export interface LoadingStateProps {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  onRetry?: () => void;
}

export function withLoadingState<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  function WithLoadingState({
    isLoading,
    isError,
    errorMessage,
    onRetry,
    ...props
  }: P & LoadingStateProps) {
    if (isLoading) {
      return (
        <View style={styles.fullScreen}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }
    if (isError) {
      return <ErrorView message={errorMessage} onRetry={onRetry} />;
    }
    return <WrappedComponent {...(props as unknown as P)} />;
  }
  WithLoadingState.displayName = `withLoadingState(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;
  return WithLoadingState;
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 200 },
});
