Campus Food --- Product Requirements Document (PRD)

Version: V1
Status: Draft
Date: 2026-09-16
Product: Campus Food
Platform: Responsive Web Application

1. Product Overview

Campus Food is a campus-only prepaid food ordering platform for a
single college. Verified students can discover campus food outlets,
browse menus, customize items, place prepaid orders, track preparation
in real time, and collect food using a pickup code/QR.

Outlet staff and outlet admins manage incoming orders, preparation,
menus, availability, operating hours, and outlet operations. A Super
Admin manages students, outlets, orders, payments, reports, and
platform-level administration.

V1 is designed for one college and four outlets.

The product's core principles are:

Prepaid first

Campus pickup first

Always make order status clear

Optimize outlet operations for speed

Build reusable components

Security belongs on the backend

Database is the source of truth

Build and test incrementally

2. Problem Statement

Students need a simple way to:

Discover food available across campus outlets

See menus, prices, availability, preparation estimates, and food
details

Order without waiting at the counter

Pay online before preparation

Know the current status of their order

Collect food quickly using a pickup code/QR

Outlets need a way to:

Receive incoming orders

Accept or reject orders

Communicate preparation estimates

Manage food availability and menus

Move orders through preparation states

Verify pickup

Monitor revenue and operational analytics

Administrators need centralized visibility and control over students,
outlets, orders, payments, and reports.

3. Target Users

3.1 Student

A verified student who:

Registers using the college email domain

Browses outlets and menus

Adds food to a cart

Pays online

Tracks orders

Uses a pickup code/QR to collect food

Views order history and notifications

3.2 Outlet Staff

Operational staff who:

View incoming orders for their outlet

Accept or reject orders

Set preparation estimates

Move orders through preparation

Mark orders ready/completed

Toggle menu-item availability

View outlet analytics in read-only mode

3.3 Outlet Admin

The manager/owner of an outlet who can:

Do all outlet operational tasks

Create/edit/delete menu categories and items

Change prices and item details

Manage outlet profile, hours, and status

Invite outlet staff

Configure the outlet's Razorpay credentials

View outlet analytics

3.4 Super Admin

The platform administrator who can:

Manage students

Approve/suspend outlets

View all orders and payments

View platform-wide reports

Export reports

Issue manual refunds

Manage platform-level administration

4. V1 Scope

In Scope

Single-campus ordering

Verified student accounts

Four campus outlets

Outlet discovery

Search, filtering, and sorting

Menu browsing

Food details

Food customization

Server-side cart

Checkout

Online prepaid payments

Razorpay per-outlet accounts

Order lifecycle management

Real-time order updates

Pickup code/QR

Order history

Reorder

Student profile/settings

Outlet dashboard

Outlet order management

Menu management

Outlet settings

Outlet analytics

Notifications

Super Admin dashboard

Student/outlet/order/payment management

Basic reports and CSV export

Responsive web experience

Accessibility and quality checks

Security, RBAC, audit logging, testing, deployment, monitoring, and
backups

Explicitly Out of Scope for V1

Home delivery

Delivery partners

Cash on Delivery

Campus wallet/stored value

Coupons

Loyalty programs

AI recommendations

Inventory prediction

Multiple campuses

Subscriptions/meal plans

Outlet self-onboarding

Platform-collected payments

Razorpay Route/marketplace auto-split

Native Android/iOS apps

Social likes/follows/photo reviews

Automated student refund requests

Student-initiated order cancellation

5. Core User Journey

Student Order Flow

Student registers

Student verifies college email

Student logs in

Student discovers an outlet

Student browses the menu

Student opens food details

Student selects customization and quantity

Student adds food to cart

Student reviews cart

Student reaches checkout

Student acknowledges the no-cancellation rule

Student pays online

Backend verifies payment

Order remains PENDING until outlet accepts

Outlet accepts and provides preparation estimate

Outlet moves order to PREPARING

Outlet marks order READY

Student receives real-time update

Student shows pickup code/QR

Outlet verifies pickup

Order becomes COMPLETED

Student can view the completed order in history and reorder it later

6. Order State Machine

Normal Flow

PENDING → ACCEPTED → PREPARING → READY → COMPLETED

Rejection/Cancellation Flow

PENDING → REJECTED --- outlet rejects; full automatic refund

PENDING → CANCELLED --- automatic cancellation after 10 minutes;
full automatic refund

ACCEPTED → CANCELLED --- outlet cancellation before READY; full
automatic refund

PREPARING → CANCELLED --- outlet cancellation before READY; full
automatic refund

READY → CANCELLED --- pickup timeout/no-show; no refund

Terminal states:

REJECTED

CANCELLED

COMPLETED

Invalid state transitions must be rejected by the backend with HTTP 409.

