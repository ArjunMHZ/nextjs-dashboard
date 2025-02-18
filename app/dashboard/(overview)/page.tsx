 import CardWrapper, { Card } from '@/components/ui/dashboard/cards';
import RevenueChart from '@/components/ui/dashboard/revenue-chart';
import LatestInvoices from '@/components/ui/dashboard/latest-invoices';
import { lusitana } from '@/components/ui/fonts';

import { Suspense } from 'react';
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/components/ui/skeletons';
import { auth } from "@/auth";
import { redirect } from "next/navigation"; 

export default async function Page() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    redirect("/");
  }

  return (
    <main>
      <div className='mb-4 flex justify-between'>
      <h1 className={`${lusitana.className} text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <p className={`${lusitana.className}`}>Welcome, {session.user.name}!</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
        
      </div>
    </main>
  );
}

