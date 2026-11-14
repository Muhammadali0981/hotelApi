# hotelApi

A REST API for a small food-ordering / hotel menu backend, built with Node.js, Express and MongoDB (Mongoose). It was a learning project (2024) covering routing, controllers, file uploads and JWT authentication.

## Features

- **Products** (menu items): name, price and an uploaded image (Multer, saved to `uploads/`, 5 MB limit).
- **Orders**: reference a product and a quantity (default 1).
- **Users**: sign-up with bcrypt-hashed passwords, and login that returns a JWT valid for 1 hour.
- Protected routes check `Authorization: Bearer <token>`.
- Request logging with Morgan, permissive CORS headers, and JSON error responses.

## Endpoints

| Method | Path | Auth |
|---|---|---|
| GET | `/products` | – |
| POST | `/products` (multipart, field `productImage`) | JWT |
| GET | `/products/:productId` | – |
| PATCH | `/products/:productId` | JWT |
| DELETE | `/products/:productId` | JWT |
| GET | `/orders` | JWT |
| POST | `/orders` | JWT |
| GET | `/orders/:orderId` | JWT |
| DELETE | `/orders/:orderId` | JWT |
| POST | `/user/signup` | – |
| POST | `/user/login` | – |
| DELETE | `/user/:userId` | – |

Uploaded images are served from `/uploads/<filename>`.

## Running

```bash
npm install
npm start          # nodemon server.js, on PORT or 3000
```

Environment variables (read through `nodemon.json`):

- `MONGO_ATLAS_PW`: password for the MongoDB Atlas user in the connection string in `app.js`. Point the connection string at your own cluster.
- `JWT_KEY`: secret used to sign and verify tokens.
- `PORT` (optional).

## Stack

Node.js, Express, MongoDB / Mongoose, Multer, bcrypt, jsonwebtoken, Morgan.
