import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import "react-toastify/dist/ReactToastify.css";
import { distinctIdCookie } from "~/cookies.server";
import {
  createDistinctIdIfNotExist,
  generateDistinctId,
} from "~/lib/utils/generateDistinctId";

export function links() {
  return [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Comfortaa&display=swap",
    },
  ];
}

export async function loader(LoaderFunctionArgs: LoaderFunctionArgs) {
  const { request } = LoaderFunctionArgs;
  const urlObject = new URL(request.url);
  const url = urlObject.hostname;
  const headerCookie = request.headers.get("Cookie");
  const distinctIdCookieValue = await distinctIdCookie.parse(headerCookie);
  if (url === process.env.DOMAIN || url === "www." + process.env.DOMAIN) {
    return redirect("/login", {
      ...(await createDistinctIdIfNotExist(request)),
    });
  } else {
    // const responseObject = await ShopLoader(LoaderFunctionArgs, url);
    // const headers = {};
    // if (!distinctIdCookieValue) {
    //   const generatedDistinctId = await generateDistinctId();
    //   headers["Set-Cookie"] =
    //     await distinctIdCookie.serialize(generatedDistinctId);
    // }
    // if (responseObject.store === null) {
    //   return redirect("/login", {
    //     ...(await createDistinctIdIfNotExist(request)),
    //   });
    // }
    // return json(responseObject, { headers });
  }
}
export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      {/* <Hero />
      <Footer /> */}
    </>
  );
}
