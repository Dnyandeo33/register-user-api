import { NextResponse } from "next/server";
import prisma from "../../../prisma";

async function main() {
    try {
        await prisma.$connect();
    } catch (error) {
        return Error("Database Connection Unsuccessful")
    }
}



export async function GET(req: Request, res: NextResponse) {
    try {
        await main();
        const users = await prisma.user.findMany();
        return NextResponse.json({ message: "success,", users })
    } catch (error) {
        return NextResponse.json({ message: "Error", error })
    } finally {
        await prisma.$disconnect();
    }
}


export async function POST(req: Request, res: NextResponse) {
    try {
        const { email, password } = await req.json();
        await main();
        const user = await prisma.user.create({
            data: {
                email,
                password
            },
        })
        return NextResponse.json({ message: "User created successfully ", user }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "User already Exist ", error }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
}

