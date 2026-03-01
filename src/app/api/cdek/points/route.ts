import { NextRequest, NextResponse } from "next/server";
import { getDeliveryPoints } from "@/lib/cdek/client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city_code = searchParams.get("city_code");
    const postal_code = searchParams.get("postal_code");

    const points = await getDeliveryPoints({
      city_code: city_code ? parseInt(city_code) : undefined,
      postal_code: postal_code || undefined,
      country_code: "RU",
      type: "PVZ", // только пункты выдачи
    });

    return NextResponse.json({ points });
  } catch (error: any) {
    console.error("CDEK points error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get delivery points" },
      { status: 500 }
    );
  }
}
