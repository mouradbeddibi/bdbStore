/*
  Warnings:

  - You are about to drop the column `listeId` on the `liste_items` table. All the data in the column will be lost.
  - Added the required column `listeName` to the `liste_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "liste_items" DROP CONSTRAINT "liste_items_listeId_fkey";

-- AlterTable
ALTER TABLE "liste_items" DROP COLUMN "listeId",
ADD COLUMN     "listeName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "liste_items" ADD CONSTRAINT "liste_items_listeName_fkey" FOREIGN KEY ("listeName") REFERENCES "listes"("formattedName") ON DELETE CASCADE ON UPDATE CASCADE;
