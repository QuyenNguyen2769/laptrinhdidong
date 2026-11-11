import React from 'react';
import { View, Text } from 'react-native';
import { withLoadingState } from './withLoadingState';

export interface Order {
  id: string;
  bookTitle: string;
  date: string;
}

interface Props {
  orders: Order[];
}

function OrderHistoryScreen({ orders }: Props) {
  return (
    <View>
      {orders.map((o) => (
        <Text key={o.id}>
          #{o.id} - {o.bookTitle} ({o.date})
        </Text>
      ))}
    </View>
  );
}

export default withLoadingState(OrderHistoryScreen);
