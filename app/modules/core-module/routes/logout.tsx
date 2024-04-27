import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { logout } from "~/session.server";

import type { LoaderFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  return logout(request);
}

export async function loader({ request }: LoaderFunctionArgs) {
  return logout(request);
}
