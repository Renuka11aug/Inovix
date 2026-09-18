export const outlets = [
  {
    id: 'the-commons',
    name: 'The Commons',
    tags: 'All-day kitchen · North quad',
    cuisine: ['Meals', 'Snacks', 'Beverages'],
    status: 'open',
    rating: 4.5,
    reviews: 210,
    prep: '12–15 min',
    address: 'North Quad',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  },
  {
    id: 'curry-corner',
    name: 'Curry Corner',
    tags: 'North Indian · Hostel Block B',
    cuisine: ['North Indian', 'Meals'],
    status: 'busy',
    rating: 4.2,
    reviews: 138,
    prep: '20–25 min',
    address: 'Hostel Block B',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
  },
  {
    id: 'brew-and-bites',
    name: 'Brew & Bites',
    tags: 'Café · Library wing',
    cuisine: ['Café', 'Beverages', 'Snacks'],
    status: 'open',
    rating: 4.7,
    reviews: 320,
    prep: '5–10 min',
    address: 'Library Wing',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
  },
  {
    id: 'wok-this-way',
    name: 'Wok This Way',
    tags: 'Chinese · South quad',
    cuisine: ['Chinese', 'Fast Food'],
    status: 'closed',
    rating: 4.0,
    reviews: 95,
    prep: '15–20 min',
    address: 'South Quad',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80',
  },
];

