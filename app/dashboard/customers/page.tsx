import  CustomersTable from "@/components/ui/customers/table";
import { FormattedCustomersTable } from '@/app/lib/definitions';
import { fetchCustomers, fetchFilteredCustomers } from "@/app/lib/data";

export default async function Page({
  searchParams,
}:{
  searchParams?: {
    query?: string;
    page?: string;
  };
}){
  const query = searchParams?.query || '';
    // const totalCustomers = await fetchCustomers();
  const customers: FormattedCustomersTable[] = await fetchFilteredCustomers(query);
  return(
    <div><CustomersTable customers={customers} /></div>
  )
}

