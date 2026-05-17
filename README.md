# 💼 Mini Service Request Board – GlobalTNA Technical Assessment

A production-ready full-stack web application built for the **Full-Stack Developer Intern Technical Assessment** at GlobalTNA.

This platform allows Sri Lankan homeowners to post home maintenance service requests while enabling skilled tradespeople to browse, manage, and update service workflows efficiently.

---

# 🚀 Live Demo & Repository

* **GitHub Repository:** `https://github.com/KavindudilshanAberathna`
* **Live Demo:** `https://globaltna-assessment-hrxd.vercel.app/`

---

# 🛠️ Tech Stack

## Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS

## Backend

* Node.js
* Express.js
* RESTful API Architecture

## Database

* MongoDB Atlas
* Mongoose ODM

## Testing

* Jest
* Supertest
* Babel-jest

---

# ✨ Features

## ✅ Core Features

* RESTful backend API with proper route structuring
* Full CRUD operations for service requests
* Global error handling middleware
* Dynamic frontend dashboard with category filtering
* Client-side form validation
* Email format validation
* Service request workflow management:

  * Open
  * In Progress
  * Closed
* Responsive mobile-friendly UI

---

## 🌟 Advanced Features

* JWT-based authentication and authorization
* Secure password hashing using `bcryptjs`
* Protected routes for create, update, and delete operations
* Keyword search functionality across titles and descriptions
* Pagination system for optimized rendering
* Smooth scroll-to-top pagination behavior
* Outside-click modal handling with backdrop blur
* Sri Lankan localized seed dataset
* Unit and endpoint testing with mocked Mongoose operations

---

# 🔐 Test Credentials

A pre-seeded administrator account is included for testing purposes.

| Role  | Email               | Password   |
| ----- | ------------------- | ---------- |
| Admin | `admin@example.com` | `admin123` |

> Unauthenticated users can browse service requests, but protected actions require authentication.

---

# ⚙️ Environment Variables

Create a `.env` file inside the `/backend` directory and add the following:

```env
PORT=5000

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/globaltna?retryWrites=true&w=majority

JWT_SECRET=globaltna_secret_key_2026
```

---

# 📦 Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>

cd <repository-folder>
```

---

## 2️⃣ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run the seed script:

```bash
npm run seed
```

Start the backend development server:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🧪 Running Tests

To execute backend unit and endpoint tests:

```bash
cd backend

npm test
```

---

# 📂 API Endpoints

| Method | Endpoint          | Description                                            | Auth Required |
| ------ | ----------------- | ------------------------------------------------------ | ------------- |
| POST   | `/api/auth/login` | Authenticate user and return JWT token                 | ❌             |
| GET    | `/api/jobs`       | Get all jobs with filtering, searching, and pagination | ❌             |
| GET    | `/api/jobs/:id`   | Get a single job by ID                                 | ❌             |
| POST   | `/api/jobs`       | Create a new service request                           | ✅             |
| PATCH  | `/api/jobs/:id`   | Update service request status                          | ✅             |
| DELETE | `/api/jobs/:id`   | Delete a service request                               | ✅             |

---

# 🔒 Authentication & Security

* JWT authentication
* Password hashing with `bcryptjs`
* Protected API routes
* Centralized error handling
* Secure middleware validation

---

# 🌍 Sample Seed Data

The seed script generates:

* 10 realistic Sri Lankan service requests
* Multiple trade categories
* Location-based data from:

  * Colombo
  * Kandy
  * Gampaha
  * Galle
  * Malabe

---

# 📱 Responsive Design

The application is fully responsive and optimized for:

* Mobile devices
* Tablets
* Desktop screens

---

# 📌 Future Improvements

* Role-based access control
* Image upload support
* Real-time notifications
* In-app messaging system
* Advanced analytics dashboard

---

# 👨‍💻 Author

**Kavindu Dilshan Aberathna**

* GitHub: `https://github.com/KavindudilshanAberathna`
* LinkedIn: `https://www.linkedin.com/in/kavindudilshanaberathna/`

---

# 📄 License

This project was developed solely for the technical assessment process at GlobalTNA.
