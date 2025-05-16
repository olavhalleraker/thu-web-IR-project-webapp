# 🔍 BiasSearch WebApp - Tsinghua Web Information Retrieval Project

This repository ([`thu-web-IR-project-thu_webapp`](https://github.com/olavhalleraker/thu-web-IR-project-webapp)) provides the frontend web application for the **BiasSearch** project, an AI-powered news article search engine that retrieves and classifies articles **in favor**, **against**, or **neutral** with respect to the user's query. It is developed for the **Web Information Retrieval** course at **Tsinghua University**.

## Key Features
-  🔎 **Search Interface:** Users can input a query to retrieve relevant news articles.  
- 🧠 **Stance Visualization:** Articles are automatically classified as in favor, against, or neutral using backend AI models and displayed accordingly. 
- 📱 **Responsive Design:** Optimized for both desktop and mobile experiences.
- 🔗 **API Communication:** Connects seamlessly to the backend for real-time data fetching and classification. 

This frontend connects with the backend API (hosted in the [`thu-web-IR-project-api repository`](https://github.com/olavhalleraker/thu-web-IR-project-api)) to present search results and their stance classifications in an interactive, mobile-responsive UI.


---

## 📁 Repository Structure
 ```
 thu_webapp/
│
├── app/                     # Next.js 13+ app directory (routing, layout, pages)
│   ├── docs/                # In-app documentation pages
│   │   ├── getting-started/
│   │   │   └── page.tsx     # Introductory guide or onboarding doc
│   │   ├── layout.tsx       # Layout for documentation pages
│   │   └── page.tsx         # Docs landing page
│   ├── search/              # Page to display search results
│   │   └── page.tsx         # Renders search result page with classification
│   ├── actions.ts           # Handles API communication: search & classify
│   ├── layout.tsx           # Root layout of the application
│   ├── page.tsx             # Home page (query input interface)
│   ├── globals.css          # Global styles
│   └── favicon.ico          # App icon
│
├── components/              # React components
│   ├── home/                # Components for the homepage (e.g. search input)
│   ├── search/              # Components for rendering search result cards
│   └── ui/                  # Reusable UI components (e.g. buttons, loaders)
│   └── types.ts             # Shared TypeScript types (e.g. `doc`, `stance`)
│
├── hooks/
│   └── use-mobile.ts        # Custom hook for detecting mobile devices
│
├── lib/                     # Utility functions 
├── public/                  # Static files
├── .env                     # Environment variables for the API
├── architecture.txt         # Description of system architecture
├── components.json          # Used by UI libraries or generators
├── envConfig.ts             # Handles environment-specific logic 
├── postcss.config.mjs       # CSS processing config
├── eslint.config.mjs        # Linting rules
├── tsconfig.json            # TypeScript config
├── package.json             # Project dependencies and scripts
└── README.md                # You're reading this!

 ```

 ---

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
yarn install

```
### 2 Configure environment variables   
Create a .env file and set the backend API URL: 
```bash
# Based on the current setup confidguration of thu-web-IR-project-api repository

SEARCH_API_URL = http://0.0.0.0:8000
```

### 3. Run the web in development mode
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 4. Run the web for deployment 
```bash
npm run build
npm start
```

---

## 🛠️ Technologies used

- Next.js 13 (App Router) – Modern framework for React apps, using the app/ directory.
- React + TypeScript – For building interactive, type-safe UIs.
- next/font with Geist – Optimized font loading using Vercel’s Geist typeface.
- Custom Hooks – e.g. useIsMobile for responsive behavior.
- Global CSS – App-wide styling via globals.css.
- .env Config – Manages environment variables like API URLs.
 -Vercel – Recommended platform for deployment.

**Learn More**

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

**Deploy on Vercel**

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---
**Related repositories**  
[`thu-web-IR-project-api repository`](https://github.com/olavhalleraker/thu-web-IR-project-api)  
[`thu-web-IR-project-crawler repository`](https://github.com/olavhalleraker/thu-web-IR-project-crawler)

Olav Larsen Halleraker  
Guillermo Rodrigo Pérez  
Project for Web Information Retrieval — Tsinghua University 2024/2025

