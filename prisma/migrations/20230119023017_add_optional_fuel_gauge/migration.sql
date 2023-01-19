-- AlterTable
ALTER TABLE `FuelUpdate` MODIFY `fuelGaugeBefore` INTEGER NULL,
    MODIFY `fuelGaugeAfter` INTEGER NULL;

-- AlterTable
ALTER TABLE `Vehicle` MODIFY `maxFuelGauge` INTEGER NULL,
    MODIFY `initialFuelGauge` INTEGER NULL;
