export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
};


export interface AdapterUser {
  id: string;
  email: string;
  emailVerified: Date | null;
  name: string | null;
  image: string | null;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}


export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};


export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type ProductsCategoryList = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
}

export type Product = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category_id: string;
}

export type ProductsTable = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category_name: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
}

export type CategoryField = {
  id: string;
  name: string;
}