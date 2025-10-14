import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendResultsRequest {
  userEmail: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  totalTime: number;
  resultsHtml: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userEmail, score, totalQuestions, percentage, totalTime, resultsHtml }: SendResultsRequest = await req.json();

    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    const timeFormatted = `${minutes}min ${seconds}s`;

    console.log("Envoi des résultats pour:", userEmail, "Temps:", timeFormatted);

    // Envoi au formateur via Resend API
    const formatorEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "HTML Training <onboarding@resend.dev>",
        to: ["bruno.2santos@institutsolacroup.com"],
        subject: `📊 Résultats HTML - ${userEmail}`,
        html: resultsHtml,
      }),
    });

    const formatorEmail = await formatorEmailResponse.json();
    console.log("Email formateur envoyé:", formatorEmail);

    // Envoi au stagiaire via Resend API
    const studentEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "HTML Training <onboarding@resend.dev>",
        to: [userEmail],
        subject: "🎉 Tes résultats de l'exercice HTML !",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #3b82f6; text-align: center;">Bravo ! 🎉</h1>
            
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin: 20px 0;">
              <h2 style="margin: 0; font-size: 48px;">${score}/${totalQuestions}</h2>
              <p style="margin: 10px 0 0 0; font-size: 24px;">${percentage}%</p>
            </div>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Ton message de motivation :</h3>
              ${percentage === 100 ? `
                <p style="color: #1f2937; font-size: 18px;">🏆 PARFAIT ! Tu es un champion du HTML ! Continue comme ça !</p>
              ` : percentage >= 80 ? `
                <p style="color: #1f2937; font-size: 18px;">🌟 EXCELLENT ! Super travail ! Tu maîtrises très bien les bases !</p>
              ` : percentage >= 60 ? `
                <p style="color: #1f2937; font-size: 18px;">💪 BIEN JOUÉ ! Continue à t'entraîner, tu es sur la bonne voie !</p>
              ` : `
                <p style="color: #1f2937; font-size: 18px;">🚀 CONTINUE ! C'est un bon début ! N'hésite pas à refaire l'exercice !</p>
              `}
            </div>

            <p style="color: #6b7280; text-align: center; margin-top: 30px;">
              Continue à apprendre et à progresser ! Chaque exercice te rapproche de la maîtrise du HTML ! 💪
            </p>

            <p style="color: #6b7280; text-align: center; font-size: 14px; margin-top: 20px;">
              Tes résultats ont également été envoyés à ton formateur.
            </p>
          </div>
        `,
      }),
    });

    const studentEmail = await studentEmailResponse.json();
    console.log("Email stagiaire envoyé:", studentEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        formatorEmailId: formatorEmail.id,
        studentEmailId: studentEmail.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Erreur dans send-results:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
