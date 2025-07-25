import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { checkUserRole } from "./dal";
import { UserType } from "./types";

const adminOnlyRoutes = ["/admin", "/users/official"];
const officialOnlyRoutes = ["/official", "/users/constituent", "/users"];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = adminOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isOfficialRoute = officialOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect unauthenticated users trying to access protected routes
  if (
    !user &&
    (isAdminRoute || isOfficialRoute || pathname.startsWith("/app"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  const userRole = await checkUserRole();
  // Admin-only route protection
  if (user && isAdminRoute && userRole != UserType.ADMIN) {
    const url = request.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.redirect(url);
  }

  // Official-only route protection (userType 1 or 2)
  if (
    user &&
    isOfficialRoute &&
    userRole != UserType.OFFICIAL &&
    userRole != UserType.ADMIN
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
