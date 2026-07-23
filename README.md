# Elevate App E-commerce Frontend Architecture - E-Commerce Client & Admin Suite

A modern, high-performance, and feature-rich e-commerce web application built with a modern React stack. This frontend handles sophisticated user interactions, state management, role-based access control with dual dashboards, and AI-powered utilities.

---

## 🚀 Tech Stack & Core Technologies

- **Framework:** React 18+ powered by **Vite** for blazing-fast HMR and optimized production builds.
- **Language:** TypeScript for strict type safety and robust component contracts.
- **State Management:** Redux Toolkit (RTK) for predictable global state handling (authentication, cart, wishlist, and asynchronous actions).
- **Routing:** React Router v6 supporting nested routes, dynamic parameters, and protected layouts.
- **Styling:** Custom modular CSS architecture with design tokens and responsive layouts.

---

## 🌟 Key Features & Architecture

### 1. Dual Dashboard System (Role-Based Access Control)

#### Customer Experience
- Tailored browsing experience.
- Interactive product galleries.
- Dynamic size selector.
- Wishlist management.
- Secure checkout workflow.

#### Admin Dashboard Suite
- Dedicated administrative views (`/admin`, `/admin/orders`).
- Protected routes with strict role-based permissions.
- Automatic redirection from customer transactional flows.
- Efficient management of products, orders, and store operations.

---

### 2. AI-Powered Size Advisor

Integrated **AI Size Advisor Modal** (`SizeAdvisorModal.tsx`) directly into the product detail page, providing intelligent size recommendations based on product context.

---

### 3. Dynamic Product Detail & Related Catalog

- Optimized multi-image product gallery.
- Rich product information display.
- Backend-powered relational product mapping.
- Dynamic **"You May Also Like"** recommendation grid.

---

### 4. Robust Order Tracking & Profile Management

The **Profile** (`Profile.tsx`) section provides:

- Account information.
- User roles and privileges.
- Shipping addresses.
- Complete order history.
- Status indicators:
  - ✅ Paid / Pending
  - 📦 Processing / Delivered

---

## 📦 Installed Libraries & Tooling

✅ Routing & Navigation: react-router-dom

✅ State & Data Layer: @reduxjs/toolkit, react-redux

✅ Payment UI & Credit Cards: react-credit-cards-2 (Interactive, responsive credit card visualization component reflecting real-time inputs during checkout).

✅ Notifications: react-hot-toast for streamlined, custom-styled system feedback toasts.

✅ UI Performance & Loading: boneyard-js for semantic skeleton-screen loaders mapped directly to component structures.

---

## 📂 Project Structure Overview

```text
src/
├── app/
├── assets/
├── components/
│   ├── common/
│   ├── layout/
│   ├── product/
│   └── ui/
├── features/
│   ├── auth/
│   ├── cart/
│   ├── wishlist/
│   ├── orders/
│   └── products/
├── hooks/
├── layouts/
├── pages/
│   ├── admin/
│   ├── customer/
│   └── auth/
├── routes/
├── services/
├── store/
├── types/
├── utils/
└── main.tsx
```

---

## ✨ Highlights

- ⚡ React 18 + Vite performance
- 🔒 Role-Based Access Control (RBAC)
- 🤖 AI-powered Size Advisor
- 🛒 Full e-commerce customer experience
- 📦 Complete order management
- ❤️ Wishlist & shopping cart
- 🔥 Redux Toolkit architecture
- 📱 Fully responsive UI
- 🎯 TypeScript-first development
- 🚀 Optimized production build
