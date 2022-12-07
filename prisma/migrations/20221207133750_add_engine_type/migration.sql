/*
  Warnings:

  - You are about to drop the column `fuelType` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `machineType` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `engineTypeId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialFuelTypeId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "fuelType",
DROP COLUMN "machineType",
ADD COLUMN     "engineTypeId" INTEGER NOT NULL,
ADD COLUMN     "initialFuelTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "EngineType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "EngineType_id_key" ON "EngineType"("id");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_engineTypeId_fkey" FOREIGN KEY ("engineTypeId") REFERENCES "EngineType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_initialFuelTypeId_fkey" FOREIGN KEY ("initialFuelTypeId") REFERENCES "FuelType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