7. Cancellation & Refund Policy

There is no student-initiated cancellation in V1.

Once payment is captured, the order is committed. The student cannot
cancel the order or request a refund through the app.

For changes or cancellation, the student must contact the outlet
directly.

The tracking screen must clearly display:

"Order committed --- for changes, contact the outlet directly"

and the outlet's phone number.

Refund Cases

Situation                           Refund

Outlet rejects PENDING order        Full automatic refund

Outlet cancels before READY         Full automatic refund

PENDING order exceeds 10 minutes    Full automatic refund
without outlet response

READY order exceeds pickup window   No refund

COMPLETED order                     No automatic refund

Super Admin edge-case refund        Manual full/partial refund

The default pickup timeout is 30 minutes and can be configured per
outlet.

8. Payment Requirements

Each outlet owns and operates its own Razorpay account.

The platform does not collect or hold outlet money.

Payment Flow

Student starts checkout

Backend creates internal Order + Payment

Backend uses the selected outlet's encrypted Razorpay credentials

Backend creates the Razorpay order

Frontend opens Razorpay Checkout

Student pays

Frontend sends payment details to backend

Backend verifies the Razorpay signature

Razorpay webhooks provide asynchronous confirmation/backup

Payment is recorded

Order remains PENDING until outlet acceptance

The frontend payment-success callback must never be treated as the
source of truth.

Webhook processing must be idempotent so duplicate Razorpay webhook
deliveries do not create duplicate side effects.

9. Functional Requirements

FR-01 --- Registration & Verification

Students can register using the approved college email domain.

Non-college emails cannot register as students.

Student accounts require verification.

Outlet staff/admin accounts are created through invitation.

Account status supports PENDING, ACTIVE, and SUSPENDED.

FR-02 --- Authentication

Login

Logout

Refresh session

Protected routes

Role-based route access

Password reset/security flow

FR-03 --- Outlet Discovery

Students can:

View available outlets

Search outlets

Filter outlets

Sort outlets

View outlet status

View outlet hours

Open an outlet menu

FR-04 --- Menu

Students can:

Browse categories

View food items

See prices

See availability

View images

View descriptions

View dietary information

Configure supported customizations

Outlet admins can:

Create categories

Edit categories

Delete categories

Create menu items

Edit menu items

Delete menu items

Change prices

Upload images

Configure preparation time

Configure availability

Outlet staff can only toggle item availability.

FR-05 --- Cart

One active cart per student per outlet

Cart is stored server-side

Cart survives refresh

Cart survives login on another device

Quantity can be updated

Items can be removed

Customization selections are preserved

Price totals are calculated server-side

FR-06 --- Checkout

Checkout displays:

Outlet

Items

Quantities

Customizations

Price breakdown

Total

Preparation estimate

Payment method

The student must acknowledge the no-cancellation rule before payment.

FR-07 --- Orders

Students can:

View active orders

View order details

Track status

View pickup code/QR

View completed orders

View cancelled/rejected orders

Reorder eligible past orders

Outlet staff/admin can operate orders according to their permissions.

FR-08 --- Pickup

Each order receives a unique 6-character alphanumeric pickup code.

QR representation is displayed to the student.

Pickup verification occurs server-side.

Successful verification changes READY → COMPLETED.

FR-09 --- Realtime Updates

Students receive realtime updates for:

Payment confirmation

Order accepted

Order rejected

Preparing

Ready

Completed/cancelled

Outlet users receive realtime new-order and relevant payment/order
events.

If realtime is missed, REST API data remains authoritative.

FR-10 --- Notifications

Notifications have read/unread state.

Notifications are persisted.

Relevant order/payment events create notifications.

In-app notifications are required for V1.

Email can be used as a fallback notification channel.

FR-11 --- Outlet Operations

Outlet users can:

View operational dashboard

View incoming orders

Accept/reject orders

Set preparation estimate

Mark preparing

Mark ready

Verify pickup

Mark completed

Cancel according to role/state rules

View outlet analytics

FR-12 --- Admin

Super Admin can:

View platform dashboard

Verify/suspend students

Approve/suspend outlets

View all orders

View all payments

View reports

Export CSV reports

Issue manual refunds

Review audit activity

10. RBAC Requirements

Every backend route must enforce authorization independently of the
frontend.

Student

Can:

Browse outlets

Browse menus

Manage own cart

Place/pay for orders

View own orders

View own notifications

Manage own profile

Cannot:

Access outlet operations

Access admin APIs

Cancel orders from the student API

Access another user's data

Outlet Staff

Can:

Operate orders for their own outlet

Toggle item availability

View own outlet operational analytics

Cannot:

Change prices

Create/delete menu items

Invite staff

Access another outlet's data

Access platform admin APIs

Outlet Admin

