/*
  Warnings:

  - A unique constraint covering the columns `[formattedName]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `formattedName` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "formattedName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "schools" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "formattedName" TEXT NOT NULL,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "formattedName" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ListeProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "schools_formattedName_key" ON "schools"("formattedName");

-- CreateIndex
CREATE UNIQUE INDEX "listes_formattedName_key" ON "listes"("formattedName");

-- CreateIndex
CREATE UNIQUE INDEX "_ListeProduct_AB_unique" ON "_ListeProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ListeProduct_B_index" ON "_ListeProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "categories_formattedName_key" ON "categories"("formattedName");

-- AddForeignKey
ALTER TABLE "listes" ADD CONSTRAINT "listes_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListeProduct" ADD CONSTRAINT "_ListeProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "listes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListeProduct" ADD CONSTRAINT "_ListeProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
