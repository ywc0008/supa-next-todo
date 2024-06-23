// RouterHandler, RSC, Middleare, ServerActions
// 위에 3개 중 RSC에서 쿠키를 조작할 수 없다.

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { setCookie, getCookie } from "cookies-next";
import { Database } from "@/types/supabase";

// -ServerActions, RouterHandler
export const createServerSideClient = async (serverComponent = false) => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => cookieStore.get(key)?.value,
        set: (key, value, options) => {
          if (serverComponent) return;
          cookieStore.set(key, value, options);
        },
        remove: (key, options) => {
          if (serverComponent) return;
          cookieStore.set(key, "", options);
        },
      },
    }
  );
};
// -RSC
export const createServerSideClientRSC = async () => {
  return createServerSideClient(true);
};
//- Middleware
export const createServerSideMiddleware = async (
  req: NextRequest,
  res: NextResponse
) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => getCookie(key, { req, res }),
        set: (key, value, options) => {
          setCookie(key, value, { req, res, ...options });
        },
        remove: (key, options) => {
          setCookie(key, "", { req, res, ...options });
        },
      },
    }
  );
};
