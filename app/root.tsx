import { useCallback, useEffect, useState } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import {
  getCurrentUser,
  signIn as puterSignIn,
  signOut as puterSignOut,
} from "../lib/puter.action";
import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const DEFAULT_AUTH_STATE : AuthState = {

  isSignedIn : false,
  userName : null,
  userId : null,
  isLoading : true
}

export default function App() {
  const [authState, setAuthState] = useState<AuthState>(DEFAULT_AUTH_STATE);

  const refreshAuth = useCallback(async () => {
    const user = await getCurrentUser();

    if (user) {
      setAuthState({
        isSignedIn: true,
        userName: user.username,
        userId: user.uuid,
        isLoading: false,
      });
      return true;
    }

    setAuthState({ ...DEFAULT_AUTH_STATE, isLoading: false });
    return false;
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const signIn = useCallback(async () => {
    try {
      const ok = await puterSignIn();
      if (!ok) return false;
      return await refreshAuth();
    } catch (error) {
      console.error("Sign in fail hua:", error);
      return false;
    }
  }, [refreshAuth]);

  const signOut = useCallback(async () => {
    try {
      await puterSignOut();
      await refreshAuth();
      return true;
    } catch (error) {
      console.error("Sign out fail hua:", error);
      return false;
    }
  }, [refreshAuth]);

  const context: AuthContext = {
    ...authState,
    refreshAuth,
    signIn,
    signOut,
  };

  return <Outlet context={context} />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
