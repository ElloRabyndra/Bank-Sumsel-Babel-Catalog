// app/admin/page.tsx
"use client";

import React from "react";
import { DashboardHeader } from "@/components/admin/dashboard/DashboardHeader";
import { StatsGrid } from "@/components/admin/dashboard/StatsGrid";
import { RecentProductsTable } from "@/components/admin/dashboard/RecentProductsTable";
import { DashboardSkeleton } from "@/components/admin/dashboard/DashboardSkeleton";
import { useDashboardData } from "@/hooks/useDashboardData";

const AdminDashboard = () => {
  const [mounted, setMounted] = React.useState(false);
  const { stats, recentProducts, getCategoryById } = useDashboardData();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      <DashboardHeader />
      <StatsGrid stats={stats} />
      <RecentProductsTable
        products={recentProducts}
        getCategoryById={getCategoryById}
      />
    </div>
  );
};

export default AdminDashboard;