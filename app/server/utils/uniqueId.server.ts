import { customAlphabet } from "nanoid";
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 16);
export default function generateId() {
  return nanoid();
}
//89a4fb0c618a49728325f3fc93b2cb72
