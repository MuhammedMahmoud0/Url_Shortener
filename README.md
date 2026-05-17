# URL Shortener

A simple and lightweight URL shortener API built with Node.js, Express, and MongoDB.

## Features

- Create short URLs with custom aliases or auto-generated aliases
- Redirect short URLs to original URLs
- Get list of all stored URLs
- RESTful API design
- Error handling middleware
- Graceful shutdown and error handling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **ID Generation**: Nanoid

## Prerequisites

- Node.js (v14 or higher recommended)
- MongoDB (local or cloud instance like MongoDB Atlas)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd url_shortener
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Create a .env file and add the following:
PORT=4000
NODE_ENV=development
DATABASE_URI=your_mongodb_connection_string
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the server in development mode with auto-restart |
| `npm start` | Start the production server |

## API Endpoints

### Base URL
```
http://localhost:4000
```

### Health Check
```
GET /
```
Returns server status, timestamp, and uptime.

### Get All URLs
```
GET /urls
```
Returns a list of all shortened URLs.

### Create Short URL
```
POST /urls
```
Create a new shortened URL.

**Request Body:**
```json
{
  "input": "https://example.com",
  "alias": "custom-alias"  // optional, auto-generated if not provided
}
```

**Response:**
```json
{
  "msg": "Alias Created Successfully",
  "alias": "abc123"
}
```

### Redirect to Original URL
```
GET /:alias
```
Redirects to the original URL associated with the alias.

## Project Structure

```
url_shortener/
├── src/
│   ├── config/
│   │   └── connection.js      # MongoDB connection
│   ├── controllers/
│   │   └── urlController.js   # Business logic for URLs
│   ├── middlewares/
│   │   └── errorHandlerMiddleware.js  # Error handling
│   ├── models/
│   │   └── URL.js            # Mongoose schema
│   ├── routes/
│   │   └── urlRoutes.js      # API routes
│   ├── utils/
│   │   └── customError.js    # Custom error class
│   └── server.js             # Entry point
├── package.json
└── .env
```

## Error Handling

The API uses a custom error handling middleware that provides different error messages based on the environment:
- **Development**: Full error stack trace
- **Production**: Simplified error message

## Available Error Status Codes

- `400` - Bad Request (missing input)
- `404` - Not Found (URL not found)
- `409` - Conflict (URL or alias already exists)
- `500` - Internal Server Error

## License

ISC