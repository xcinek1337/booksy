import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password,name,phone } = body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    return NextResponse.json(
      { message: "Taki uzytkowmnik istnieje ", userExist: true },
      { status: 200 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({data:{email:email,password:hashedPassword,name:name,phone:phone}
  })  

  return NextResponse.json({ newUser });
}
