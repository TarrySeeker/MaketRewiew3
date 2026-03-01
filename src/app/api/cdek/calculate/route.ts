import { NextRequest, NextResponse } from "next/server";
import { calculateTariff } from "@/lib/cdek/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const tariffs = await calculateTariff({
      type: 1,
      currency: 1,
      from_location: {
        code: 270, // Новосибирск (код города)
      },
      to_location: {
        city: body.city,
        postal_code: body.postal_code,
      },
      packages: body.packages || [
        {
          weight: body.weight || 1000,
          length: 30,
          width: 20,
          height: 10,
        },
      ],
    });

    return NextResponse.json({ tariffs });
  } catch (error: any) {
    console.error("CDEK calculate error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to calculate delivery" },
      { status: 500 }
    );
  }
}
