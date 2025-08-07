# ProLinked - Professional Networking Platform

[![Deployed with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshresthamall%2FProLinked)

A modern professional networking platform inspired by LinkedIn, built with the MERN stack and deployed on Vercel.

## 🚀 Live Demo

Check out the live application: [https://pro-linked.vercel.app/](https://pro-linked.vercel.app/)

## 🛠 Tech Stack

- **Frontend**: React, Vite, Material-UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: Vercel
- **Version Control**: Git & GitHub

## 📦 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shresthamall/ProLinked.git
   cd ProLinked
   ```

2. Install dependencies for both client and server:
   ```bash
   # Install server dependencies
   cd api
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `api` directory with your MongoDB connection string and JWT secret:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     NODE_ENV=development
     ```

4. Start the development servers:
   ```bash
   # In the api directory
   npm run dev
   
   # In a new terminal, from the client directory
   npm run dev
   ```

## 🧪 Test Data

You can use the following test credentials to explore the application:

```
Email: test@example.com
Password: test123
```

Or create a new account to get started.

## 📂 Project Structure

```
ProLinked/
├── api/                  # Backend server
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── server.js         # Express server setup
├── client/               # Frontend React application
│   ├── public/           # Static files
│   └── src/              # React components and logic
└── README.md             # This file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

For any questions or feedback, please open an issue on GitHub.

---

Built with ❤️ by [Your Name]
