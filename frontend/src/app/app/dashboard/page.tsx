"use server";

import DashboardGraph from "@/components/DashboardGraph";
export async function generateMetadata() {
  return {
    title: "Dashboard - Health Tracker",
    description: "View your logs.",
  };
}
export default async function Dashboard() {
  return <DashboardGraph />;
}
