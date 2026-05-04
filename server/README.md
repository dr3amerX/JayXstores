# JayXstores demo server

This is a minimal Express.js example to persist products for JayXstores.

Install and run:

```bash
cd web-store/server
npm install
npm start
```

The server serves static files from the `web-store` folder root and exposes a simple JSON API:

- `GET /api/products` - list products
- `POST /api/products` - add product (JSON body)
- `PUT /api/products/:id` - update product
- `DELETE /api/products/:id` - delete product
- `GET /api/orders` - list customer orders
- `POST /api/orders` - add customer order (JSON body)

Products are stored in `products.json` in this folder. This is only a demo - do not use it in production without adding validation, authentication, and proper error handling.
