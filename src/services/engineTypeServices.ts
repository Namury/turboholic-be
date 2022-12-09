import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";

export async function getEngineTypeService(): Promise<response> {
  try {
    const engineType = await prisma.engineType.findMany();

    return {
      status: true,
      data: { engineType },
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
