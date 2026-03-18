import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { full_name, email, phone, cv_url } = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "E-posttjenesten er ikke konfigurert" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const cvLine = cv_url
      ? `<p><strong>CV:</strong> <a href="${cv_url}" target="_blank">${cv_url}</a></p>`
      : `<p><strong>CV:</strong> Ikke lastet opp</p>`;

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="margin-bottom: 16px;">Ny søknad fra nettsiden</h2>
        <p><strong>Navn:</strong> ${full_name}</p>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "Ikke oppgitt"}</p>
        ${cvLine}
        <hr style="margin-top: 24px; border: none; border-top: 1px solid #e5e5e5;" />
        <p style="color: #888; font-size: 13px;">Sendt via stacq.no søknadsskjema</p>
      </div>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "STACQ Nettside <post@stacq.no>",
        to: ["jr@stacq.no", "thomas@stacq.no"],
        subject: `Ny søknad fra ${full_name}`,
        html: htmlBody,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend error:", resendRes.status, errText);
      return new Response(
        JSON.stringify({ error: "Kunne ikke sende e-post" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = await resendRes.json();

    return new Response(
      JSON.stringify({ success: true, id: result.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("send-application-email error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Ukjent feil" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
