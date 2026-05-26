# 🌌 Amir Ali - Modern Glassmorphic AI Portfolio & Admin Dashboard

Welcome to the repository of **Amir Ali's Portfolio** — a high-performance, visually stunning developer portfolio tailored for Data Science, Machine Learning, and AI specialists. 

Built using a premium glassmorphic visual aesthetic, this website features interactive animations, a custom technical skills landscape, dynamic experience timelines, a serverless contact inbox, and a secure administration dashboard to manage portfolio contents in real time.

---

## 🚀 Key Features

* **💎 Premium Glassmorphic UI**: Sleek dark mode, colorful blur gradients, subtle glowing hover borders, and fluid animations.
* **📈 Dynamic Stats & Experience**: Fully configurable timeline blocks that automatically adapt their color highlights (Cyan to Magenta) to align with the vertical path line.
* **⚡ Admin Dashboard Panel**: A built-in panel to manage certifications, skills (as comma-separated lists), work experiences, and featured projects on the fly.
* **🔃 List Reordering**: Seamlessly move work experience items and portfolio projects up or down using (▲ / ▼) controls in the admin dashboard.
* **🔗 Projects Title Links**: Projects link directly to their GitHub repositories via clickable titles with smooth visual hover effects.
* **✉️ Serverless Contact Form**: Direct visitor messaging connected to a serverless backend that logs inquiries in real time.
* **🔒 Hardened Authentication**: Secure admin logins using basic authorization checks, session-based state management (`sessionStorage`), and auto-expiration on browser tab closing.
* **☁️ Serverless Data Sync (Vercel KV)**: Uses **Vercel KV (Redis)** in production and seamlessly falls back to local JSON storage (`api_local_db.json`) during development.

---

## 🛠️ Technology Stack

* **Frontend**: React (v19) + Vite (v8)
* **Styling**: Vanilla CSS with HSL-tailored variables
* **Backend**: Vercel Serverless Functions (Node.js)
* **Database**: Vercel KV (Redis) / Local File System Storage

---

## ⚙️ Security Measures

To protect your site and data, several security measures have been configured:

1. **Production Lock on Default Credentials**: Hardcoded baseline admin login credentials are **blocked in production**. The serverless backend will return a `500 Server Error` if custom credentials are not set in the environment variables, preventing credential-stuffing attacks.
2. **Session Security (`sessionStorage`)**: Authentication sessions are stored in `sessionStorage` rather than `localStorage`. Closing the browser tab or exiting the dashboard instantly destroys the session, requiring re-login on the next visit.
3. **Payload & Input Hardening**: The `/api/contact` form limits inputs strictly (`name` max 100 chars, `email` max 150 chars, `message` max 3000 chars) and validates email regex to prevent database bloat, DoS, and payload attacks.
4. **Git Protection (`.gitignore`)**: Secrets, environment files (`.env*`), local databases (`api_local_db.json`), and build assets (`dist/`, `node_modules/`) are strictly ignored so they are never leaked to public repositories.

---

## 💻 Local Development Setup

To run this project locally without any cloud database configuration:

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd my-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   *Note: In development mode, all admin panel updates and contact messages are automatically written to a local file at the root named `api_local_db.json`. You do not need a Redis connection to test features locally.*

4. **Access the Admin Panel**:
   * Scroll to the bottom footer of your local website and click the **🔑 Admin Login** button.
   * **Default Dev Username**: `Admin_Amir_Secure_9921_DS`
   * **Default Dev Password**: `P@ss_#$AmirTorad_2026_!@#_SecureVision_ML_AI`

---

## ☁️ Production Deployment (Vercel)

This application is fully optimized for one-click deployment on **Vercel**:

### Step 1: Deploy to Vercel
1. Import your portfolio repository into Vercel.
2. Click **Deploy**.

### Step 2: Configure Environment Variables
To enable secure admin logins and backend functionality, go to **Project Settings > Environment Variables** on Vercel and add:

* `ADMIN_USERNAME`: Your custom secret admin login username.
* `ADMIN_PASSWORD`: Your custom secret admin login password.

### Step 3: Link Vercel KV (Redis)
1. In your Vercel Project Dashboard, navigate to the **Storage** tab.
2. Click **Create Database** and select **KV (Redis)**.
3. Once created, click **Connect** to link the database to your project. This automatically generates the required environment variables (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc.).
4. Redeploy your project to apply the database changes.

Your portfolio is now fully secure, live, and editable dynamically from anywhere!
