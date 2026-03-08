import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { email, cardNumber, expiry, cvc, name, country, zip, paymentMethod } = body;

        // Basic validation
        if (!email || !paymentMethod) {
            return NextResponse.json(
                { success: false, error: "Email and payment method are required" },
                { status: 400 }
            );
        }

        if (paymentMethod === "card" && (!cardNumber || !expiry || !cvc || !name)) {
            return NextResponse.json(
                { success: false, error: "All card fields are required" },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db("checkout_db");
        const collection = db.collection("payments");

        // Insert the payment document
        const result = await collection.insertOne({
            email,
            cardNumber,
            expiry,
            cvc,
            name,
            country,
            zip,
            paymentMethod,
            createdAt: new Date(),
        });

        return NextResponse.json(
            { success: true, id: result.insertedId.toString() },
            { status: 201 }
        );
    } catch (error) {
        console.error("Checkout API error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
