import React, { useState } from 'react';
import { View,StyleSheet,Text, ScrollView, Switch, Button } from 'react-native';
import AppButton from './components/AppButton';
import BookListScreen from './components/BookListScreen';
import OrderHistoryScreen from './components/OrderHistoryScreen';
import BookCard from './components/BookCard';
import UserCard from './components/UserCard';
import Counter from './components/Counter';
import TodoBasic from './components/TodoBasic';
import MyButton from './components/MyButton';
import LiveInput from './components/LiveInput';
import LoadingContainer from './components/LoadingContainer';
import GenderSelector from './components/GenderSelector';

export default function App() {
  const thongbao = () =>{
    alert('Bạn vừa bấm nút!');
};
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const books = [
    { id: '1', title: 'Clean Code', price: 250000, cover: 'https://picsum.photos/100/140?1' },
    { id: '2', title: 'Refactoring', price: 300000, cover: 'https://picsum.photos/100/140?2' },
  ];
  const orders = [
    { id: '101', bookTitle: 'Clean Code', date: '01/11/2026' },
    { id: '102', bookTitle: 'Refactoring', date: '05/11/2026' },
  ];
  return (
    <ScrollView>
    <View style={{padding: 20, gap: 30 }}>
      <View>
      <Text style={styles.title}>Bài 1</Text>
      <Text>
        <UserCard name='Nguyễn Văn A' age={21} isAdmin={true}/>
        <UserCard name='Nguyễn Văn B' age={20} isAdmin={false}/>
      </Text>
    </View>

    <View>
      <Text style={styles.title}>Bài 2</Text>
        <Counter/>
    </View>

    <View>
      <Text style={styles.title}>Bài 3</Text>
        <TodoBasic/>
    </View>

    <View>
      <Text style={styles.title}>Bài 4</Text>
        <MyButton label='Mặc định' onPress={thongbao} color='#2752b0'></MyButton>
        <MyButton label='Xóa' onPress={thongbao} color='#f21616'></MyButton>  
        <MyButton label='Xin Chào' onPress={() => alert('Xin chào!')}
          color='#9c27b0'></MyButton>
    </View>

    <View>
      <Text style={styles.title}>Bài 5</Text>
        <LiveInput/>
    </View>

    <View>
      <Text style={styles.title}>Bài 6</Text>
        <Switch value={isLoading} onValueChange={setIsLoading}/>
    </View>

    <LoadingContainer isLoading={isLoading}>
      <Text>Đữ liệu đã được tải xong!!!!!</Text>
    </LoadingContainer>
    <View>
      <Text style={styles.title}>Bài 7</Text>
      <GenderSelector/>
    </View>

    <View>
      <Text style={styles.title}>Bài 8</Text>
      <AppButton title="Thêm vào giỏ hàng" variant="primary" onPress={thongbao} />
      <AppButton title="Xem chi tiết" variant="outline" size="small" onPress={thongbao} />
      <AppButton title="Xóa sách" variant="danger" size="large" onPress={thongbao} />
      <AppButton title="Đang tải" variant="secondary" loading onPress={thongbao} />
    </View>

    <View>
      <Text style={styles.title}>Bài 9</Text>
      <Button title={isError ? 'Tắt lỗi' : 'Bật lỗi'} onPress={() => setIsError(!isError)} />
      <BookListScreen
        isLoading={isLoading}
        isError={isError}
        errorMessage="Không tải được danh sách sách"
        onRetry={() => setIsError(false)}
        books={books}
      />
      <OrderHistoryScreen
        isLoading={isLoading}
        isError={isError}
        errorMessage="Không tải được lịch sử đơn hàng"
        onRetry={() => setIsError(false)}
        orders={orders}
      />
    </View>

    <View>
      <Text style={styles.title}>Bài 10</Text>
      <BookCard book={books[0]}>
        <BookCard.Cover />
        <BookCard.Title />
        <BookCard.Price />
        <BookCard.FavoriteButton />
      </BookCard>
    </View>

    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  title:{
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center'
  }
})