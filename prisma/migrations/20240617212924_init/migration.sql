/*
  Warnings:

  - You are about to drop the `_ListeProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ListeProduct" DROP CONSTRAINT "_ListeProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ListeProduct" DROP CONSTRAINT "_ListeProduct_B_fkey";

-- DropTable
DROP TABLE "_ListeProduct";

-- CreateTable
CREATE TABLE "liste_items" (
    "id" TEXT NOT NULL,
    "listeId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "liste_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "liste_items" ADD CONSTRAINT "liste_items_listeId_fkey" FOREIGN KEY ("listeId") REFERENCES "listes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liste_items" ADD CONSTRAINT "liste_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
