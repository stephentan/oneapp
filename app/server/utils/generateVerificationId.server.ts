import { customAlphabet } from "nanoid";
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 25);
const nanoShortId = customAlphabet("0123456789", 6);
export default function generateVerificationCode() {
  return nanoid();
}

export function generateVerificationShortCode() {
  return nanoShortId();
}
