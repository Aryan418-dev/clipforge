import { NextRequest, NextResponse } from "next/server";
import { addEntry, getEntries } from "@/lib/waitlist-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, platform, niche, monthly_volume, biggest_challenge, consent } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!platform || typeof platform !== "string") {
      return NextResponse.json({ error: "Please select a content platform." }, { status: 400 });
    }
    if (!niche || typeof niche !== "string") {
      return NextResponse.json({ error: "Please select or enter your niche." }, { status: 400 });
    }
    if (!monthly_volume || typeof monthly_volume !== "string") {
      return NextResponse.json({ error: "Please select your monthly video volume." }, { status: 400 });
    }
    if (!biggest_challenge || typeof biggest_challenge !== "string" || biggest_challenge.trim().length < 5) {
      return NextResponse.json(
        { error: "Please share your biggest editing challenge (at least a few words)." },
        { status: 400 }
      );
    }
    if (!consent) {
      return NextResponse.json(
        { error: "You must agree to the privacy notice to join the waitlist." },
        { status: 400 }
      );
    }

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      platform,
      niche,
      monthly_volume,
      biggest_challenge: biggest_challenge.trim(),
      consent: true,
      source: (body.source as string) || "landing",
    };

    // Prefer Supabase when configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data, error } = await supabase
          .from("waitlist")
          .insert(payload)
          .select()
          .single();

        if (error) {
          if (error.code === "23505") {
            return NextResponse.json(
              { error: "This email is already registered on the waitlist." },
              { status: 409 }
            );
          }
          console.error("Supabase error:", error);
          // fall through to file store for local/dev
        } else {
          return NextResponse.json({ success: true, entry: data }, { status: 201 });
        }
      } catch (e) {
        console.error("Supabase unavailable, using file store", e);
      }
    }

    // File-based fallback (works locally; on Vercel use Supabase)
    const result = await addEntry(payload);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }
    return NextResponse.json({ success: true, entry: result.entry }, { status: 201 });
  } catch (err) {
    console.error("Waitlist POST error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  const adminKey = process.env.ADMIN_KEY || "clipforge-admin-dev";

  if (key !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Prefer Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return NextResponse.json({ count: data.length, entries: data });
      }
    } catch (e) {
      console.error("Supabase GET failed", e);
    }
  }

  const entries = await getEntries();
  return NextResponse.json({ count: entries.length, entries });
}
