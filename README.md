# Cosmetics E-Commerce Platform - Client UI

## 📌 Overview
A production-grade Single Page Application (SPA) built to power a real-world cosmetics retail business. This frontend delivers a seamless shopping experience for customers while providing a secure, feature-rich administrative dashboard for inventory and order management.

## ⚙️ System Architecture & Features
Based on the repository structure, this application implements advanced frontend patterns:
* **Secure Admin Panel:** Dedicated, route-guarded administration modules for managing products, categories, and viewing detailed order histories (`auth-guard`, `admin` components).
* **Complete Checkout Flow:** Integrated cart management, dynamic product filtering, and a streamlined checkout process (`cart`, `checkout`, `product-shop` components).
* **Production-Ready Integrations:** Native implementation of SEO optimization, Google Analytics, and Google Ads tracking services to drive marketing decisions (`seo.ts`, `googleAnalyticsService.ts`).
* **API Security:** Custom HTTP Interceptors for seamless authentication token attachment on every backend request (`auth-interceptor.ts`).
* **Customer Engagement:** Built-in WhatsApp integration for direct customer support and product reviews system (`whatsapp-button`, `reviews`).

## 🛠️ Tech Stack
* **Framework:** Angular
* **Language:** TypeScript
* **Styling:** SCSS (Modular architecture with shared variables)
* **Deployment:** Pre-configured for Vercel deployment (`vercel.json`)

## 🚀 How to Run Locally

### Prerequisites
* Node.js (v18+)
* Angular CLI (`npm install -g @angular/cli`)

### Setup
1. Clone the repository.
2. Install dependencies by running `npm install`.
3. Run the development server with `ng serve`.
4. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
