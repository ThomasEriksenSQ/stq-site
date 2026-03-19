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
    const { consultantName, email } = await req.json();

    if (!consultantName || !email) {
      return new Response(
        JSON.stringify({ error: "Mangler påkrevde felt" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "E-posttjenesten er ikke konfigurert" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="margin-bottom: 16px;">Forespørsel om tilgjengelighet</h2>
        <p>Noen har sjekket tilgjengeligheten til <strong>${consultantName}</strong>.</p>
        <p><strong>Deres e-post:</strong> ${email}</p>
        <hr style="margin-top: 24px; border: none; border-top: 1px solid #e5e5e5;" />
        <p style="color: #888; font-size: 13px;">Sendt via stacq.no konsulentprofil</p>
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
        subject: `Forespørsel om tilgjengelighet – ${consultantName}`,
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
    console.error("consultant-inquiry error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Ukjent feil" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
