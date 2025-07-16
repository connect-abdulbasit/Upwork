# Finance Tracker Backend

A robust, TypeScript-based REST API backend for a personal finance tracking application. Built with Express.js, PostgreSQL, and Drizzle ORM, featuring JWT authentication, comprehensive financial management, and a modular architecture.

## �� Features

- **User Authentication & Authorization**
  - JWT-based authentication with refresh tokens
  - Secure password hashing with bcrypt
  - Email verification system
  - Role-based access control

- **Financial Management**
  - Transaction tracking (income/expense)
  - Category management with custom colors
  - Budget planning and monitoring
  - Multi-period budget support (weekly/monthly/yearly)

- **Database & ORM**
  - PostgreSQL database with Drizzle ORM
  - Type-safe database operations
  - Optimized queries with indexes
  - Relational data integrity

- **Security & Performance**
  - Rate limiting protection
  - CORS configuration
  - Helmet security headers
  - Request compression
  - Input validation with Zod

## 🏗️ Architecture

```
Finance-Tracker-Backend/
├── database/
│   ├── index.ts          # Database connection & Drizzle setup
│   └── schema.ts         # Database schema definitions
├── src/
│   ├── app.ts            # Express app configuration
│   ├── server.ts         # Server entry point
│   ├── routes.ts         # Main route configuration
│   ├── config/
│   │   └── index.ts      # Environment configuration
│   ├── middleware/
│   │   └── AuthJWT.ts    # JWT authentication middleware
│   ├── modules/
│   │   ├── auth/         # Authentication module
│   │   ├── budget/       # Budget management module
│   │   ├── categories/   # Category management module
│   │   └── transaction/  # Transaction management module
│   └── types/
│       └── index.ts      # TypeScript type definitions
├── dist/                 # Compiled JavaScript output
├── drizzle.config.ts     # Drizzle ORM configuration
├── nodemon.json          # Development server configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Security**: bcrypt, helmet, rate-limiting
- **Development**: Nodemon, ESLint

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Finance-Tracker-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/finance_tracker
   JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-at-least-32-characters
   JWT_EXPIRES_IN=7d
   JWT_REFRESH_EXPIRES_IN=30d
   CORS_ORIGIN=http://localhost:5173
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   LOG_LEVEL=info
   ```

4. **Database Setup**
   ```bash
   # Run database migrations (if using Drizzle migrations)
   npm run db:migrate
   
   # Or manually create tables using the schema
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (placeholder)

##  API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /refresh` - Refresh access token
- `GET /verify` - Verify user token

### Transactions (`/api/transactions`)
- `GET /` - Get user transactions
- `POST /` - Create new transaction
- `GET /:id` - Get specific transaction
- `PUT /:id` - Update transaction
- `DELETE /:id` - Delete transaction

### Categories (`/api/categories`)
- `GET /` - Get user categories
- `POST /` - Create new category
- `GET /:id` - Get specific category
- `PUT /:id` - Update category
- `DELETE /:id` - Delete category

### Budgets (`/api/budgets`)
- `GET /` - Get user budgets
- `POST /` - Create new budget
- `GET /:id` - Get specific budget
- `PUT /:id` - Update budget
- `DELETE /:id` - Delete budget

## ️ Database Schema

### Users Table
- `id` (Primary Key)
- `email` (Unique)
- `password` (Hashed)
- `firstName`, `lastName`
- `isEmailVerified`
- `refreshToken`
- `createdAt`, `updatedAt`

### Categories Table
- `id` (Primary Key)
- `name`, `description`
- `color` (Hex color code)
- `userId` (Foreign Key)
- `createdAt`, `updatedAt`

### Transactions Table
- `id` (Primary Key)
- `amount` (Decimal)
- `description`
- `type` (Enum: 'income' | 'expense')
- `categoryId` (Foreign Key)
- `userId` (Foreign Key)
- `transactionDate`
- `createdAt`, `updatedAt`

### Budgets Table
- `id` (Primary Key)
- `name`, `amount`
- `period` (Enum: 'weekly' | 'monthly' | 'yearly')
- `categoryId` (Foreign Key)
- `userId` (Foreign Key)
- `startDate`, `endDate`
- `createdAt`, `updatedAt`

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: Protection against brute force attacks
- **CORS**: Configured for frontend integration
- **Input Validation**: Zod schema validation
- **Security Headers**: Helmet middleware
- **Request Compression**: Optimized response sizes

## ️ Project Structure

### Core Files
- **`src/app.ts`**: Express application setup with middleware configuration
- **`src/server.ts`**: Server entry point and port configuration
- **`src/routes.ts`**: Main route registration and API endpoint organization

### Modules
Each feature is organized into its own module with:
- **Router**: API endpoint definitions
- **Service**: Business logic implementation
- **Types**: Module-specific TypeScript interfaces

### Configuration
- **Environment Variables**: Centralized configuration management
- **Database**: Drizzle ORM setup with PostgreSQL
- **Middleware**: Authentication and validation middleware

## 🧪 Development

### Code Structure
The application follows a modular architecture with clear separation of concerns:

- **Modules**: Each feature (auth, transactions, categories, budgets) has its own module
- **Services**: Business logic is separated from route handlers
- **Middleware**: Reusable authentication and validation middleware
- **Types**: TypeScript interfaces for type safety

### Environment Variables
All configuration is managed through environment variables with Zod validation for type safety and required field checking.

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Configuration
Ensure all production environment variables are properly set:
- Database connection string
- JWT secrets
- CORS origins
- Rate limiting settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Note**: This is a backend API that expects to be consumed by a frontend application. The server runs on port 5000 by default and is configured for a frontend running on `http://localhost:5173` (typical Vite development server).