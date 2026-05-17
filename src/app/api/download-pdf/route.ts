import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "No URL" }, { status: 400 });

  try {
    console.log("Fetching PDF from:", url); 
    const response = await fetch(url);
    console.log("Response status:", response.status); 
    
    if (!response.ok) return NextResponse.json({ error: "Failed" }, { status: response.status });

    const buffer = await response.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="document.pdf"`,
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}