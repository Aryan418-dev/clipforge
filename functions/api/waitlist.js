function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestOptions() {
  return json({}, 204);
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const {
      name,
      email,
      platform,
      niche,
      monthly_volume,
      biggest_challenge,
      consent,
      source,
    } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return json({ error: "Please enter a valid name." }, 400);
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Please enter a valid email address." }, 400);
    }
    if (!platform || typeof platform !== "string") {
      return json({ error: "Please select a content platform." }, 400);
    }
    if (!niche || typeof niche !== "string") {
      return json({ error: "Please select or enter your niche." }, 400);
    }
    if (!monthly_volume || typeof monthly_volume !== "string") {
      return json({ error: "Please select your monthly video volume." }, 400);
    }
    if (
      !biggest_challenge ||
      typeof biggest_challenge !== "string" ||
      biggest_challenge.trim().length < 5
    ) {
      return json(
        { error: "Please share your biggest editing challenge (at least a few words)." },
        400
      );
    }
    if (!consent) {
      return json(
        { error: "You must agree to the privacy notice to join the waitlist." },
        400
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
      source: source || "landing",
    };

    const supabaseUrl = context.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = context.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return json(
        {
          success: true,
          entry: {
            ...payload,
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
          },
          note: "Supabase not configured — registration accepted but not persisted. Add env vars in Cloudflare Pages settings.",
        },
        201
      );
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      if (
        res.status === 409 ||
        errText.includes("duplicate") ||
        errText.includes("unique") ||
        errText.includes("23505")
      ) {
        return json({ error: "This email is already registered on the waitlist." }, 409);
      }
      console.error("Supabase error", res.status, errText);
      return json({ error: "Something went wrong. Please try again." }, 500);
    }

    const data = await res.json();
    const entry = Array.isArray(data) ? data[0] : data;
    return json({ success: true, entry }, 201);
  } catch (err) {
    console.error("Waitlist POST error", err);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const key = url.searchParams.get("key");
  const adminKey = context.env.ADMIN_KEY || "clipforge-admin-dev";

  if (key !== adminKey) {
    return json({ error: "Unauthorized" }, 401);
  }

  const supabaseUrl = context.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = context.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return json({ count: 0, entries: [], note: "Supabase not configured" });
  }

  const res = await fetch(
    `${supabaseUrl}/rest/v1/waitlist?select=*&order=created_at.desc`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    }
  );

  if (!res.ok) {
    return json({ error: "Failed to load entries" }, 500);
  }

  const entries = await res.json();
  return json({ count: Array.isArray(entries) ? entries.length : 0, entries });
}
