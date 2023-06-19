import { NextResponse } from "next/server";
import { json } from "stream/consumers";
import { prisma } from "../prisma.db";
import { main } from "../route";


export const GET = async (req: Request, res: any) => {
    try {
        const id = res.params.id
        await main();
        const user = await prisma.user.findFirst({ where: { id } })
        if (!user)
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        return NextResponse.json({ message: "Success", user }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error", error })
    } finally {
        await prisma.$disconnect();
    }
}



export const PUT = async (req: Request, res: any) => {
    try {
        const id = res.params.id
        const { email, password } = await req.json();
        await main();
        const user = await prisma.user.update({ data: { email, password }, where: { id } });
        return NextResponse.json({ message: "User Updated", user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 })

    } finally {
        await prisma.$disconnect();
    }
}

export const DELETE = async (req: Request, res: any) => {
    try {
        const id = res.params.id
        await main();
        const user = await prisma.user.delete({ where: { id } });
        return NextResponse.json({ message: "User Deleted", user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
}