export const categories = [
  { id: 'popular', label: 'Popular', icon: '🔥' },
  { id: 'meals', label: 'Meals', icon: '🍱' },
  { id: 'snacks', label: 'Snacks', icon: '🍟' },
  { id: 'beverages', label: 'Beverages', icon: '🥤' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
];

export const menuItems = [
  {
    id: 'm1', outletId: 'the-commons',
    name: 'Miso sesame grain bowl', desc: 'Brown rice, roasted greens, edamame, sesame miso dressing',
    price: 185, category: 'Meals', veg: true, discount: '10% OFF',
    rating: 4.6, reviews: 94,
    ingredients: ['Brown rice', 'Edamame', 'Roasted greens', 'Sesame', 'Miso dressing', 'Tofu'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    customizations: [
      { id: 'size', label: 'Size', type: 'radio', options: [{ id: 'reg', label: 'Regular', price: 0 }, { id: 'lg', label: 'Large', price: 40 }] },
      { id: 'extras', label: 'Add-ons', type: 'checkbox', options: [{ id: 'xtofu', label: 'Extra tofu', price: 30 }, { id: 'xdress', label: 'Extra dressing', price: 15 }] },
    ],
  },
  {
    id: 'm2', outletId: 'the-commons',
    name: 'Campus club sandwich', desc: 'Sourdough, herb chicken, house aioli',
    price: 165, category: 'Snacks', veg: false,
    rating: 4.4, reviews: 61,
    ingredients: ['Sourdough', 'Herb chicken', 'Lettuce', 'Tomato', 'House aioli', 'Cheese'],
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80',
    customizations: [
      { id: 'bread', label: 'Bread', type: 'radio', options: [{ id: 'sour', label: 'Sourdough', price: 0 }, { id: 'whole', label: 'Whole wheat', price: 10 }] },
      { id: 'extras', label: 'Add-ons', type: 'checkbox', options: [{ id: 'xcheese', label: 'Extra cheese', price: 20 }, { id: 'xsauce', label: 'Extra sauce', price: 10 }] },
    ],
  },
  {
    id: 'm3', outletId: 'the-commons',
    name: 'Cold brew coffee', desc: 'Slow steeped 18 hours, served over ice',
    price: 90, category: 'Beverages', veg: true,
    rating: 4.8, reviews: 182,
    ingredients: ['Cold brew concentrate', 'Filtered water', 'Ice'],
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
    customizations: [
      { id: 'size', label: 'Size', type: 'radio', options: [{ id: 'sm', label: 'Small', price: 0 }, { id: 'md', label: 'Medium', price: 20 }, { id: 'lg', label: 'Large', price: 35 }] },
      { id: 'extras', label: 'Add-ons', type: 'checkbox', options: [{ id: 'milk', label: 'Oat milk', price: 25 }, { id: 'syrup', label: 'Vanilla syrup', price: 15 }] },
    ],
  },
  {
    id: 'm4', outletId: 'curry-corner',
    name: 'Paneer butter masala', desc: 'Creamy tomato gravy, soft paneer cubes, naan',
    price: 175, category: 'Meals', veg: true,
    rating: 4.5, reviews: 107,
    ingredients: ['Paneer', 'Tomato gravy', 'Butter', 'Cream', 'Naan', 'Spices'],
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80',
    customizations: [
      { id: 'spice', label: 'Spice level', type: 'radio', options: [{ id: 'mild', label: 'Mild', price: 0 }, { id: 'med', label: 'Medium', price: 0 }, { id: 'hot', label: 'Hot 🌶', price: 0 }] },
      { id: 'extras', label: 'Add-ons', type: 'checkbox', options: [{ id: 'xnaan', label: 'Extra naan', price: 25 }, { id: 'xpaneer', label: 'Extra paneer', price: 40 }] },
    ],
  },
  {
    id: 'm5', outletId: 'curry-corner',
    name: 'Chicken biryani', desc: 'Fragrant basmati, whole spices, raita',
    price: 195, category: 'Meals', veg: false,
    rating: 4.7, reviews: 215,
    ingredients: ['Basmati rice', 'Chicken', 'Whole spices', 'Saffron', 'Fried onions', 'Raita'],
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
    customizations: [
      { id: 'portion', label: 'Portion', type: 'radio', options: [{ id: 'half', label: 'Half', price: 0 }, { id: 'full', label: 'Full', price: 60 }] },
      { id: 'extras', label: 'Add-ons', type: 'checkbox', options: [{ id: 'xraita', label: 'Extra raita', price: 20 }, { id: 'kebab', label: 'Seekh kebab', price: 60 }] },
    ],
  },
  {
    id: 'm6', outletId: 'curry-corner',
    name: 'Dal makhani', desc: 'Slow-cooked black lentils, butter, cream',
    price: 130, category: 'Meals', veg: true,
    rating: 4.3, reviews: 73,
    ingredients: ['Black lentils', 'Kidney beans', 'Butter', 'Cream', 'Tomato', 'Spices'],
    image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&q=80',
    customizations: [
      { id: 'extras', label: 'Add-ons', type: 'checkbox', options: [{ id: 'xbutter', label: 'Extra butter', price: 15 }, { id: 'roti', label: 'Tandoori roti', price: 20 }] },
    ],
  },
  {
    id: 'm7', outletId: 'brew-and-bites',
    name: 'Loaded nachos', desc: 'Corn chips, cheese sauce, jalapenos, salsa',
    price: 140, category: 'Snacks', veg: true,
    rating: 4.4, reviews: 88,
    ingredients: ['Corn chips', 'Cheese sauce', 'Jalapenos', 'Salsa', 'Sour cream', 'Guacamole'],
    image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=800&q=80',
    customizations: [
      { id: 'extras', label: 'Add-ons', type: 'checkbox', options: [{ id: 'xcheese', label: 'Extra cheese', price: 20 }, { id: 'xguac', label: 'Guacamole', price: 30 }, { id: 'xsour', label: 'Sour cream', price: 15 }] },
    ],
  },
  {
    id: 'm8', outletId: 'brew-and-bites',
    name: 'Belgian waffle', desc: 'Maple syrup, whipped cream, berries',
    price: 120, category: 'Desserts', veg: true, status: 'out-of-stock',
    rating: 4.5, reviews: 55,
    ingredients: ['Waffle batter', 'Maple syrup', 'Whipped cream', 'Fresh berries', 'Butter'],
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&q=80',
    customizations: [],
  },
  {
    id: 'm9', outletId: 'brew-and-bites',
    name: 'Cold brew coffee', desc: 'Slow steeped 18 hours, served over ice',
    price: 90, category: 'Beverages', veg: true,
    rating: 4.8, reviews: 143,
    ingredients: ['Cold brew concentrate', 'Filtered water', 'Ice'],
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
    customizations: [
      { id: 'size', label: 'Size', type: 'radio', options: [{ id: 'sm', label: 'Small', price: 0 }, { id: 'md', label: 'Medium', price: 20 }, { id: 'lg', label: 'Large', price: 35 }] },
      { id: 'extras', label: 'Add-ons', type: 'checkbox', options: [{ id: 'milk', label: 'Oat milk', price: 25 }, { id: 'syrup', label: 'Vanilla syrup', price: 15 }] },
    ],
  },
  {
    id: 'm10', outletId: 'wok-this-way',
    name: 'Veg fried rice', desc: 'Wok-tossed rice, seasonal vegetables, soy sauce',
    price: 135, category: 'Meals', veg: true,
    rating: 4.2, reviews: 49,
    ingredients: ['Basmati rice', 'Seasonal vegetables', 'Soy sauce', 'Sesame oil', 'Spring onion', 'Egg'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
    customizations: [
      { id: 'size', label: 'Portion', type: 'radio', options: [{ id: 'reg', label: 'Regular', price: 0 }, { id: 'lg', label: 'Large', price: 40 }] },
      { id: 'extras', label: 'Add-ons', type: 'checkbox', options: [{ id: 'xegg', label: 'Extra egg', price: 15 }, { id: 'tofu', label: 'Tofu', price: 25 }] },
    ],
  },
  {
    id: 'm11', outletId: 'wok-this-way',
    name: 'Chicken noodles', desc: 'Stir-fried noodles, tender chicken, scallions',
    price: 160, category: 'Fast Food', veg: false,
    rating: 4.3, reviews: 67,
    ingredients: ['Egg noodles', 'Chicken', 'Scallions', 'Soy sauce', 'Sesame oil', 'Chilli'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
    customizations: [
      { id: 'spice', label: 'Spice', type: 'radio', options: [{ id: 'mild', label: 'Mild', price: 0 }, { id: 'hot', label: 'Spicy 🌶', price: 0 }] },
      { id: 'extras', label: 'Add-ons', type: 'checkbox', options: [{ id: 'xchicken', label: 'Extra chicken', price: 40 }, { id: 'egg', label: 'Fried egg', price: 20 }] },
    ],
  },
];

export const incomingOrders = [
  { id: '1042', time: '2 min ago', itemsSummary: '2x Miso bowl, 1x Cold brew' },
  { id: '1043', time: 'Just now', itemsSummary: '1x Club sandwich' },
];

export const kanbanColumns = [
  { title: 'New', orders: incomingOrders },
  { title: 'Preparing', orders: [{ id: '1040', time: '6 min ago', itemsSummary: '3x Nachos' }] },
  { title: 'Ready', orders: [{ id: '1038', time: '11 min ago', itemsSummary: '1x Waffle' }] },
];

export const salesData = [
  { label: 'Mon', value: 4200 }, { label: 'Tue', value: 5100 }, { label: 'Wed', value: 3800 },
  { label: 'Thu', value: 6200 }, { label: 'Fri', value: 7400 }, { label: 'Sat', value: 8900 }, { label: 'Sun', value: 6100 },
];

export const students = [
  { id: 1, name: 'Riya Sharma', email: 'riya@campus.edu', campus: 'North Campus', status: 'active' },
  { id: 2, name: 'Aman Verma', email: 'aman@campus.edu', campus: 'South Campus', status: 'suspended' },
];

export const outletRows = [
  { id: 1, name: 'The Commons', campus: 'North Campus', orders30d: 842, status: 'approved' },
  { id: 2, name: 'Night Grill', campus: 'South Campus', orders30d: 12, status: 'pending' },
];

export const orderRows = [
  { id: '1042', student: 'Riya Sharma', outlet: 'The Commons', total: 350, status: 'PREPARING' },
  { id: '1039', student: 'Aman Verma', outlet: 'Curry Corner', total: 210, status: 'COMPLETED' },
];

export const paymentRows = [
  { id: 'txn_291', student: 'Riya Sharma', amount: 350, method: 'UPI', status: 'success' },
  { id: 'txn_290', student: 'Aman Verma', amount: 210, method: 'Card', status: 'pending' },
];

export const notifications = [
  { id: 1, message: 'Your order at The Commons is being prepared.', time: '2 min ago', read: false },
  { id: 2, message: '10% off at Brew & Bites today only!', time: '1 hr ago', read: true },
];

export const recentOrder = {
  id: 'ord_1042',
  foodName: 'Paneer Wrap',
  outletName: 'Campus Cafe',
  price: 80,
  status: 'PREPARING',
  image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200&q=80',
  placedAt: '10 min ago',
};

/* Multiple active orders — used by the stacked banner */
export const activeOrders = [
  {
    id: 'ord_1042',
    foodName: 'Paneer Wrap',
    outletName: 'Campus Cafe',
    price: 80,
    status: 'PREPARING',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200&q=80',
    placedAt: '10 min ago',
  },
  {
    id: 'ord_1041',
    foodName: 'Cold Brew Coffee',
    outletName: 'Brew & Bites',
    price: 90,
    status: 'READY',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&q=80',
    placedAt: '18 min ago',
  },
  {
    id: 'ord_1040',
    foodName: 'Loaded Nachos',
    outletName: 'The Commons',
    price: 140,
    status: 'PLACED',
    image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=200&q=80',
    placedAt: '2 min ago',
  },
];
