import LoopsClient from "loops";

export async function sendEmail(
  transactionId: string,
  email: string,
  data: any,
) {
  const loops = new LoopsClient(process.env.LOOPS_API);
  console.log("Sending email to: ", email);
  const result = await loops.sendTransactionalEmail(transactionId, email, data);
  console.log("Transaction Id: ", transactionId, result);
}
