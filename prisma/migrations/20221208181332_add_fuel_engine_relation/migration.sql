/*
  Warnings:

  - Added the required column `engineTypeId` to the `FuelType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FuelType" ADD COLUMN     "engineTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FuelType" ADD CONSTRAINT "FuelType_engineTypeId_fkey" FOREIGN KEY ("engineTypeId") REFERENCES "EngineType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
