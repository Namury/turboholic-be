import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";

export async function getFuelTypeService(): Promise<response> {
  try {
    const fuelType = await prisma.fuelType.findMany({
      orderBy: {
        price: "desc",
      },
    });

    return {
      status: true,
      data: { fuelType },
      message: "Get Fuel Type Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Fuel Type Failed",
      error: String(err),
    };
  }
}

export async function getFuelTypeByEngineService(
  engineTypeId: number
): Promise<response> {
  try {
    const fuelType = await prisma.fuelType.findMany({
      where: {
        engineTypeId,
      },
      orderBy: {
        price: "desc",
      },
    });

    return {
      status: true,
      data: { fuelType },
      message: "Get Fuel Type by Engine Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Fuel Type by Engine Failed",
      error: String(err),
    };
  }
}
