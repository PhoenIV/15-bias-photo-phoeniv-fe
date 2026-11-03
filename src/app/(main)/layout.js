import { GlobalLayout } from "@/components/layouts/GlobalLayout";

import AppProviders from "@/providers/AppProviders";

export default function MainLayout({ children }) {
  return (
    <AppProviders>
      <GlobalLayout>{children}</GlobalLayout>
    </AppProviders>
  );
}
