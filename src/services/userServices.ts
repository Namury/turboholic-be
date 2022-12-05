import { prisma } from "$utils/prisma.utils";
import { UserRegister, UserResponse, UserToken } from "$utils/user.utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";


function createToken(user: UserToken) {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET_TOKEN?.toString() || "",
    {
      expiresIn: "24h",
    }
  );
  return token;
}

export async function userLoginService(
  email: string,
  password: string
): Promise<any> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: { profile: true },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken(user);
      const userDetails: UserResponse = {
        token: token,
        name: user.name,
        email: user.email,
      };

      if (user.role == "ADMIN") {
        return { status: true, userDetails };
      } else {
        const teacherDetails: GuruResponseObject = {
          ...userDetails,
          nip: user.profile?.NIP || "",
        };
        return { status: true, userDetails: teacherDetails };
      }
    } else {
      throw new Error("Incorrect");
    }
  } catch (err: any) {
    return { status: false, error: "Unauthorized" };
  }
}

export async function userRegisterSekolahService(
  user: UserRegister
): Promise<any> {
  try {
    const selectedUserField = {
      id: true,
      email: true,
      name: true,
      schoolId: true,
    };

    const selectedSchoolField = { id: true, name: true };
    const createdSchool = await prisma.school.create({
      data: {
        name: user.name,
      },
      select: selectedSchoolField,
    });
    user.password = await bcrypt.hash(user.password, 12);

    const createdUser = await prisma.user.create({
      data: {
        ...user,
        role: "ADMIN",
        schoolId: createdSchool.id,
      },
      select: selectedUserField,
    });
    const token = createToken(createdUser);

    return { status: true, user: createdUser, school: createdSchool, token };
  } catch (err: unknown) {
    return { status: false, error: { message: "Register Failed" } };
  }
}
