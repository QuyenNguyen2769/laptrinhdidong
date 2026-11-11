export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string; // Ví dụ: '-20%', 'MỚI'
  cover: string;
  description?: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export const SAMPLE_CATEGORIES: Category[] = [
  { id: '1', name: 'Tất cả' },
  { id: '2', name: 'Văn học' },
  { id: '3', name: 'Kinh tế & Khởi nghiệp' },
  { id: '4', name: 'Kỹ năng sống' },
  { id: '5', name: 'Thiếu nhi' },
  { id: '6', name: 'Khoa học viễn tưởng' },
  { id: '7', name: 'Truyện tranh' },
  { id: '8', name: 'Lịch sử - Xã hội' },
];

export const SAMPLE_BOOKS: Book[] = [
  {
    id: 'b1',
    title: 'Đắc Nhân Tâm (Bản đặc biệt phát hành kỷ niệm)',
    author: 'Dale Carnegie',
    price: 88000,
    originalPrice: 110000,
    discountBadge: '-20%',
    category: 'Kỹ năng sống',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80',
    description:
      'Đắc Nhân Tâm là cuốn sách nổi tiếng nhất, có tầm ảnh hưởng lớn nhất mọi thời đại. Cuốn sách hướng dẫn cách đối nhân xử thế, cách ứng xử và làm chủ các mối quan hệ xã hội một cách tích cực và nhân văn.',
  },
  {
    id: 'b2',
    title: 'Nhà Giả Kim (Tái bản bìa cứng)',
    author: 'Paulo Coelho',
    price: 79000,
    originalPrice: 95000,
    discountBadge: 'MỚI',
    category: 'Văn học',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80',
    description:
      'Cuốn sách kể về hành trình theo đuổi ước mơ và vận mệnh của chàng chăn cừu Santiago, từ Andalusia tới những kim tự tháp Ai Cập huyền bí.',
  },
  {
    id: 'b3',
    title: 'Khởi Nghiệp Tinh Gọn (Lean Startup)',
    author: 'Eric Ries',
    price: 135000,
    originalPrice: 150000,
    discountBadge: '-10%',
    category: 'Kinh tế & Khởi nghiệp',
    cover: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=300&q=80',
    description:
      'Phương pháp tiếp cận mang tính cách mạng cho việc xây dựng và quản lý các công ty khởi nghiệp trong thời đại biến động công nghệ.',
  },
  {
    id: 'b4',
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu?',
    author: 'Rosie Nguyễn',
    price: 65000,
    originalPrice: 85000,
    discountBadge: '-25%',
    category: 'Kỹ năng sống',
    cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&q=80',
    description:
      'Cuốn sách ghi lại hành trình trải nghiệm của một người trẻ, chia sẻ những bài học bổ ích về tự học, đi để lớn và tìm kiếm ước mơ thực sự.',
  },
  {
    id: 'b5',
    title: 'Sapiens: Lược Sử Loài Người',
    author: 'Yuval Noah Harari',
    price: 189000,
    originalPrice: 220000,
    discountBadge: '-15%',
    category: 'Lịch sử - Xã hội',
    cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&q=80',
    description:
      'Khám phá toàn cảnh lịch sử loài người từ thời kỳ đồ đá cho đến thế kỷ 21, làm sáng tỏ các cuộc cách mạng nhận thức, nông nghiệp và khoa học.',
  },
];
