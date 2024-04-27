import { DateTime } from "luxon";
import { prisma } from "~/db.server";
import schedule from "node-schedule";
export default async function () {
  // */30 * * * *

  const job = schedule.scheduleJob("*/30 * * * *", async function () {
    const orders = await prisma.order.updateMany({
      where: {
        status: 0,
        createdAt: {
          lte: DateTime.local().minus({ hours: 1 }).toJSDate(),
        },
      },
      data: {
        status: -30,
      },
    });
  });

  // for (const migration of migrations) {
  //   const data = migration();

  //   const initDb = await prisma.initDb.findFirst({
  //     where: {
  //       name: data.name,
  //     },
  //   });

  //   if (!initDb) {
  //     await data.execute();
  //     await prisma.initDb.create({
  //       data: {
  //         name: data.name,
  //       },
  //     });
  //   }
  // }
}
