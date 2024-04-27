export type DeliveryMethodType = {
  id: string;
  storeId: string;
  name: string;
  description?: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
};
