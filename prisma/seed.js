import { prisma_Connector } from "../index.js";


async function main() {
  await  prisma_Connector?.permissionMaster.createMany({
    data: [
      { name: 'Others', active: 'y',COMPCODE:"all"},
    ],
    skipDuplicates: true, // optional: avoid inserting duplicates
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma_Connector.$disconnect();
  });
