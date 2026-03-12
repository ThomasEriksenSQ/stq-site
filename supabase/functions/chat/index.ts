import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Fetch knowledge base
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
    const { data: knowledge } = await supabase
      .from("knowledge_base")
      .select("category, visibility, content")
      .in("visibility", ["public", "ai_only"]);

    const knowledgeText = (knowledge || [])
      .map((k: any) => `[${k.category}] ${k.content}`)
      .join("\n\n");

    const systemPrompt = `Du er STACQs AI-assistent på nettsiden stacq.no. Du svarer alltid på norsk med en profesjonell og kortfattet tone.

Du må følge disse reglene strengt:
- Svar KUN basert på informasjonen som er oppgitt under
- Hvis svaret ikke finnes i informasjonen under, svar: "Det har jeg ikke informasjon om — ta gjerne kontakt med oss direkte på thomas@stacq.no eller jr@stacq.no"
- Aldri gjet, anta eller fyll inn detaljer som ikke står eksplisitt i informasjonen
- Aldri nevn konkrete selskaper, produkter, priser eller ordninger med mindre det står eksplisitt
- Hold svarene korte — maks 3-4 setninger med mindre brukeren ber om detaljer

INFORMASJON OM STACQ:
---
${knowledgeText}
---`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "For mange forespørsler. Prøv igjen om litt." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI-tjenesten er midlertidig utilgjengelig." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI-feil. Prøv igjen." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Ukjent feil" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
