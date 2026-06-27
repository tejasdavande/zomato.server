# 🍽️ Zomato Server API

A **food-delivery backend** (Zomato-style) built with **Node.js, Express and MongoDB**, with JWT authentication and interactive **Swagger / OpenAPI** documentation.

---

## 📌 Problem Statement

A food-delivery platform sits between three parties — customers, restaurants and their menus — and every feature depends on getting that core data model right. Before any "order food online" app can work, it needs a backend that can: securely manage user accounts, let restaurants be listed with their menus, and accept orders that are **guaranteed to point at a real restaurant**.

Many learning projects get this *almost* right but ship subtle, app-breaking defects: orders saved against non-existent restaurants, fields silently dropped because of schema typos, and modules wired to hard-coded local paths so the server won't even start on another machine.

**Zomato Server** fixes that foundation and provides a clean, runnable REST API for the food-delivery domain:

- **Secure accounts** — sign up / log in with bcrypt-hashed passwords and stateless JWTs.
- **Restaurants & menus** — create restaurants, attach menu cards, and manage a standalone menu collection.
- **Validated orders** — an order can only be placed against a restaurant that actually exists; the restaurant's name is stamped onto the order for fast reads.
- **Runs anywhere** — configuration is driven entirely by environment variables, and the full API is documented and testable in the browser.

---

## ✨ Features

- 🔐 JWT authentication with bcrypt-hashed passwords
- 🏪 Restaurant management with embedded menu cards
- 🍔 Standalone menu CRUD
- 🧾 Order placement validated against existing restaurants
- 🧱 Clean layered architecture (models · controllers · routes · middleware)
- 🛡️ Centralised error handling with an async wrapper (no unhandled rejections)
- 📚 Interactive API docs at `/api-docs` (OpenAPI 3.0)
- ❤️ Health-check endpoint for uptime monitoring

---

## 🛠️ Tech Stack

| Layer            | Technology                     |
| ---------------- | ------------------------------ |
| Runtime          | Node.js                        |
| Web framework    | Express.js                     |
| Database         | MongoDB + Mongoose             |
| Auth             | JSON Web Tokens (JWT)          |
| Password hashing | bcrypt                         |
| API docs         | swagger-ui-express (OpenAPI 3) |

---

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone https://github.com/tejasdavande/zomato.server.git
cd zomato.server
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Then edit `.env`:

```env
PORT=3000
JWT_SECRET_KEY=your_long_random_secret
MONGODB_URI=mongodb://127.0.0.1:27017/zomato
```

> You need a running MongoDB — either a local instance or a MongoDB Atlas cluster.

### 3. Run

```bash
npm run dev     # auto-reload with nodemon
# or
npm start       # plain node
```

You should see:

```
🚀  Server running on http://localhost:3000
📚  API docs at    http://localhost:3000/api-docs
```

---

## 📚 API Documentation

Once the server is running, open **<http://localhost:3000/api-docs>** for fully interactive Swagger UI.
The raw OpenAPI spec is available at **`/openapi.json`**.

### Endpoint overview

| Method | Endpoint                  | Auth | Description                       |
| ------ | ------------------------- | :--: | --------------------------------- |
| POST   | `/zomatouser/signup`      |  ❌  | Register a new user               |
| POST   | `/zomatouser/login`       |  ❌  | Log in, returns a JWT             |
| DELETE | `/zomatouser/:userId`     |  ✅  | Delete a user                     |
| GET    | `/restaurant`             |  ✅  | List restaurants                  |
| GET    | `/restaurant/:id`         |  ✅  | Get one restaurant                |
| POST   | `/restaurant`             |  ✅  | Create a restaurant               |
| PUT    | `/restaurant/:id`         |  ✅  | Add items to a menu card          |
| DELETE | `/restaurant/:id`         |  ✅  | Delete a restaurant               |
| GET    | `/menu`                   |  ❌  | List menu items                   |
| POST   | `/menu`                   |  ✅  | Create a menu item                |
| PATCH  | `/menu/:id`               |  ✅  | Update a menu item                |
| DELETE | `/menu/:id`               |  ✅  | Delete a menu item                |
| GET    | `/order`                  |  ✅  | List orders                       |
| POST   | `/order`                  |  ✅  | Place an order                    |
| GET    | `/health`                 |  ❌  | Service health check              |

> Protected routes expect an `Authorization: Bearer <token>` header.

### Quick example

```bash
# 1. Register and log in to get a token
curl -X POST http://localhost:3000/zomatouser/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"tejas@example.com","password":"secret123"}'

curl -X POST http://localhost:3000/zomatouser/login \
  -H "Content-Type: application/json" \
  -d '{"email":"tejas@example.com","password":"secret123"}'

# 2. Create a restaurant (use the token from step 1)
curl -X POST http://localhost:3000/restaurant \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"name":"Spice Garden","location":"Pune","menucard":[{"name":"Paneer Butter Masala","price":250}]}'

# 3. Place an order against that restaurant
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"restaurantId":"<RESTAURANT_ID>","items":[{"name":"Paneer Butter Masala","quantity":2}]}'
```

---

## 🗂️ Project Structure

```
zomato.server/
├── api/
│   ├── common/         # db connection + async handler
│   ├── controllers/    # request/response logic
│   ├── docs/           # openapi.json (Swagger spec)
│   ├── middleware/     # JWT auth
│   ├── models/         # Mongoose schemas
│   └── routes/         # route definitions
├── app.js              # Express app wiring
├── server.js           # HTTP server entry point
└── .env.example        # environment template
```

---

## 📝 License

ISC © Tejas Davande
