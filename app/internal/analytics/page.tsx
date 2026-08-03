import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

import InternalAnalyticsDashboard from "./InternalAnalyticsDashboard";


export const metadata: Metadata = generateMetadata({ label: "Internal", title: "Analytics Dashboard", description: "Internal operations dashboard for Zakaa metrics and alerts." });
export default function InternalAnalyticsPage() {
  return <InternalAnalyticsDashboard />;
}
