import { distinctIdCookie } from "~/cookies.server";

export function generateDistinctId(): string {
  const timestamp = Date.now().toString();
  return (
    timestamp +
    "-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
  );
}

export const getDistinctId = async (request: Request) => {
  const headerCookie = request.headers.get("Cookie");
  const distinctIdCookieValue = await distinctIdCookie.parse(headerCookie);
  if (distinctIdCookieValue) {
    return distinctIdCookieValue;
  }
};
export const createDistinctIdIfNotExist = async (request: Request) => {
  const headerCookie = request.headers.get("Cookie");
  const distinctIdCookieValue = await distinctIdCookie.parse(headerCookie);
  if (distinctIdCookieValue) {
    return {};
  } else {
    const distinctId = generateDistinctId();
    return {
      headers: {
        "Set-Cookie": distinctId,
      },
    };
  }
};
