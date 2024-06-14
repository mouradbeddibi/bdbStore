/*
  Warnings:

  - You are about to drop the column `sku` on the `products` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "products_sku_key";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "sku";
