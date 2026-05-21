
# Career Clarity

A cognitive-based hiring platform that replaces traditional resumes with verified intelligence portfolios.

## 🌟 Features

- 🧠 **Cognitive Assessment** - Scientifically-backed cognitive profiling
- 👤 **Dual User Types** - Separate experiences for job seekers and employers
- 📊 **Visual Portfolios** - Radar chart visualization of cognitive strengths
- 🔍 **Smart Matching** - Real-time candidate filtering based on cognitive traits
- 🔐 **Authentication** - Secure MongoDB-backed user system
- 🎨 **Modern UI** - Clean, professional light theme design

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB (Docker)
- **Charts:** Recharts
- **Authentication:** bcryptjs

## 📋 Prerequisites

- Node.js 20.9.0 or higher
- Docker & Docker Compose
- npm

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Josepharun07/career-clarity.git
cd career-clarity
```

### 2. Run setup script

```bash
chmod +x setup.sh
./setup.sh
```

This will:
- ✅ Install dependencies
- ✅ Start MongoDB in Docker
- ✅ Create environment variables
- ✅ Initialize the database

### 3. Start development server

```bash
npm run dev
```

Visit: **http://localhost:3001**

## 🌐 User Flows

### Job Seeker Flow
1. 📝 Sign up at `/login`
2. 🧠 Complete cognitive assessment
3. 📊 View/share portfolio with radar chart
4. 👀 Track employer views

### Employer Flow
1. 📝 Sign up at `/login/employer`
2. 🎯 Access candidate dashboard
3. 🔧 Adjust cognitive trait filters
4. 🔍 View matching candidates with % scores
5. 📧 Contact candidates

## 📁 Project Structure

```
career-clarity/
├── app/
│   ├── landing/         # Public landing page
│   ├── login/           # Job seeker authentication
│   ├── login/employer/  # Employer authentication
│   ├── dashboard/       # Job seeker dashboard
│   ├── portfolio/       # Job seeker portfolio
│   ├── assessment/      # Cognitive assessment
│   ├── employer/        # Employer dashboard
│   └── api/             # API routes
├── components/          # Reusable components
├── lib/
│   ├── contexts/        # React contexts (Auth)
│   ├── models/          # MongoDB models
│   └── mockData.ts      # Sample candidate data
├── docker-compose.yml   # MongoDB container config
├── setup.sh             # Automated setup script
└── status.sh            # System status checker
```

## 🔧 Useful Commands

### Development
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
```

### System Management
```bash
./status.sh              # Check system status
./cleanup.sh             # Clean reset
```

### Docker
```bash
docker compose up -d     # Start MongoDB
docker compose down      # Stop MongoDB
docker compose logs -f   # View logs
docker compose restart   # Restart MongoDB
```

### Database
```bash
# View all users
docker exec -it career-clarity-db mongosh -u admin -p careerclarity2024 --authenticationDatabase admin career_clarity --eval "db.users.find().pretty()"

# Reset database
docker exec -it career-clarity-db mongosh -u admin -p careerclarity2024 --authenticationDatabase admin career_clarity --eval "db.dropDatabase()"
```

## 🔐 Environment Variables

Create `.env.local`:

```env
MONGODB_URI=mongodb://admin:careerclarity2024@localhost:27017/career_clarity?authSource=admin
NODE_ENV=development
```

## 📊 Data Models

### User Schema
- `fullName`: String
- `email`: String (unique)
- `password`: String (hashed)
- `userType`: 'jobseeker' | 'employer'
- `hasCompletedAssessment`: Boolean
- `assessmentResults`: Object (Logic, Adaptability, EQ, Spatial, Risk)
- `companyName`: String (employers only)

## 🎯 MVP Features Completed

- ✅ Landing page with professional design
- ✅ Separate authentication for job seekers and employers
- ✅ MongoDB integration with Docker
- ✅ Cognitive assessment flow (mock questions)
- ✅ Portfolio generation with radar charts
- ✅ Employer dashboard with real-time filtering
- ✅ Match percentage calculation
- ✅ Protected routes based on user type
- ✅ Responsive design with Tailwind CSS

## 📝 License

MIT

## 👨‍💻 Author

Joseph Arun - [GitHub](https://github.com/Josepharun07)

---


