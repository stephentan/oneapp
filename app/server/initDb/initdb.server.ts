import { prisma } from "~/db.server";
import DB_MIGRATION_20230603_A_S3_MIGRATIONServer from "./DB_MIGRATION_20230603_A_S3_MIGRATION.server";
import DB_MIGRATION_20230605_A_SLUGIFYPRODUCTSCOLLECTIONServer from "./DB_MIGRATION_20230605_A_SLUGIFYPRODUCTSCOLLECTION.server";
import DB_MIGRATION_20230619_A_UPDATESEARCHFIELDPRODUCT from "./DB_MIGRATION_20230619_A_UPDATESEARCHFIELDPRODUCT";
import DB_MIGRATION_20230701_A_S3_RESIZEServer from "./DB_MIGRATION_20230701_A_S3_RESIZE.server";
import DB_MIGRATION_20230901_A_COUNTRYPHServer from "./DB_MIGRATION_20230901_A_COUNTRYPH.server";
import DB_MIGRATION_20240326_A_SEARCHFIELD_FIXServer from "./DB_MIGRATION_20240326_A_SEARCHFIELD_FIX.server";

const migrations = [
  DB_MIGRATION_20230603_A_S3_MIGRATIONServer,
  DB_MIGRATION_20230605_A_SLUGIFYPRODUCTSCOLLECTIONServer,
  DB_MIGRATION_20230619_A_UPDATESEARCHFIELDPRODUCT,
  DB_MIGRATION_20230701_A_S3_RESIZEServer,
  DB_MIGRATION_20230901_A_COUNTRYPHServer,
  DB_MIGRATION_20240326_A_SEARCHFIELD_FIXServer,
];
export default async function () {
  for (const migration of migrations) {
    const data = migration();

    const initDb = await prisma.initDb.findFirst({
      where: {
        name: data.name,
      },
    });

    if (!initDb) {
      await data.execute();
      await prisma.initDb.create({
        data: {
          name: data.name,
        },
      });
    }
  }
}
