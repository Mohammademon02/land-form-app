
import { Prisma } from "@prisma/client";

export async function deleteOldData() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  await Prisma.landForm.deleteMany({
    where: {
      createdAt: {
        lt: sevenDaysAgo,
      },
    },
  });
}
