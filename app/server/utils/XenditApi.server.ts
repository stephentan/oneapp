import { redirect } from "@remix-run/node";
import { platform } from "os";
import Xendit from "xendit-node";

import { padId } from "~/lib/utils/padId";
import { getCart } from "~/modules/core-module/models/cart.server";
import fetch_with_http_err from "./fetch_with_http_err";
import { getStoreById } from "~/modules/core-module/models/store.server";

export const getInvoice = async (invoiceId) => {
  const x = new Xendit({
    secretKey: process.env.XENDIT_API,
  });
  const { Invoice } = x;
  const invoiceSpecificOptions = {};
  const i = new Invoice(invoiceSpecificOptions);

  const resp = await i.getInvoice({
    invoiceID: invoiceId,
  });
  return resp;
};
export const chargeEWallet = async (id, total, ewallet, storeId, account) => {
  const x = new Xendit({
    secretKey: process.env.XENDIT_API,
  });
  const { EWallet } = x;
  const ewalletSpecificOptions = {};
  const ew = new EWallet(ewalletSpecificOptions);
  const resp = await ew.createEWalletCharge({
    referenceID: id,
    currency: "PHP",
    amount: parseFloat(total),
    checkoutMethod: "ONE_TIME_PAYMENT",
    channelCode: ewallet,
    channelProperties: {
      successRedirectURL: `${process.env.HOST_URL}order/${id}`,
      failureRedirectURL: `${process.env.HOST_URL}order/${id}`,
      cancelRedirectURL: `${process.env.HOST_URL}order/${id}`,
    },
    metadata: {
      branch_code: "tree_branch",
      orderId: id,
      storeId: storeId,
    },
  });
  return resp;
};
export const getAccountBalance = async (storeId: string) => {
  const store = await getStoreById(storeId);
  const basicAuth = `Basic ${Buffer.from(`${process.env.XENDIT_API}:`).toString(
    "base64",
  )}`;
  let headers = {
    Authorization: basicAuth,
    "Content-Type": "application/json",
    "for-user-id": store?.account,
  };

  const body = {};

  try {
    const test = await fetch_with_http_err("https://api.xendit.co/balance", {
      method: "GET",
      headers,
    });
  } catch (exception) {
    console.log("exception:", exception);
  }
};
export const chargeCard = async (tokenId, reference, total, account) => {
  const basicAuth = `Basic ${Buffer.from(`${process.env.XENDIT_API}:`).toString(
    "base64",
  )}`;
  let headers = {
    Authorization: basicAuth,
    "Content-Type": "application/json",
    "for-user-id": account,
    "with-split-rule": "splitru_39f7ee0d-1663-46f4-bd23-288bf57c9a09",
  };

  const body = {
    token_id: tokenId,
    external_id: "REF-" + reference,
    amount: total,
    currency: "PHP",
    isRecurring: false,
  };

  try {
    const test = await fetch_with_http_err(
      "https://api.xendit.co/credit_card_charges",
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      },
    );
    console.log("charge card result:", test, body);
  } catch (exception) {
    console.log("exception:", exception);
  }
  // const x = new Xendit({
  //   secretKey: process.env.XENDIT_API,
  // });
  // const { Card } = x;
  // const card = new Card({});
  // return card.createCharge({
  //   tokenID: tokenId,
  //   amount: total,
  //   isRecurring: false,
  //   externalID: "REF-" + reference,
  // });
};
export const createAccount = async ({ email, businessName }) => {
  const basicAuth = `Basic ${Buffer.from(`${process.env.XENDIT_API}:`).toString(
    "base64",
  )}`;

  try {
    let headers = {
      Authorization: basicAuth,
      "Content-Type": "application/json",
    };
    const body = {
      email: email,
      type: "OWNED",
      public_profile: {
        business_name: businessName,
      },
    };
    const test = await fetch_with_http_err(
      "https://api.xendit.co/v2/accounts",
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      },
    );

    return test;
  } catch (err) {
    console.log("error:", err);
  }
};
export const splitRule = async () => {
  const basicAuth = `Basic ${Buffer.from(`${process.env.XENDIT_API}:`).toString(
    "base64",
  )}`;
  try {
    let headers = {
      Authorization: basicAuth,
      "Content-Type": "application/json",
    };
    const body = {
      name: "tokenId",
      routes: [
        {
          percent_amount: 1.5,
          currency: "PHP",
          destination_account_id: "64c4b49b45ab27dd54d0b477",
          reference_id: "platform fee",
        },
      ],
    };
    const test = await fetch_with_http_err(
      "https://api.xendit.co/split_rules",
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      },
    );
    console.log("charge card result:", test, body);
  } catch (err) {
    console.log("error:", err);
  }
};
export const reverseCardCharges = async (order) => {
  const x = new Xendit({
    secretKey: process.env.XENDIT_API,
  });

  const { Card } = x;
  const card = new Card({});
  try {
    const refundRequest = {
      chargeID: order.xenditPaymentData.id,
      amount: order.xenditPaymentData.capture_amount,
      externalID: padId(order.orderNumber),
      xIdempotencyKey: "refund_" + order.id,
    };
    const data = await card.createRefund(refundRequest);
    return data;
  } catch (exception) {
    console.log("exception:", exception);
  }
};
export const createInvoice = async (order, store) => {
  const cart = await getCart(order.cartId);
  const x = new Xendit({
    secretKey: process.env.XENDIT_API,
  });

  const { Invoice } = x;

  const invoiceSpecificOptions = {};
  const i = new Invoice(invoiceSpecificOptions);

  const items = [];
  cart?.cartItems.map((entry) => {
    items.push({
      name: entry.product?.name,
      quantity: 1,
      price: entry.product?.price,
      url: "https://yourcompany.com/example_item",
    });
  });
  try {
    const resp = await i.createInvoice({
      externalID: String(order.orderNumber),
      amount: order.total,
      description: "Invoice to Order " + order.orderNumber,
      invoiceDuration: 86400,
      customer: {
        given_names: order.firstName,
        surname: order.lastName,
        email: order.email,
        mobile_number: order.phone,
        addresses: [
          {
            city: order.city,
            country: "Philippines",
            postal_code: order.postCode,
            state: order.region,
            street_line1: order.apartment,
          },
        ],
      },
      customerNotificationPreference: {
        invoice_created: ["email"],
        invoice_reminder: ["email"],
        invoice_paid: ["email"],
        invoice_expired: ["email"],
      },
      successRedirectURL:
        "http://" + store.slug + "/order/" + order.id + "/success",
      failureRedirectURL: "https://www.google.com",
      currency: "PHP",
      items,
      fees: [],
    });
    return resp;
  } catch (e) {}
};
