import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { invoices, customers, revenue, products, categories } from '../lib/placeholder-data';

const client = await db.connect();
if (!client) {
  console.error('Database connection failed');
  // return Response.json({ error: 'Database connection failed' }, { status: 500 });
}

// async function seedUsers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL
//     );
//   `;

//   const insertedUsers = await Promise.all(
//     users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       return client.sql`
//         INSERT INTO users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//     }),
//   );

//   return insertedUsers;
// }

// async function seedInvoices() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       customer_id UUID NOT NULL,
//       amount INT NOT NULL,
//       status VARCHAR(255) NOT NULL,
//       date DATE NOT NULL
//     );
//   `;

//   const insertedInvoices = await Promise.all(
//     invoices.map(
//       (invoice) => client.sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedInvoices;
// }


// async function seedProducts() {
  // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // await client.sql`
  //     CREATE TABLE IF NOT EXISTS products (
  //       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //       name VARCHAR(100) NOT NULL,
  //       price NUMERIC(10, 2) NOT NULL,
  //       image_url VARCHAR(255) NOT NULL,
  //       description TEXT,
  //       category_id UUID REFERENCES categories(id)
  //     );
  // `;

//   const insertedProducts = await Promise.all(
//     products.map(
//       (product) => client.sql`
//         INSERT INTO products (id, name, price, image_url, description, category_id)
//         VALUES (${product.id}, ${product.name}, ${product.price}, ${product.image_url}, ${product.description}, ${product.category_id})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );
//   return insertedProducts;
// }


// async function seedCategory(){
  // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // await client.sql`
  //   CREATE TABLE categories (
  //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //     name VARCHAR(50) NOT NULL UNIQUE,
  //     description TEXT
  //   );
  // `;

//   const insertedCategorys = await Promise.all(
//     categories.map(
//       (category) => client.sql`
//         INSERT INTO categories (id, name, description)
//         VALUES (${category.id}, ${category.name}, ${category.description})
//         ON CONFLICT (id) DO NOTHING;     
//       `,
//     ),
//   );
//   return insertedCategorys;
// }

// async function seedOrder(){
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS orders (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       user_id UUID REFERENCES users(id),
//       total_price NUMERIC(10, 2) NOT NULL,
//       status VARCHAR(20) DEFAULT 'pending',
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `;
// }




// async function seedCustomers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS customers (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       image_url VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedCustomers = await Promise.all(
//     customers.map(
//       (customer) => client.sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedCustomers;
// }

// async function seedRevenue() {
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS revenue (
//       month VARCHAR(4) NOT NULL UNIQUE,
//       revenue INT NOT NULL
//     );
//   `;

//   const insertedRevenue = await Promise.all(
//     revenue.map(
//       (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedRevenue;
// }




export async function GET() {

  try {
    await client.sql`BEGIN`;
    // await seedCategory();
    // await seedProducts();
    // await seedOrder();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}


// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   username VARCHAR(50) UNIQUE NOT NULL,
//   email VARCHAR(100) UNIQUE NOT NULL,
//   password_hash VARCHAR(255) NOT NULL,
//   first_name VARCHAR(50),
//   last_name VARCHAR(50),
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );




// CREATE TABLE orders (
//   id SERIAL PRIMARY KEY,
//   user_id INT REFERENCES users(id),
//   total_price NUMERIC(10, 2) NOT NULL,
//   status VARCHAR(20) DEFAULT 'pending', -- e.g., pending, completed, cancelled
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );


// CREATE TABLE order_items (
//   id SERIAL PRIMARY KEY,
//   order_id INT REFERENCES orders(id),
//   product_id INT REFERENCES products(id),
//   quantity INT NOT NULL DEFAULT 1,
//   price NUMERIC(10, 2) NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );


// CREATE TABLE reviews (
//   id SERIAL PRIMARY KEY,
//   product_id INT REFERENCES products(id),
//   user_id INT REFERENCES users(id),
//   rating INT CHECK (rating >= 1 AND rating <= 5),
//   comment TEXT,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );


// async function seedWishlist(){
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//   CREATE TABLE IF NOT EXISTS wishlists (
//   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//   user_id UUID REFERENCES users(id),
//   product_id UUID REFERENCES products(id),
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   UNIQUE(user_id, product_id)
//   );
// `;
// }


