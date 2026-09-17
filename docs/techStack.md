Campus Food --- Technical Stack & Architecture

Version: V1
Status: Locked Technical Specification
Date: 2026-09-16

This document defines the technical choices for Campus Food V1. It
follows the authoritative design specification and master project
document.

1. Technology Stack

Layer                   Technology              Purpose

Frontend                React 18                UI framework

Build tool              Vite                    Frontend
development/build

Language                JavaScript + JSX        Application language

Styling                 Tailwind CSS            Utility-first styling

UI                      shadcn/ui + custom      Reusable UI system
components

Routing                 React Router 6          Client-side routing

Server state            TanStack Query v5       API/server-state
management

Backend                 Node.js 20              Server runtime

Backend framework       Express 4               REST API server

Backend language        JavaScript              Backend application
language

Database                PostgreSQL 15           Primary relational
database

ORM                     Prisma 5                Database access, schema
and migrations

API                     REST + JSON             Client/server
communication

Realtime                Socket.IO 4             Order and notification
realtime events

Payments                Razorpay                Per-outlet online
prepaid payments

Image storage           Cloudinary              Food/outlet image
storage

Validation              Zod                     Shared request/data
validation

Authentication          JWT                     Access/refresh
authentication

Password hashing        bcrypt                  Password security

Rate limiting           express-rate-limit      API abuse protection

Security headers        Helmet                  HTTP security headers

Testing                 Vitest / Supertest /    Unit, integration and
Playwright              E2E testing

API mocking             MSW                     Frontend API mocking

Accessibility           axe-core                Accessibility testing

Version control         Git + GitHub            Source control

CI/CD                   GitHub Actions          Automated
checks/deployment

Frontend hosting        Vercel                  Production frontend

Backend hosting         Render or Railway       Production API

PostgreSQL hosting      Neon/Supabase or        Production DB
managed PostgreSQL

Error monitoring        Sentry                  Error tracking

Uptime monitoring       UptimeRobot             Availability monitoring

Logging                 Pino + LogDNA or        Structured backend logs
similar

Charts                  Recharts                Outlet/admin analytics

Important: The locked V1 payment model is Razorpay with one
Razorpay account per outlet. The platform does not collect or split
outlet payments.

2. Architecture

                    ┌─────────────────────────┐
                    │     React + Vite        │
                    │   Frontend Application  │
                    └───────────┬─────────────┘
                                │
                    REST/JSON + Socket.IO
                                │
                    ┌───────────▼─────────────┐
                    │    Node.js + Express    │
                    │     Backend / API       │
                    └──────┬─────────┬────────┘
                           │         │
                       Prisma     Webhooks
                           │         │
                    ┌──────▼───┐ ┌──▼─────────┐
                    │PostgreSQL│ │  Razorpay  │
                    └──────────┘ └────────────┘
                                      │
                                 Direct outlet
                                   settlement

                    ┌─────────────────────────┐
                    │       Cloudinary         │
                    │     Image Storage        │
                    └─────────────────────────┘

Architectural Rules

Frontend and backend are separate applications in one repository.

Backend is the security boundary.

Frontend role hiding is only a UX convenience, not security.

Every protected backend route independently verifies authorization.

Database state is authoritative.

Realtime events never replace database persistence.

Realtime events are emitted after database transaction commit.

Frontend payment success is never trusted without backend
verification.

Razorpay webhook signatures must be verified.

Cloudinary credentials never reach the browser.

3. Repository Structure

campus-food/
├── apps/
│   ├── frontend/
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   │
│   └── backend/
│       ├── src/
│       └── package.json
│
├── packages/
│   ├── ui/
│   ├── types/
│   └── validation/
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed/
│
├── docs/
│   ├── design-system.md
│   ├── api/
│   │   ├── m1-contracts.md
│   │   ├── m2-contracts.md
│   │   ├── m3-contracts.md
│   │   └── m4-contracts.md
│   ├── plans/
│   ├── erd.png
│   └── runbook.md
│
├── .env.example
├── .gitignore
├── README.md
└── package.json

