# SplitEasy 💰

**A professional bill splitter and expense tracking web application**

Split expenses, not friendships. SplitEasy makes it simple to track shared expenses and automatically calculate who owes whom in groups.

---

## 🎯 Problem We Solve

When friends, roommates, or trip groups share expenses, tracking who paid what and who owes whom becomes messy. SplitEasy eliminates the confusion with automatic calculations and real-time updates.

---

## ✨ Features

### Phase 1 (MVP - Week 1-2)
- ✅ User authentication (Sign up, Login, Logout)
- ✅ Create and manage expense groups
- ✅ Add group members
- ✅ Record expenses with automatic splitting
- ✅ View balance summary (who owes whom)

### Phase 2 (Week 3-4)
- ✅ Real-time updates when expenses change
- ✅ Expense history and details
- ✅ Edit and delete expenses
- ✅ Mark expenses as settled
- ✅ Mobile-responsive UI

### Phase 3 (Week 5-6)
- ✅ Settlement reminders
- ✅ Generate settlement reports
- ✅ Smart settlement simplification
- ✅ Export expense data
- ✅ User profiles and settings

---

## 🏗️ Tech Stack

### Frontend
- **React** / **Next.js** - Modern UI framework
- **Tailwind CSS** - Professional styling
- **TypeScript** - Type safety

### Backend
- **Node.js** + **Express** - Server
- **TypeScript** - Type safety
- **JWT** - Authentication
- **Prisma ORM** - Database queries

### Database
- **PostgreSQL** - Reliable, structured data

### Deployment
- **Vercel** - Frontend hosting (automatic deploys)
- **Railway** - Backend + Database (free tier)
- **GitHub Actions** - CI/CD automation

---

## 📁 Project Structure

```
SplitEasy/
├── frontend/                    # React/Next.js frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # App pages
│   │   ├── styles/             # Tailwind styles
│   │   └── hooks/              # Custom React hooks
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                     # Node.js + Express backend
│   ├── src/
│   │   ├── routes/             # API endpoints
│   │   ├── controllers/        # Business logic
│   │   ├── models/             # Data models (Prisma)
│   │   ├── middleware/         # Auth, validation, error handling
│   │   └── utils/              # Helper functions
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   ├── package.json
│   └── tsconfig.json
│
├── database/                    # Database files
│   └── schema.sql              # PostgreSQL schema
│
├── .github/
│   └── workflows/
│       ├── deploy-frontend.yml # Vercel deployment
│       └── deploy-backend.yml  # Railway deployment
│
├── .gitignore                  # Git ignore file
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL (local or Railway)
- Git
- GitHub account

### Local Setup

#### 1. Clone the repository
```bash
git clone https://github.com/AgamPreetSingh-git/SplitEasy.git
cd SplitEasy
```

#### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Add your database URL and JWT secret to .env
npx prisma migrate dev
npm run dev
```

Backend will run on `http://localhost:5000`

#### 3. Setup Frontend
```bash
cd ../frontend
npm install
cp .env.example .env.local
# Add your backend API URL to .env.local
npm run dev
```

Frontend will run on `http://localhost:3000`

---

## 📊 Database Schema

### Users Table
```sql
- id (Primary Key)
- email (Unique)
- name
- password (hashed)
- profile_picture
- created_at
- updated_at
```

### Groups Table
```sql
- id (Primary Key)
- name
- description
- created_by (Foreign Key -> Users)
- created_at
- updated_at
```

### GroupMembers Table
```sql
- id (Primary Key)
- group_id (Foreign Key -> Groups)
- user_id (Foreign Key -> Users)
- joined_at
```

### Expenses Table
```sql
- id (Primary Key)
- group_id (Foreign Key -> Groups)
- paid_by (Foreign Key -> Users)
- amount
- description
- category
- date
- created_at
- updated_at
```

### ExpenseSplits Table
```sql
- id (Primary Key)
- expense_id (Foreign Key -> Expenses)
- user_id (Foreign Key -> Users)
- amount_owed
- settled (Boolean)
```

### Settlements Table
```sql
- id (Primary Key)
- from_user (Foreign Key -> Users)
- to_user (Foreign Key -> Users)
- group_id (Foreign Key -> Groups)
- amount
- settled_at
```

---

## 🔐 API Endpoints (Backend)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Groups
- `GET /api/groups` - Get all groups for user
- `POST /api/groups` - Create new group
- `GET /api/groups/:id` - Get group details
- `PUT /api/groups/:id` - Update group
- `DELETE /api/groups/:id` - Delete group
- `POST /api/groups/:id/members` - Add member to group

### Expenses
- `GET /api/groups/:id/expenses` - Get expenses in group
- `POST /api/groups/:id/expenses` - Add expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Settlements
- `GET /api/groups/:id/settlements` - Get who owes whom
- `POST /api/settlements` - Mark as settled
- `GET /api/groups/:id/report` - Get settlement report

---

## 📱 UI/UX Flow

```
Login/Register
    ↓
Dashboard (My Groups)
    ↓
Select Group → View Members & Balances
    ↓
Add Expense / View Expenses
    ↓
Settlement Summary
```

---

## 🛠️ Development Workflow

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/expense-tracking

# Make changes, commit with clear messages
git commit -m "feat: add expense creation form"

# Push to GitHub
git push origin feature/expense-tracking

# Create Pull Request on GitHub
```

### Branching Strategy
- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes

---

## 📦 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Vercel automatically deploys
3. Live at `splitEasy-yourname.vercel.app`

### Backend (Railway)
1. Connect GitHub repo to Railway
2. Add environment variables
3. Deploy on push
4. Get live API URL

### Database (PostgreSQL on Railway)
- Created with backend deployment
- Connection string in environment variables

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm run test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

---

## 📚 Learning Resources

As you build, you'll learn:
- Full-stack web development
- REST API design
- Database design and relationships
- Authentication & security
- Real-time data updates
- Deployment & DevOps
- Git & GitHub workflows
- Error handling & validation

---

## 🤝 Contributing

This is your personal portfolio project, but here's best practice:
1. Create descriptive branch names
2. Write clear commit messages
3. Keep commits atomic (one feature per commit)
4. Test locally before pushing

---

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/splitEasy
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
API_PORT=5000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Database connection error
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Run migrations: `npx prisma migrate dev`

### CORS errors
- Check backend CORS configuration
- Verify frontend API URL matches

---

## 📞 Support & Questions

As you learn and build:
1. Check existing issues
2. Search documentation
3. Read error messages carefully
4. Google the error
5. Ask for help with specific code issues

---

## 🎓 Learning Path

**Week 1:** Understand backend structure, authentication
**Week 2:** Build API endpoints, test with Postman
**Week 3:** Frontend setup, connect to backend
**Week 4:** Build UI components
**Week 5:** Real-time updates, refinements
**Week 6:** Testing, optimization
**Week 7:** Deployment, documentation

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🎉 Let's Build!

You've got this! Start with the backend setup and take it step by step. Every line of code you write is learning.

**Next Step:** Set up backend folder structure and start coding!

---

**Happy Coding! 🚀**

Built with ❤️ by AgamPreetSingh-git
