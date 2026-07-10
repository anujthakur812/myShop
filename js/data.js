const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "💻" },
  { id: "fashion", name: "Fashion", icon: "👗" },
  { id: "home", name: "Home & Living", icon: "🏠" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "beauty", name: "Beauty", icon: "💄" },
  { id: "books", name: "Books", icon: "📚" },
];

const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", category: "electronics", price: 79.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", description: "Premium noise-cancelling wireless headphones with 30hr battery." },
  { id: 2, name: "Smart Watch Pro", category: "electronics", price: 249.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", description: "Track fitness, receive notifications, and stay connected." },
  { id: 3, name: "Laptop Stand", category: "electronics", price: 34.99, image: "https://images.unsplash.com/photo-1527864550417-7fd91ec9a736?w=400&h=400&fit=crop", description: "Ergonomic aluminum stand for better posture." },
  { id: 4, name: "Classic Denim Jacket", category: "fashion", price: 89.99, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93b0?w=400&h=400&fit=crop", description: "Timeless denim jacket for every season." },
  { id: 5, name: "Running Sneakers", category: "fashion", price: 119.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", description: "Lightweight sneakers built for comfort and speed." },
  { id: 6, name: "Leather Handbag", category: "fashion", price: 159.99, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop", description: "Handcrafted genuine leather handbag." },
  { id: 7, name: "Ceramic Vase Set", category: "home", price: 45.99, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop", description: "Minimalist ceramic vases for modern decor." },
  { id: 8, name: "Scented Candle Pack", category: "home", price: 29.99, image: "https://images.unsplash.com/photo-1602600167679-8898379a2a8a?w=400&h=400&fit=crop", description: "Set of 3 soy wax candles in calming scents." },
  { id: 9, name: "Throw Pillow Set", category: "home", price: 39.99, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2d2?w=400&h=400&fit=crop", description: "Soft decorative pillows for your living room." },
  { id: 10, name: "Yoga Mat Premium", category: "sports", price: 49.99, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop", description: "Non-slip eco-friendly yoga mat with carrying strap." },
  { id: 11, name: "Dumbbell Set 10kg", category: "sports", price: 69.99, image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop", description: "Adjustable dumbbell set for home workouts." },
  { id: 12, name: "Football Official Size", category: "sports", price: 34.99, image: "https://images.unsplash.com/photo-1614632537423-1e6c2f7e0aab?w=400&h=400&fit=crop", description: "FIFA-approved match football." },
  { id: 13, name: "Skincare Gift Set", category: "beauty", price: 89.99, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop", description: "Complete skincare routine in one beautiful set." },
  { id: 14, name: "Perfume Elegance", category: "beauty", price: 129.99, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop", description: "Luxury fragrance with notes of jasmine and amber." },
  { id: 15, name: "Makeup Brush Kit", category: "beauty", price: 39.99, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", description: "Professional 12-piece brush set with case." },
  { id: 16, name: "The Art of Coding", category: "books", price: 24.99, image: "https://images.unsplash.com/photo-1532012197277-84a72955b861?w=400&h=400&fit=crop", description: "Master programming with this comprehensive guide." },
  { id: 17, name: "Mindful Living", category: "books", price: 18.99, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop", description: "A guide to finding peace in everyday life." },
  { id: 18, name: "Cookbook Deluxe", category: "books", price: 32.99, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop", description: "500 recipes from around the world." },
];
