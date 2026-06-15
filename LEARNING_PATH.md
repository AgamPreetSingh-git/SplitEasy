# SplitEasy - Learning Path for Beginners

Since you're learning as you go, here's a structured learning path to build SplitEasy professionally.

---

## 📚 Pre-Coding Prerequisites

### Learn These Concepts First

**1. JavaScript Fundamentals (2-3 days)**
- Variables, data types, operators
- Functions and arrow functions
- Objects and arrays
- ES6 features (const/let, destructuring, spread operator)
- Promises and async/await

**2. Git & GitHub (1 day)**
- Clone, commit, push
- Branching
- Pull requests
- .gitignore

**3. Command Line Basics (1 day)**
- Navigation (cd, ls, pwd)
- Creating/deleting files and folders
- Running commands (npm, node)

**Resources:**
- JavaScript: freeCodeCamp on YouTube
- Git: Atlassian tutorials
- Command Line: Codecademy

---

## 🛠️ Week 1: Backend Foundation

### Goal: Understand Node.js + Express + PostgreSQL

**Day 1-2: Node.js Basics**
- What is Node.js?
- npm (Node Package Manager)
- Creating a simple Node.js server
- Understanding require/import

**Day 3: Express Framework**
- Setting up Express app
- Routes and endpoints
- Request/response handling
- Middleware basics

**Day 4: PostgreSQL & Database**
- What is a relational database?
- Installing PostgreSQL locally
- Creating databases and tables
- Basic SQL queries (SELECT, INSERT, UPDATE, DELETE)

**Day 5-6: Connect Database to Node.js**
- Installing Prisma ORM
- Writing database schema
- Running migrations
- Querying database from Node.js code

**Day 7: Auth Basics**
- Password hashing with bcryptjs
- JWT (JSON Web Tokens)
- Creating user registration endpoint
- Creating user login endpoint

**Deliverable:** Working backend with register/login endpoints

---

## 🎨 Week 2-3: Frontend Foundation

### Goal: Build UI with React/Next.js

**Day 1-2: React Basics**
- Components (functional components)
- JSX syntax
- Props and state (useState hook)
- Component lifecycle

**Day 3-4: Next.js Setup**
- Why Next.js over React?
- File-based routing
- Pages vs components
- Building pages

**Day 5-6: Styling**
- Tailwind CSS (utility-first styling)
- Creating components with Tailwind
- Responsive design
- Dark mode (optional)

**Day 7: API Integration**
- Making HTTP requests (axios/fetch)
- Connecting to backend
- Handling API responses
- Error handling

**Deliverable:** Login/Register page connected to backend

---

## 💾 Week 4: Core Features (Backend)

### Goal: Build main API endpoints

**Day 1-2: Group Management**
- Create group endpoint
- Get groups endpoint
- Add members to group endpoint
- Delete group endpoint

**Day 3-4: Expense Management**
- Add expense endpoint
- Get expenses endpoint
- Edit expense endpoint
- Delete expense endpoint

**Day 5-6: Settlement Logic**
- Calculate who owes whom
- Get settlement summary endpoint
- Mark expense as settled

**Day 7: Testing**
- Test endpoints with Postman
- Write basic tests

**Deliverable:** All API endpoints working with database

---

## 🖥️ Week 5: Core Features (Frontend)

### Goal: Build main UI components

**Day 1-2: Dashboard**
- Show user's groups
- Create group form
- Join group form

**Day 3-4: Group Management UI**
- View group members
- Show balance summary
- View settlement details

**Day 5-6: Expense Management UI**
- Add expense form
- List expenses
- Edit/delete expense UI

**Day 7: Polish & Testing**
- Test all features
- Fix bugs
- Check mobile responsiveness

**Deliverable:** Full working frontend connected to backend

---

## ⚡ Week 6: Real-Time Updates

### Goal: Make data update in real-time

**Day 1-2: WebSockets or Server-Sent Events**
- Understand real-time communication
- Implement real-time updates
- Update UI when expenses change

**Day 3-4: Notifications**
- Real-time settlement reminders
- Update notifications
- UI feedback for actions

**Day 5-7: Optimization & Testing**
- Test real-time features
- Optimize performance
- Load testing

**Deliverable:** Real-time updates working across multiple users

---

## 📦 Week 7: Deployment

### Goal: Deploy to production

**Day 1-2: Environment Setup**
- Production environment variables
- Database on Railway
- Backend deployment to Railway

**Day 3-4: Frontend Deployment**
- Deploy frontend to Vercel
- Domain setup (optional)
- HTTPS configuration

**Day 5-6: CI/CD Automation**
- GitHub Actions setup
- Automatic deployment on push
- Environment-specific configurations

**Day 7: Testing & Documentation**
- Test deployed app
- Update README with live URLs
- Create deployment guide

**Deliverable:** Live, deployed app at production URLs

---

## 📊 Learning Resources

### Backend
- **Node.js Official Docs:** https://nodejs.org/docs/
- **Express Guide:** https://expressjs.com/
- **Prisma Docs:** https://www.prisma.io/docs/
- **PostgreSQL Tutorial:** https://www.postgresql.org/docs/
- **JWT Explained:** https://jwt.io/introduction

### Frontend
- **React Official:** https://react.dev/
- **Next.js Docs:** https://nextjs.org/docs/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs/

### Full-Stack
- **freeCodeCamp (YouTube):** Full-stack tutorials
- **The Net Ninja (YouTube):** Node, React, Next.js
- **Traversy Media:** Web development tutorials

---

## 🎯 Key Concepts to Understand

As you learn, focus on understanding these (not just memorizing):

1. **HTTP & REST APIs**
   - What are request methods? (GET, POST, PUT, DELETE)
   - What are status codes? (200, 201, 400, 404, 500)
   - How do APIs communicate?

2. **Databases**
   - Why use databases instead of files?
   - What are relationships between tables?
   - Why normalize data?

3. **Authentication**
   - Why hash passwords?
   - How do tokens work?
   - Why is HTTPS important?

4. **Component-Based Architecture**
   - Why break UI into components?
   - How do components communicate?
   - When to use global state?

5. **Async Programming**
   - Why is async code necessary?
   - Promises vs callbacks vs async/await
   - Error handling in async code

---

## 🚨 Common Mistakes to Avoid

1. **Rushing:** Don't skip concepts. Understand first, then code.
2. **Copy-pasting:** Type code yourself. You learn muscle memory.
3. **Ignoring errors:** Read error messages. They tell you what's wrong.
4. **No version control:** Commit often with clear messages.
5. **Hardcoding:** Always use environment variables for secrets.
6. **No testing:** Test as you build. Don't wait until the end.
7. **Poor naming:** Use clear variable/function names.

---

## ✅ Self-Check Questions

At each milestone, ask yourself:

- Can I explain what this code does?
- Do I understand why we use this technology?
- Can I modify this without looking at examples?
- Have I tested this with different inputs?
- Is my code clean and readable?
- Have I committed with a meaningful message?

---

## 🎓 By the End, You'll Know

✅ How to build a full-stack application
✅ Frontend + Backend + Database communication
✅ Deployment and DevOps basics
✅ Git & GitHub professional workflow
✅ Security basics (hashing, JWT, HTTPS)
✅ Real-time updates and APIs
✅ Testing and debugging
✅ Professional code practices

---

## 💪 You Got This!

Remember:
- Every expert was once a beginner
- It's okay to feel confused
- Google everything
- Read documentation
- Ask questions
- Build, break, learn, repeat

**Start with Week 1 Day 1 and follow the path. Happy coding!** 🚀
