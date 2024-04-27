import initdbServer from "../initDb/initdb.server";
import { initJobs } from "../jobs/initjobs.server";
export default function init() {
  initdbServer();
  initJobs();
}