4. Frontend Stack

Core

React 18

Vite

JavaScript/JSX

React Router 6

State Management

Server State

TanStack Query v5 handles:

Outlet data

Menus

Cart

Orders

Notifications

Admin data

Analytics

Cart

The cart is server-side.

Frontend uses a useCart hook backed by the cart API.

The cart must not exist only in localStorage.

Local UI State

Use:

useState

useReducer

for:

Modals

Drawers

Form state

Temporary UI state

No global UI store is required for V1.

Authentication

An AuthProvider stores:

User

Role

Outlet ID

Preferred token storage:

httpOnly secure cookies

LocalStorage is only a fallback if required by the deployment
architecture.

5. Frontend Routes

Authentication

/login
/register
/verify

Student

/
/outlets
/outlets/:outletSlug
/food/:foodId
/cart
/checkout
/orders
/orders/:orderId
/orders/:orderId/pickup
/profile

Outlet

/outlet/dashboard
/outlet/orders
/outlet/orders/:orderId
/outlet/menu
/outlet/menu/items/:itemId
/outlet/settings
/outlet/analytics

Admin

/admin
/admin/students
/admin/outlets
/admin/orders
/admin/payments
/admin/reports

6. UI / Design System

Colors

Primary:       #E85D04
Accent:        #FFB703
Background:    #FFFAF5
Surface:       #FFFFFF
Text Primary:  #1F2937
Text Muted:    #6B7280

Success:       #16A34A
Warning:       #F59E0B
Error:         #DC2626
Info:          #2563EB

Typography

Inter

Variable weights: 400, 500, 600, 700

Tabular numerals for prices/totals

Spacing

4 / 8 / 12 / 16 / 24 / 32 / 48 px

Radius

Cards:    8px
Modals:   12px
Pills:    9999px

Responsive Breakpoints

Mobile:  < 768px
Tablet:  768–1023px
Desktop: >= 1024px

Desktop uses a 12-column grid.

Accessibility

WCAG AA contrast

Visible focus rings

Never communicate meaning using color alone

Pair color states with icons/text

Keyboard-accessible interactive elements

7. Shared Components

Buttons

Primary

Secondary

Outline

Ghost

Destructive

Loading

Disabled

Icon

Inputs

Text

Search

Password

Number

Textarea

Select

Cards

FoodCard

OutletCard

OrderCard

StatsCard

Navigation

Header

Sidebar

Mobile bottom navigation

Tabs

Breadcrumbs

Feedback

Toast

Alert

Modal

Confirmation

Skeleton

Empty state

Error state

Data

Table

Pagination

Filters

Sorting

Badges

Avatar

Dropdown

Food/Ordering

Quantity selector

Cart item

Preparation-time chip

Order tracker timeline

Pickup code/QR

8. Backend Architecture

Express backend should be organized around clear responsibilities.

Suggested structure:

apps/backend/src/
├── app.js
├── server.js
├── config/
├── middleware/
├── routes/
├── controllers/
├── services/
├── repositories/
├── validators/
├── sockets/
├── jobs/
├── utils/
└── tests/

Important Backend Responsibilities

Authentication

Authorization

Request validation

Business rules

Order state transitions

Payment verification

Razorpay webhook processing

Refund processing

Database transactions

Realtime event emission

Notifications

Audit logging

Rate limiting

9. API Standards

All APIs use:

