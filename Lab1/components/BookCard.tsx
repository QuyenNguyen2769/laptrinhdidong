import React, { createContext, useContext, useState, PropsWithChildren } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export interface Book {
  id: string;
  title: string;
  price: number;
  cover: string;
}

interface BookCardContextValue {
  book: Book;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

const BookCardContext = createContext<BookCardContextValue | null>(null);

function useBookCard(): BookCardContextValue {
  const ctx = useContext(BookCardContext);
  if (!ctx) {
    throw new Error('BookCard.* phải được dùng bên trong <BookCard>');
  }
  return ctx;
}

function BookCardRoot({ book, children }: PropsWithChildren<{ book: Book }>) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const toggleFavorite = () => setIsFavorite((v) => !v);

  return (
    <BookCardContext.Provider value={{ book, isFavorite, toggleFavorite }}>
      <View style={styles.card}>{children}</View>
    </BookCardContext.Provider>
  );
}

function Cover() {
  const { book } = useBookCard();
  return <Image source={{ uri: book.cover }} style={styles.cover} />;
}

function Title() {
  const { book } = useBookCard();
  return <Text style={styles.title}>{book.title}</Text>;
}

function Price() {
  const { book } = useBookCard();
  return <Text style={styles.price}>{book.price.toLocaleString('vi-VN')}đ</Text>;
}

function FavoriteButton() {
  const { isFavorite, toggleFavorite } = useBookCard();
  return (
    <TouchableOpacity onPress={toggleFavorite}>
      <Text style={styles.heart}>{isFavorite ? '❤️' : '🤍'}</Text>
    </TouchableOpacity>
  );
}

const BookCard = Object.assign(BookCardRoot, {
  Cover,
  Title,
  Price,
  FavoriteButton,
});

export default BookCard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    gap: 6,
  },
  cover: { width: 100, height: 140, borderRadius: 6, backgroundColor: '#eee' },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { color: '#dc3545' },
  heart: { fontSize: 26 },
});
