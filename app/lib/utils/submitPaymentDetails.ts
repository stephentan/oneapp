import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1),
});

export const schemaWithContact = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  mobile: z.string().min(11),
});

export const schemaWithDelivery = z.object({
  name: z.string().min(1),
  shippingStreet: z.string().min(1),
  shippingCity: z.string().min(1),
  shippingZipCode: z.string().min(1),
});

export const schemaWithContactAndDelivery = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  mobile: z.string().min(11),
  shippingStreet: z.string().min(1),
  shippingCity: z.string().min(1),
  shippingZipCode: z.string().min(1),
});
