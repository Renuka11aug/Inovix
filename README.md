# Nosh — React Component Library

A complete React (JS, JSX — no TypeScript) implementation of every component from the *Campus Food Component & API Reference*, styled to match the original `nosh-app.html` prototype (same color tokens, fonts — Inter + Aguafina Script for the logo — spacing, radii and shadows).

## What's inside

135 components across 11 folders under `src/components/`, matching the reference doc's sections:

| Folder | Covers |
|---|---|
| `ui/` | Button, Input, SearchInput, Textarea, Select, Checkbox, Radio, Switch, DatePicker, TimePicker, Modal, ConfirmDialog, Toast, Alert, Badge, Avatar, Dropdown, Tabs, Pagination, Skeleton, Spinner, EmptyState, ErrorState |
| `layout/` | Header, Sidebar, MobileNav, PageContainer, PageHeader, Breadcrumbs, Footer, ProtectedRoute, RoleGuard |
| `auth/` | AuthLayout, LoginForm, RegisterForm, EmailVerification, ForgotPasswordForm, ResetPasswordForm, PasswordInput |
| `student/` | StudentHome, CategoryList/Card, OutletCard/Grid/Status, FoodCard/Grid/Details/Image, Featured & Popular sections, RecentOrders, PriceDisplay, QuantitySelector, CustomizationSelector, AddToCartButton, Cart + CartItem/CartItemList/CartSummary/CartButton, CheckoutButton |
| `checkout/` | Checkout, OrderSummary, PaymentSection/Button/Processing/Success/Failed, OrderConfirmation |
| `order/` | OrderCard/List/Details, OrderStatusBadge/Timeline/Stepper, PreparationTime, OrderItems, OrderPriceBreakdown, OrderActions, PickupCode/QR/Instructions |
| `notifications/` | NotificationBell/List/Item/Dropdown, UnreadIndicator, ProfileCard/Form, Account/Security/Notification settings |
| `outlet/` | OutletDashboard, StatCard, RevenueCard, OrderStats, SalesChart, OrderQueue/Kanban/Column, IncomingOrderCard, Accept/RejectButton, PreparationTimeSelector, RejectOrderModal, OrderStatusActions |
| `menu-management/` | MenuManager, MenuCategoryList/Form, MenuItemTable/Form, FoodImageUploader, AvailabilityToggle, PriceInput, PreparationTimeInput |
| `outlet-settings/` | OutletProfileForm, OpeningHoursEditor, OutletStatusToggle, OutletImageUploader, OrderSettingsForm, AnalyticsFilters, MetricCard, ChartCard (shared from `outlet/`) |
| `admin/` | AdminDashboard, AdminSidebar, AdminStatCard, UserTable, OutletTable, OrderTable, PaymentTable, ReportCard, ApprovalModal, SuspendModal, ExportButton |

`src/styles/global.css` holds every design token and component style (colors, spacing, radii, shadows, the `Aguafina Script` logo font) — it's the same system as `nosh-app.html`, so anything built with these components will look native to the app.

`App.jsx` is a runnable demo that switches between **Student app**, **Outlet dashboard**, and **Admin panel** views, wiring the components together with mock data from `src/mockData.js` (login → browse outlets → menu → cart → simulated order status; an outlet order board; an admin dashboard with tabbed data tables).

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production build in `dist/`.

## Using components in your own pages

Every component is a plain default export — import what you need:

```jsx
import Button from './components/ui/Button.jsx';
import OutletCard from './components/student/OutletCard.jsx';

<Button variant="primary" onClick={...}>Order now</Button>
<OutletCard outlet={outlet} onClick={handleSelect} />
```

## Notes on fidelity to the reference doc

- Components are presentational + local-state only — there's no backend, so tables/dashboards render from mock data (`src/mockData.js`) via props rather than live API calls. Wire your own fetch/mutation logic where you see `onClick`, `onSave`, `onChange` props.
- `PickupQR` renders a lightweight deterministic pixel pattern instead of pulling in a QR-code library, to keep the project dependency-free — swap in a real QR library if you need scannable codes.
- `SalesChart` is a small dependency-free bar chart for the same reason; swap in a charting library (e.g. Recharts) if you need richer visualizations.
- `ProtectedRoute` / `RoleGuard` assume `react-router-dom` (already in `package.json`) but aren't wired into a router in the demo — add your own `<BrowserRouter>` / `<Routes>` when you're ready to add real navigation.
