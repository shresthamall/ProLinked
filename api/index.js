// This is the entry point for Vercel serverless functions
const app = require('./server');

// Export the Express app as a serverless function
module.exports = app;
