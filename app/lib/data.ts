import { sql } from '@vercel/postgres';
import {
  Category,
  CategoryField,
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Product,
  ProductsCategoryList,
  ProductsTable,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    if (!data.rows) {
      throw new Error('No rows returned from query');
    }

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}


export async function fetchCategories() {
  try {
    const data = await sql<CategoryField>`
    SELECT id, name FROM categories ORDER BY name ASC
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories.');
  }
}


export async function fetchCategoryByName(productId: string) {
  try {
    const data = await sql<Category>`
    SELECT categories.id, categories.name, categories.description FROM categories WHERE categories.id = ${productId}`;

    return data.rows[0];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch category by its name.');
  }
}


export async function fetchProducts(productCategory: string) {
  try {
    const data = await sql<ProductsCategoryList>`   
      SELECT products.id, products.name, products.price, products.image_url, categories.description
      FROM products
      JOIN categories ON products.category_id = categories.id
      WHERE categories.name = ${productCategory}
    `;

    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all the products according to its category.');
  }
}

export async function fetchProductByName(id: string) {
  try {
    const data = await sql<Product>`   
    SELECT products.id, products.name, products.price, products.image_url, products.description, products.category_id
    FROM products
    WHERE products.id = ${id}
    LIMIT 1
  `;


    const product = data.rows.map((product) => ({
      ...product,
      // Convert amount from cents to dollars
      // amount: invoice.amount / 100,
    }));

    return product[0];

    // if (Array.isArray(data) && data.length > 0) {
    //   return data[0]; // Return the first product if it exists here should be data.rows
    // }

    // return null;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch product by its name.');
  }
}



export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await sql<ProductsTable>`
      SELECT
        products.id,
        products.name,
        products.price,
        products.image_url,
        products.description,
        categories.name AS category_name
      FROM products
      JOIN categories ON products.category_id = categories.id
      WHERE
        products.name ILIKE ${`%${query}%`} OR
        categories.name ILIKE ${`%${query}%`} OR
        products.price::text ILIKE ${`%${query}%`} OR
        products.description ILIKE ${`%${query}%`}
      ORDER BY products.name ASC  
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return products.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function trendingProducts() {
  try {
    const data = await sql<Product>`
      SELECT * FROM products 
      WHERE category_id IN ('134bfccf-d58e-4ba5-9562-f8c327858c6d', 'be2c78c7-08f8-4e93-b384-2424170489b9', '29f08011-2984-4a8d-9cc8-341e6fbee6c3') 
      LIMIT 4;
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error('Failed to fetch trending products.');
  }
}