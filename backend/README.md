# Blog Backend

A robust **Node.js + Express** API powering the Blog system, using **Prisma ORM** for seamless PostgreSQL database management.

## 🛠️ Setup & Installation

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Database Configuration
Ensure you have a **PostgreSQL** instance running. Create a `.env` file and add your connection string:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/blog_db"
ex : DATABASE_URL="postgresql://postgres:root@127.0.0.1:5432/blog?schema=public"
```

### 3. Prisma & Seed Data Setup
I have provided a consolidated command to set up the database schema, generate the Prisma client, and seed the initial blog posts:
```bash
npm run db:setup
```
*This command runs: generate -> db push -> db seed.*

### 4. Start the Server
```bash
npm run dev
```

The backend will be running at `http://localhost:5000`.

---
Author: **Parth Khandla**
