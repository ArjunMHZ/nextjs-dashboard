'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import CryptoJS from 'crypto-js';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce.number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
      invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});


export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const CreateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // console.log(validatedFields)

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `; 
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return{message: 'Deleted invoice.'};
  } catch (error) {
    return{message: 'Database error: Failed to delete invoice.'};
  }
 
}

export async function deleteProduct(id: string) {

  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    revalidatePath('/dashboard/products');
    return{message: 'Deleted product.'};
  } catch (error) {
    return{message: 'Database error: Failed to delete product.'};
  }
 
}


// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }



export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", { redirect: false, ...Object.fromEntries(formData) });


    // Fetch session after login to check user role
    const session = await fetch("/api/auth/session").then((res) => res.json());

    if (session?.user?.role === "admin") {
      return { redirect: "/dashboard" }; // Admins go to dashboard
    }

    return { redirect: "/" }; // Regular users go to home
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}






export async function createOrder({totalAmount}: {totalAmount: number}){
  try {
    const productCode = "EPAYTEST"; // Your product code
    const secretKey = process.env.ESEWA_SECRET;

    const transactionUUID = Date.now().toString();
    const signature = generateSignature(secretKey, totalAmount, transactionUUID, productCode);

    const formData = {
      amount: totalAmount,
      tax_amount: 0, // Example tax amount
      total_amount: totalAmount,
      transaction_uuid: transactionUUID,
      product_code: 'EPAYTEST',
      product_service_charge: 0,
      product_delivery_charge: 0,
      success_url: 'https://rc-epay.esewa.com.np/epay/',
      failure_url: 'https://nextjs-dashboard-chi-mauve-50.vercel.app/',
      signed_field_names: 'total_amount,transaction_uuid,product_code',
      signature: signature,
    };
    return formData;
  } catch (error) {
    throw error;
  }
}

export async function khaltiOrder({totalAmount}: {totalAmount: number}){
  try {
    let Orderid = Date.now().toString();

    const formData = {
      return_url: "https://test-pay.khalti.com/",
      website_url: "https://nextjs-dashboard-chi-mauve-50.vercel.app/",
      amount: totalAmount*100,
      purchase_order_id: Orderid,
      purchase_order_name: "test",
    };

    const response = await fetch(
      "https://a.khalti.com/api/v2/epayment/initiate/",{
        method: "POST",
        headers: {
          "Authorization": `key ${process.env.KHALTI_SECRET}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    // Check if the response is okay (status code 2xx)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Parse the JSON response from Khalti
    const responseData = await response.json();
    if(responseData && responseData.payment_url){
      return responseData.payment_url;
    }

  } catch (error) {
    console.error("Error initiating Khalti payment:", error);
    throw new Error("Something went wrong");
  }
}


// const callKhalti = async (formData: any) => {
//   try {
//     const response = await fetch(
//       "https://a.khalti.com/api/v2/epayment/initiate/",{
//         method: "POST",
//         headers: {
//           "Authorization": "Key 4561eab2f1094887bb875d2a36ccf25f",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       }
//     );
//     // Check if the response is okay (status code 2xx)
//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     // Parse the JSON response from Khalti
//     const responseData = await response.json();

//     return responseData;

//   } catch (err) {
//     console.error("Error initiating Khalti payment:", err);
//     throw new Error("Something went wrong");
//   }
// };



const generateSignature = (secretKey: string | undefined, totalAmount: number, transactionUUID: string, productCode: string) => {
  if (!secretKey) {
    throw new Error("Secret key is required");
  }
  const message = `total_amount=${totalAmount},transaction_uuid=${transactionUUID},product_code=${productCode}`;
  const hash = CryptoJS.HmacSHA256(message, secretKey);
  return CryptoJS.enc.Base64.stringify(hash);
};