/api/v1/*

Breaking changes use:

/api/v2/*

Success Response

{
  "success": true,
  "data": {},
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 137
  }
}

Error Response

{
  "success": false,
  "error": {
    "code": "OUTLET_CLOSED",
    "message": "Outlet is not accepting orders right now",
    "details": {}
  }
}

IDs

Use UUIDs. CUIDs are acceptable when used as Prisma defaults.

Do not expose auto-increment integer IDs through the public API.

Pagination

GET /api/v1/<resource>?page=1&pageSize=20&sort=-createdAt

Filtering example:

filter[status]=ACTIVE

10. Authentication & Authorization

JWT

JWT payload:

{
  "sub": "user_id",
  "role": "STUDENT",
  "outletId": "uuid",
  "exp": 1234567890
}

Roles:

STUDENT
OUTLET_STAFF
OUTLET_ADMIN
SUPER_ADMIN

Token Lifetime

Access token: 15 minutes

Refresh token: 7 days

Refresh tokens rotate

Old refresh tokens are revoked

Refresh token hashes are stored in PostgreSQL

Passwords

Use bcrypt with cost factor 12.

11. RBAC Enforcement

Three primary Express authorization middleware layers:

requireAuth()
requireRole(...roles)
requireOutletScope()

requireAuth

Verifies JWT and attaches the authenticated user to the request.

requireRole

Checks whether the user's role is allowed for the route.

requireOutletScope

Checks that the user's outlet matches the requested outlet resource.

Super Admin bypasses outlet scope where platform-wide access is
required.

Database-Level Protection

Outlet-scoped Prisma queries must include outlet filtering.

Example concept:

where: {
  outletId: req.user.outletId
}

The frontend must never be considered the security boundary.

12. Database

PostgreSQL

V1 uses PostgreSQL 15.

Database:

campus_food

Local default:

localhost:5432

Prisma

Prisma 5 manages:

Schema

Relations

Migrations

Database client

Seed data

Production schema changes must go through Prisma migrations.

13. Core Database Entities

V1 uses 19 logical tables:

1.  User
2.  StudentProfile
3.  Campus
4.  Outlet
5.  OutletStaff
6.  OperatingHours
7.  MenuCategory
8.  MenuItem
9.  CustomizationGroup
10. CustomizationOption
11. Cart
12. CartItem
13. Order
14. OrderItem
15. Payment
16. Refund
17. Notification
18. RefreshToken
19. AuditLog

OutletPayout is intentionally excluded because each outlet's Razorpay
account settles directly to its own linked bank account.

14. Important Database Indexes

Required indexes include:

User(email) UNIQUE

StudentProfile(rollNumber, campusId) UNIQUE

Outlet(slug) UNIQUE

MenuItem(outletId, categoryId, isAvailable)

Order(outletId, status, createdAt)

Order(studentId, status, createdAt)

Notification(userId, isRead, createdAt)

Additional analytics indexes should support:

Payment(outletId, status, createdAt)

15. Order State Implementation

Valid transitions:

PENDING → ACCEPTED
PENDING → REJECTED
PENDING → CANCELLED

ACCEPTED → PREPARING
ACCEPTED → CANCELLED

PREPARING → READY
PREPARING → CANCELLED

READY → COMPLETED
READY → CANCELLED

Invalid transitions return:

HTTP 409 Conflict

Order timeline entries should record:

{
  "status": "PREPARING",
  "at": "timestamp",
  "by": "userId"
}

16. Payment Architecture

Per-Outlet Razorpay

Each Outlet stores encrypted:

razorpayKeyIdEnc
razorpayKeySecretEnc
razorpayWebhookSecretEnc

Encryption:

AES-256-GCM

Encryption key:

OUTLET_CREDENTIALS_KEY

Credentials must:

Never be logged

Never be returned through GET APIs

Never be sent to the frontend

Be decrypted only when required by the backend

Never be committed to Git

Payment Helper

Use a single backend helper conceptually equivalent to:

getOutletRazorpayClient(outletId)

17. Razorpay Payment Flow

Student
   │
   ▼
POST /api/v1/orders
   │
   ▼
Create internal Order + Payment
   │
   ▼
Backend loads selected outlet credentials
   │
   ▼
Create Razorpay Order
   │
   ▼
Frontend opens Razorpay Checkout
   │
   ▼
Student pays
   │
   ├──────────────► Razorpay
   │
   ▼
POST /api/v1/payments/verify
   │
   ▼
Backend verifies HMAC-SHA256 signature
   │
   ▼
Payment = PAID
Order remains = PENDING
   │
   ▼
Outlet accepts

Critical Rule

A frontend payment-success callback is not sufficient.

Backend verification and Razorpay webhook processing are authoritative.

18. Webhooks

Webhook route:

POST /api/v1/payments/webhook/:outletSlug

Events include:

payment.captured
payment.failed
refund.processed

Webhook signature:

Read X-Razorpay-Signature

Verify HMAC-SHA256

Use the raw request body

Use the outlet's decrypted webhook secret

Webhook processing must be idempotent.

Duplicate webhook deliveries must not:

Create duplicate refunds

Duplicate notifications

Repeat payment state changes

Repeat other side effects

19. Refund Architecture

Automatic Refunds

Triggered by:

OUTLET_REJECT
OUTLET_CANCEL

Also applies when:

PENDING > 10 minutes

No-Refund Case

READY > pickup timeout

This is a student no-show.

Manual Refund

Super Admin can issue:

Full refund

Partial refund

Each refund is recorded with:

paymentId
amount
reason
gatewayRef
status
triggeredBy
createdAt

20. Realtime Architecture

Use Socket.IO 4.

Socket Rooms

Students:
user:<userId>

Outlet staff/admin:
outlet:<outletId>

Super Admin:
admin

Events

order:new
order:status:changed
notification:created
payment:confirmed
payment:failed

Critical Rule

Socket events are emitted after the related database transaction
commits.

The database remains authoritative if:

A socket disconnects

A user misses an event

The browser is closed

A network error occurs

The next REST request must return the current persisted state.

21. Notifications

Notifications are stored in PostgreSQL.

Fields include:

id
userId
type
payload
isRead
createdAt

Notification types include order/payment-related events.

V1 should prioritize in-app notifications, with email available as a
fallback channel.

22. Image Architecture

Use Cloudinary.

Upload flow:

Frontend
   │
   ▼
Backend signed-upload endpoint
   │
   ▼
Cloudinary
   │
   ▼
Image URL
   │
   ▼
MenuItem.imageUrl

The browser must never receive Cloudinary secret credentials.

Image upload requirements:

Validate MIME type

Maximum size: 5 MB

Backend-controlled upload process

23. Rate Limiting

Use express-rate-limit.

Suggested V1 limits:

General API:        100 requests/min/IP
Login:                5 requests/min/IP
Register:             3 requests/min/IP
Password reset:      10 requests/min/IP
Payment endpoints:   10 requests/min/user

Return:

HTTP 429
Retry-After

24. Security Stack

Required

bcrypt

JWT

httpOnly cookies

Secure cookies in production

SameSite configuration appropriate for deployment

Strict CORS

Helmet

Zod validation

express-rate-limit

HTTPS

Webhook signature verification

AES-256-GCM encrypted outlet credentials

Audit logs

Security Rules

Never:

Commit secrets

Log passwords

Log JWTs

Log payment credentials

Return Razorpay secrets from GET endpoints

Trust frontend authorization

Trust frontend payment success

Allow outlet-scoped cross-outlet queries

25. Testing Stack

Unit

Vitest

Test:

Business logic

Validation

Helpers

State transitions

Backend Integration

Vitest + Supertest

Use a separate test PostgreSQL database.

Frontend Integration

Vitest + MSW

Frontend tests mock APIs rather than calling the real backend.

E2E

Playwright

Critical flows:

Login

Student order

Payment

Pickup

Outlet operations

Admin operations

Accessibility

axe-core + Playwright

Realtime

Vitest + socket.io-client

Payment

Use Razorpay test mode for:

Success

Failure

Webhook

Refund

26. Test Targets

Target coverage:

Unit:          80% lines
Integration:   70% lines
Backend M4:    >=70% lines
Frontend M4:   >=60% lines

RBAC requirement:

Every protected endpoint should have at least one negative authorization
test.

Examples:

Student → admin endpoint → 403
Outlet A staff → Outlet B data → 403
Outlet staff → admin endpoint → 403
Unauthenticated → protected endpoint → 401
Super Admin → outlet operational action → 403

27. Performance Targets

API p95:          <300 ms
Key page load:    <2 seconds
Realtime emit:    ~200 ms after DB commit

Performance testing can use:

k6

Playwright HTML reporting

28. Deployment

Local

Frontend:  localhost:5173
Backend:   localhost:3001
Postgres:  localhost:5432

Staging

Frontend: Vercel preview/staging
Backend:  Render
Database: Neon staging branch

Production

Frontend: Vercel
Backend:  Render
Database: Neon production branch
Domain:   custom college domain when available

29. Environment Variables

Example:

DATABASE_URL=
PORT=3001
FRONTEND_URL=
JWT_SECRET=
OUTLET_CREDENTIALS_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

Razorpay outlet credentials should be stored encrypted in the database
rather than exposed as frontend environment variables.

.env must be gitignored.

.env.example contains names/placeholders only.

30. CI/CD

GitHub Actions runs on every pull request.

Pipeline:

Install Node 20 + pnpm
        ↓
pnpm install --frozen-lockfile
        ↓
Lint
        ↓
JSDoc/type checks where applicable
        ↓
Unit + integration tests
        ↓
Build frontend/backend
        ↓
Lighthouse CI on preview

Main branch merge:

Deploy staging

Production:

Manual GitHub Actions workflow_dispatch

31. Database Migration & Backup Strategy

Prisma migrations are the source of truth.

Development:

prisma migrate dev

Deployment:

prisma migrate deploy

Never manually modify production tables outside the migration workflow.

Backups:

Neon automated daily backup

Additional pg_dump backup where configured

Restore test to staging

Weekly restore verification

32. Monitoring

Errors

Sentry

Uptime

UptimeRobot

Monitor:

/health

and key frontend URLs.

Performance

Vercel Analytics

Render metrics

Logs

Structured backend logging with Pino.

Logs must minimize sensitive information.

33. Recommended Backend API Groups

/api/v1/auth/*
/api/v1/students/*
/api/v1/outlets/*
/api/v1/menu/*
/api/v1/cart/*
/api/v1/orders/*
/api/v1/payments/*
/api/v1/notifications/*
/api/v1/admin/*

Payment webhook:

/api/v1/payments/webhook/:outletSlug

34. Documentation Required in Repository

README.md
docs/design-system.md
docs/erd.png
docs/api/m1-contracts.md
docs/api/m2-contracts.md
docs/api/m3-contracts.md
docs/api/m4-contracts.md
docs/runbook.md
docs/outlet-runbook.md
docs/plans/

API contract documents should define:

HTTP method

Path

Authentication requirement

Request schema

Response schema

Error responses

Side effects

Required tests

35. Technical Definition of Done

The technical implementation is ready for production when:

Frontend and backend build successfully.

Prisma migrations are reproducible.

All protected routes enforce RBAC.

Outlet isolation tests pass.

Payment verification is server-side.

Webhook verification is implemented.

Webhooks are idempotent.

Razorpay credentials are encrypted.

Secrets are absent from Git.

Realtime events occur after DB commit.

Automated cancellation/refund jobs work.

Pickup verification is server-side.

Required unit/integration/E2E tests pass.

Accessibility checks pass.

Production CORS is restricted.

HTTPS is enabled.

Monitoring is active.

Backups and restore procedures are tested.

CI/CD pipeline is working.

36. Final Stack Summary

Frontend
  React 18
  Vite
  JavaScript/JSX
  React Router 6
  Tailwind CSS
  shadcn/ui
  TanStack Query v5
  Recharts

Backend
  Node.js 20
  Express 4
  JavaScript
  REST/JSON
  Socket.IO 4
  JWT
  bcrypt
  Zod

Database
  PostgreSQL 15
  Prisma 5

External Services
  Razorpay
  Cloudinary
  Sentry
  UptimeRobot

Testing
  Vitest
  Supertest
  Playwright
  MSW
  axe-core
  socket.io-client
  k6

DevOps
  Git
  GitHub
  GitHub Actions
  Vercel
  Render/Railway
  Neon/Supabase

Technical principle: Keep the system simple and modular for V1, with
the backend enforcing security and business rules, PostgreSQL acting as
the source of truth, and external services handling payments, images,
monitoring, and hosting.