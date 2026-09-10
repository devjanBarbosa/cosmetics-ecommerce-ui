# Cosmetics E-Commerce Platform - Client UI

## 📌 Overview
A production-grade Single Page Application (SPA) built to power a real-world cosmetics retail business. This frontend delivers a seamless shopping experience for customers while providing a secure, feature-rich administrative dashboard for inventory and order management.

## ⚙️ System Architecture & Features
Based on the repository structure, this application implements advanced frontend patterns:
* **Secure Admin Panel:** Dedicated, route-guarded administration modules for managing products, categories, and viewing detailed order histories (`auth-guard`, `admin` components)[cite: 2].
* **Complete Checkout Flow:** Integrated cart management, dynamic product filtering, and a streamlined checkout process (`cart`, `checkout`, `product-shop` components)[cite: 2].
* **Production-Ready Integrations:** Native implementation of SEO optimization, Google Analytics, and Google Ads tracking services to drive marketing decisions (`seo.ts`, `googleAnalyticsService.ts`)[cite: 2].
* **API Security:** Custom HTTP Interceptors for seamless authentication token attachment on every backend request (`auth-interceptor.ts`)[cite: 2].
* **Customer Engagement:** Built-in WhatsApp integration for direct customer support and product reviews system (`whatsapp-button`, `reviews`)[cite: 2].

## 🛠️ Tech Stack
* **Framework:** Angular[cite: 2]
* **Language:** TypeScript[cite: 2]
* **Styling:** SCSS (Modular architecture with shared variables)[cite: 2]
* **Deployment:** Pre-configured for Vercel deployment (`vercel.json`)[cite: 2]

## 🚀 How to Run Locally

### Prerequisites
* Node.js (v18+)
* Angular CLI (`npm install -g @angular/cli`)

### Setup
1. Clone the repository.
2. Install dependencies by running `npm install`[cite: 2].
3. Run the development server with `ng serve`.
4. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
