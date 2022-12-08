/*
  Warnings:

  - Changed the type of `fuelGaugeBefore` on the `FuelUpdate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fuelGaugeAfter` on the `FuelUpdate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `refuelAmount` on the `FuelUpdate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `refuelDate` on the `FuelUpdate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `currentOdometer` on the `FuelUpdate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `maxFuelCapacity` on the `Vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `maxFuelGauge` on the `Vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `initialFuelGauge` on the `Vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `initialOdometer` on the `Vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FuelUpdate" DROP COLUMN "fuelGaugeBefore",
ADD COLUMN     "fuelGaugeBefore" INTEGER NOT NULL,
DROP COLUMN "fuelGaugeAfter",
ADD COLUMN     "fuelGaugeAfter" INTEGER NOT NULL,
DROP COLUMN "refuelAmount",
ADD COLUMN     "refuelAmount" INTEGER NOT NULL,
DROP COLUMN "refuelDate",
ADD COLUMN     "refuelDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "currentOdometer",
ADD COLUMN     "currentOdometer" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "maxFuelCapacity",
ADD COLUMN     "maxFuelCapacity" INTEGER NOT NULL,
DROP COLUMN "maxFuelGauge",
ADD COLUMN     "maxFuelGauge" INTEGER NOT NULL,
DROP COLUMN "initialFuelGauge",
ADD COLUMN     "initialFuelGauge" INTEGER NOT NULL,
DROP COLUMN "initialOdometer",
ADD COLUMN     "initialOdometer" INTEGER NOT NULL;
