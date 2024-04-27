import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const paymentTransactionCookie = createCookie("paymentTransaction", {
  maxAge: 3600, // one hour
});

export const cartCookie = createCookie("cart", {
  maxAge: 31_536_000,
});

export const distinctIdCookie = createCookie("distinctId", {
  maxAge: 31_536_000,
});

export const addressCookie = createCookie("address", {
  maxAge: 31_536_000,
});
