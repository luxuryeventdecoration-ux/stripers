import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json();

        if (password !== process.env.MASTER_PASSWORD) {
            return NextResponse.json(
                { success: false, error: "Invalid password" },
                { status: 401 }
            );
        }

        const client = await clientPromise;
        const db = client.db("checkout_db");
        const payments = await db
            .collection("payments")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        // Convert ObjectId to string for JSON serialization
        const data = payments.map((p) => ({
            ...p,
            _id: p._id.toString(),
        }));

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Master API error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
