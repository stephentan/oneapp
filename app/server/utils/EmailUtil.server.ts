import lodash from "lodash";
import Mailjet from "node-mailjet";
// ddbf99339306409ebe6553893e711885;
const mailjet = new Mailjet({
  // apiKey: "bc55dcc01ff27659e6e64b3b48ce1d92",
  // apiSecret: "47a9495f879596935889847987927b36",
  apiKey: "2233d8b23af92d8bae5d93f005a03ba9",
  apiSecret: "971d1ab581b120e021b165b5c32e1bd4",
});

const { get } = lodash;
export function sendEmailWithTemplate(
  to: string,
  subject: string,
  templateId,
  data,
  options = {},
) {
  const cc = get(options, "cc", "");
  const message = {
    Messages: [
      {
        From: {
          Email: "info@shoprabbit.io",
          Name: "Shop Rabbit",
        },
        To: [{ Email: to }],
        Cc: (cc.length > 0 ? cc.split(",") : []).map((entry) => {
          return {
            Email: entry,
          };
        }),
        Subject: subject,
        Variables: data,
        TemplateID: templateId,
        TemplateLanguage: true,
        TemplateErrorReporting: {
          Email: "stephentan@ubihive.com",
          Name: "Stephen",
        },
        CustomID: "OTP",
      },
    ],
  };

  mailjet
    .post("send", { version: "v3.1" })
    .request(message)
    .then((result) => {})
    .catch((err) => {
      console.log(err);
    });
}

export function sendEmail(
  to: string,
  subject: string,
  html: string,
  options = {},
) {
  const cc = get(options, "cc", "");
  const message = {
    Messages: [
      {
        From: {
          Email: "info@shoprabbit.io",
          Name: "Shop Rabbit",
        },
        To: [{ Email: to }],
        Cc: (cc.length > 0 ? cc.split(",") : []).map((entry) => {
          return {
            Email: entry,
          };
        }),
        Subject: subject,
        HTMLPart: html,
        CustomID: "OTP",
      },
    ],
  };

  mailjet
    .post("send", { version: "v3.1" })
    .request(message)
    .then((result) => {})
    .catch((err) => {
      console.log(err);
    });
}
