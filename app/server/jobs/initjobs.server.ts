import endOfDayOrderCancellationServer from "./endOfDayOrderCancellation.server";

export async function initJobs() {
  endOfDayOrderCancellationServer();
}
