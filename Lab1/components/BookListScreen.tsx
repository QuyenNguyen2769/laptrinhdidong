import React from 'react';
import { View, Text } from 'react-native';
import { withLoadingState } from './withLoadingState';

export interface Book {
  id: string;
  title: string;
  price: number;
  cover: string;
}

interface Props {
  books: Book[];
}

function BookListScreen({ books }: Props) {
  return (
    <View>
      {books.map((b) => (
        <Text key={b.id}>
          {b.title} - {b.price}đ
        </Text>
      ))}
    </View>
  );
}

export default withLoadingState(BookListScreen);
