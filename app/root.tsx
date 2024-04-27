import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import React from "react";

import { Toaster as ShadCnToaster } from "~/components/ui/toaster";
import { getUser } from "~/session.server";
import "./styles/global.css";
import "./styles/tailwind.css";

export const meta: MetaFunction = () => [
  {
    charset: "utf-8",
    title: "Rabbit",
    viewport: "width=device-width,initial-scale=1",
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}
        <ShadCnToaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export default function App() {
  return <Outlet />;
}
