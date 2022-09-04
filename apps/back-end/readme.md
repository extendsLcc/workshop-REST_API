
### Order API

> An extremely simplified product placing order application, without any authentication or any complex real-life flow, mostly for learning the basic concepts of REST API.

#### :book: Documentation

This application allows to register orders of products for a customer.

##### Endpoints

**Category**
- `GET /categories` - List all categories
- `GET /categories/:id` - Get a category by id
- `POST /categories` - Create a new category
- `PUT /categories/:id` - Update a category by id
- `DELETE /categories/:id` - Delete a category by id

**Product**
- `GET /products` - List all products
- `GET /products/:id` - Get a product by id
- `POST /products` - Create a new product
- `PUT /products/:id` - Update a product by id
- `PATCH /products/:id` - Toggle product status by id
- `DELETE /products/:id` - Delete a product by id

**Cusomer**
- `GET /customers` - List all customers
- `POST /customers` - Create a new customer

**Order**
- `GET /orders` - List all orders
- `POST /orders` - Create a new order
- `PATCH /orders/:id` - Toggle order status by id


#### :wrench: Setting up the Project

Setting up the database
```sh
pnpm prisma:setup
```
running api on dev mode
```sh
pnpm dev
```
run prisma studio
```sh
pnpm prisma:studio
```

[⬆ back to top](#order-api)
