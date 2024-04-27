import { json, LoaderFunctionArgs } from "@remix-run/node";
import init from "~/server/init";
import initdbServer from "~/server/initDb/initdb.server";

export async function loader({ request }: LoaderFunctionArgs) {
  initdbServer();
  return json({});
}

export default function () {
  return <div>TEST</div>;
}