Can:

Perform outlet staff operations

Manage own outlet menu

Manage prices/details

Manage outlet settings/hours/status

Invite staff

Manage own Razorpay configuration

View own analytics

Super Admin

Can:

Manage platform users

Manage outlets

View all orders/payments

Export reports

Issue manual refunds

Perform platform-level administration

Super Admin does not operate outlet orders.

11. Data Requirements

The detailed V1 design uses these core entities:

User

StudentProfile

Campus

Outlet

OutletStaff

OperatingHours

MenuCategory

MenuItem

CustomizationGroup

CustomizationOption

Cart

CartItem

Order

OrderItem

Payment

Refund

Notification

RefreshToken

AuditLog

Order items and customization data must preserve purchase-time snapshots
so later menu changes do not alter historical orders.

12. Key Business Rules

V1 supports exactly one campus.

V1 launches with four outlets.

A cart belongs to one outlet.

Payment is required before preparation.

Payment status and order status are separate.

Payment success does not automatically accept an order.

The database is the source of truth.

Realtime events are emitted only after database transactions commit.

Students cannot cancel orders through the app in V1.

Outlet A staff must never access Outlet B data.

Outlet-scoped queries must enforce outlet filtering.

Payment webhooks must be signature-verified and idempotent.

Razorpay credentials must never be exposed through API responses.

Pickup must be server-side verified.

Production secrets must never be committed to Git.

13. Main Screens

Student

Login

Register

Verify

Home

Outlet Listing

Outlet Menu

Food Details

Cart

Checkout

Payment Processing

Confirmation

Live Order Tracking

Pickup Code/QR

Order History

Profile

Outlet

Dashboard

Incoming Orders

Order Details

Menu Management

Menu Item Form

Outlet Settings

Analytics

Admin

Dashboard

Student Management

Outlet Management

Order Management

Payment Management

Reports

14. Success / Acceptance Criteria

The V1 product is ready for launch when:

All four roles can authenticate and reach role-specific areas.

Unauthorized API access returns 401/403 as appropriate.

Student → menu → cart → payment → pickup works end-to-end.

Real Razorpay test-mode payment works independently for all four
outlets.

Webhook processing is idempotent.

Outlet rejection/cancellation triggers the correct refund.

Pickup timeout causes cancellation without refund.

Pickup code/QR verification works server-side.

Realtime order events work after database commits.

Outlet-scoped RBAC tests pass.

Admin can view and export required reports.

Responsive layouts work at mobile, tablet, and desktop sizes.

Accessibility checks pass with no key-page axe violations.

Backend and frontend test targets are met.

Production backups and restore procedures are tested.

Monitoring is active.

Pilot completes with all four outlets operational.

15. Non-Functional Requirements

Performance

Target API p95: <300 ms

Target key-page p95/load performance: <2 seconds

Realtime events should be emitted within approximately 200 ms of the
relevant database commit

Security

bcrypt password hashing

Short-lived access tokens

Rotating refresh tokens

httpOnly secure cookies

Strict CORS

Helmet security headers

Zod validation

Rate limiting

Payment webhook signature verification

Encrypted outlet payment credentials

No secrets in source control

Minimal sensitive information in logs

Accessibility

WCAG AA contrast

Visible keyboard focus states

Do not rely on color alone

Responsive layouts

Accessible forms and feedback states

Reliability

Database remains authoritative

Webhook handlers are idempotent

Daily backups

Restore testing

Error monitoring

Uptime monitoring

16. V1 Milestones

M1 --- Foundation + Auth

Repository, architecture, database, authentication, RBAC, design system.

M2 --- Vertical Order Slice

Outlet/menu browsing, cart, order state machine, pickup, realtime, stub
payment.

M3 --- Real Payments + Outlet Operations

Razorpay, refunds, webhooks, menu CRUD, images, analytics.

M4 --- Admin + Polish + Pilot Preparation

Admin dashboards, reports, responsive polish, accessibility, testing,
security hardening.

M5 --- Deployment + Pilot + Launch

Production deployment, four-outlet onboarding, pilot orders, monitoring,
fixes, launch.

Target overall timeline: approximately 12--14 weeks plus a two-week
pilot buffer.

17. V1 Exclusions / Future Ideas

Potential V2+ features include:

Student cancellation/self-service refund requests

In-app outlet chat

Multiple campuses

Native mobile applications

Delivery

Campus wallet

Coupons and loyalty

Social features

AI recommendations

Inventory intelligence

Subscriptions/meal plans

Scaled rate limiting with Redis

Additional payment providers

18. Product Definition

Campus Food V1 is a single-campus, four-outlet, prepaid ordering
system focused on fast campus pickup, reliable order state tracking,
outlet operations, secure payments, and clear role-based access.