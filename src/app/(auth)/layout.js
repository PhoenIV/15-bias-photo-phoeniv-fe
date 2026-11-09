import { redirect } from "next/navigation";

import { AUTH_ROUTES } from "@/constants/authRoutes";
import { hasAuthCookie } from "@/lib/authServer";

import { GuestGuard } from "@/components/guards";

export default async function AuthLayout({ children }) {
  if (await hasAuthCookie()) {
    redirect(AUTH_ROUTES.MARKETPLACE);
  }

  return <GuestGuard>{children}</GuestGuard>;
}
