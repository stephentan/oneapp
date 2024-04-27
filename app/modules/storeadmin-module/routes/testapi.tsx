import fs from "fs";
import PDFUtil from "../utils/PDFUtil.server";
import { get } from "lodash";

const returnPdf = async (data) => {
  const file = fs.readFileSync(
    "/home/stan/projects/oneapp/app/temp/sales-invoice-sample.pdf",
  );

  const template = {
    isRenderTemplate: true,

    format: JSON.stringify({
      printCoordinates: false,
      yOrigin: "top",
      font: "Courier",
      fontBold: "Courier-Bold",
      positions: {
        invoiceNumber: {
          x: 510,
          y: 125,
          default: "1000123 ",
        },
        company: { x: 112, y: 90, default: "Anicorn Platics" },
        address: {
          x: 132,
          y: 126,
          default: "",
        },

        name: {
          x: 370,
          y: 187,
        },
        name$1: {
          x: 84,
          y: 187,
        },
        street: {
          x: 80,
          y: 210,
        },
        city: {
          x: 70,
          y: 221,
        },
        province: {
          x: 100,
          y: 233,
        },
        zip: {
          x: 250,
          y: 233,
        },
        street2: {
          x: 360,
          y: 210,
        },
        city2: {
          x: 350,
          y: 221,
        },
        province2: {
          x: 374,
          y: 233,
        },
        zip2: {
          x: 520,
          y: 233,
        },
        invoiceDate: {
          x: 490,
          y: 148,
        },
        subtotal: {
          x: 475,
          y: 550,
          styles: { textAlign: "right" },
        },
        total: {
          x: 475,
          y: 628,
          styles: { textAlign: "right" },
        },
        items: {
          x: 30,
          y: 418,
          lineSize: 19,
          subfields: {
            quantity: {
              x: 0,
              styles: { textAlign: "right" },
            },
            name: {
              x: 130,
            },
            price: {
              x: 380,
              styles: { textAlign: "right" },
            },
            subtotal: {
              x: 475,
              styles: { textAlign: "right" },
            },
          },
        },
      },
    }),
  };
  const test = await PDFUtil.generatePdf({
    pdfTemplate: template,
    existingPdfBytes: file,
    data,
    isMultiPage: false,
  });
  // console.log(test);
  // return test;
  let headers = new Headers({ "Content-Type": "application/pdf" });
  return new Response(test, { status: 200, headers });
};

export async function action(incomingActionData) {
  const { request } = incomingActionData;
  console.log("action called");
  const formData = await request.formData();
  console.log("request:", formData);
  const data = formData.get("data");
  console.log("data:", data);
  const orderData = JSON.parse(data);

  let street = "";
  let city = "";
  let province = "";
  let zip = "";
  console.log("orderData:", orderData);
  const address = orderData.address;
  if (address && address.length > 0) {
    const addressValues = address.split(",");
    console.log("addressValues:", address, addressValues);
    street =
      get(addressValues, "[0]", "") + " " + get(addressValues, "[1]", "");
    city = get(addressValues, "[" + (addressValues.length - 3) + "]", "");
    province = get(addressValues, "[" + (addressValues.length - 2) + "]", "");
    zip = get(addressValues, "[" + (addressValues.length - 1) + "]", "");
  }

  const orderItems = [];
  orderData.items.map((entry) => {
    let name = entry.name || "";
    if (name?.length > 44) {
      entry.name = name.substring(0, 44);
    }
    entry.price = "P " + entry.price;
    entry.subtotal = "P " + entry.subtotal;
    orderItems.push(entry);
    if (name?.length > 44) {
      orderItems.push({
        name: name.substring(44).trim(),
      });
    }
  });
  return returnPdf({
    // test: "abc",
    invoiceDate: "April 23, 2024",
    invoiceNumber: orderData.orderId,
    name: orderData.name,
    subtotal: orderData.total,
    total: orderData.total,
    address: "1 San Vicente St, Malabon, 1477 Metro Manila",
    street,
    city,
    province,
    zip,
    street2: street,
    city2: city,
    province2: province,
    zip2: zip,
    items: orderItems,
  });
}
export async function loader() {
  return returnPdf({
    test: "abc",
    invoiceDate: "April 23, 2024",
    invoiceNumber: "11112",
    name: "ABC",
    subtotal: 30,
    total: 30,
    address: "Lessandra Bacoor, Block 7 Lot 3 Gozo Street",

    items: [
      {
        name: "ITEM A",
        quantity: 3,
        price: 30.54,
        subtotal: 300,
      },
      {
        name: "ITEM A",
        quantity: 3,
        price: 130.54,
        subtotal: 300,
      },
      {
        name: "ITEM A",
        quantity: 3,
        price: 30.54,
        subtotal: 300,
      },
      {
        name: "ITEM A",
        quantity: 3,
        price: 30.54,
        subtotal: 300,
      },
      {
        name: "ITEM A",
        quantity: 3,
        price: 30.54,
        subtotal: 300,
      },
    ],
  });
}
