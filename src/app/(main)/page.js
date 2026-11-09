import { redirect } from "next/navigation";

import { AUTH_ROUTES } from "@/constants/authRoutes";
import { hasAuthCookie } from "@/lib/authServer";

import { LandingPage } from "@/features/landing/LandingPage";

export default async function Home() {
  if (await hasAuthCookie()) {
    redirect(AUTH_ROUTES.MARKETPLACE);
  }

  return <LandingPage />;
}
