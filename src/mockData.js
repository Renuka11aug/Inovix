export const outlets = [
  { id: 1, name: 'The Commons', tags: 'All-day kitchen · North quad', status: 'open', rating: 4.5, prep: '12-15 min', address: 'North Quad' },
  { id: 2, name: 'Curry Corner', tags: 'North Indian · Hostel Block B', status: 'busy', rating: 4.2, prep: '20-25 min', address: 'Hostel Block B' },
  { id: 3, name: 'Brew & Bites', tags: 'Cafe · Library wing', status: 'open', rating: 4.7, prep: '5-10 min', address: 'Library Wing' },
  { id: 4, name: 'Wok This Way', tags: 'Chinese · South quad', status: 'closed', rating: 4.0, prep: '15-20 min', address: 'South Quad' },
];

export const categories = [
  { id: 'popular', label: 'Popular', icon: '🔥' },
  { id: 'meals', label: 'Meals', icon: '🍱' },
  { id: 'snacks', label: 'Snacks', icon: '🍟' },
  { id: 'beverages', label: 'Beverages', icon: '🥤' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
];

export const menuItems = [
  { id: 'm1', name: 'Miso sesame grain bowl', desc: 'Brown rice, roasted greens, edamame, sesame miso dressing', price: 185, category: 'meals', discount: '10% OFF' },
  { id: 'm2', name: 'Campus club sandwich', desc: 'Sourdough, herb chicken, house aioli', price: 165, category: 'meals' },
  { id: 'm3', name: 'Loaded nachos', desc: 'Corn chips, cheese sauce, jalapenos, salsa', price: 140, category: 'snacks' },
  { id: 'm4', name: 'Cold brew coffee', desc: 'Slow steeped 18 hours, served over ice', price: 90, category: 'beverages' },
  { id: 'm5', name: 'Belgian waffle', desc: 'Maple syrup, whipped cream, berries', price: 120, category: 'desserts', status: 'out-of-stock' },
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
