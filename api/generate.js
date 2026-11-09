export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { topic, lexileLabel } = await req.json();

    if (!topic) {
      return new Response(JSON.stringify({ error: 'Topic is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY environment variable is not configured in Vercel.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemInstruction = `You are an educational content generator for a Catholic middle school reading program.
1. FAITH & MORAL ALIGNMENT: Respect Catholic teachings, natural law, traditional Christian virtues, and classical middle school education standards.
2. PROHIBITED TOPICS: Avoid controversial social/political ideologies, gender theory, anti-religious rhetoric, graphic violence, or occult themes.
3. APPROVED SUBJECT MATTER: Wholesome, factual, academically enriching topics (history, science, nature, saints, classic literature, space).
4. TONE & READABILITY: Encouraging, objective tone suitable for Grades 5-8.`;

    const userPrompt = `Generate a middle school reading package about "${topic}".
Calibrate vocabulary and sentence structure for a student at the "${lexileLabel || '600L - 750L'}" reading level.`;

    // Define strict JSON Schema for native model enforcement
    const jsonSchema = {
      type: "OBJECT",
      properties: {
        title: { type: "STRING" },
        passage: { type: "STRING" },
        preview: { type: "STRING" },
        guiding_question: { type: "STRING" },
        questions: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              type: { type: "STRING" },
              question: { type: "STRING" },
              options: {
                type: "ARRAY",
                items: { type: "STRING" }
              },
              correctIndex: { type: "INTEGER" }
            },
            required: ["type", "question", "options", "correctIndex"]
          }
        }
      },
      required: ["title", "passage", "preview", "guiding_question", "questions"]
    };

    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
          responseSchema: jsonSchema
        }
      })
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      return new Response(JSON.stringify({ error: data.error?.message || 'Gemini API Error' }), {
        status: geminiRes.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const rawText = data.candidates[0].content.parts[0].text;
    
    // Safely attempt parsing
    try {
      const parsedData = JSON.parse(rawText);
      return new Response(JSON.stringify(parsedData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      return new Response(JSON.stringify({ error: "Failed to parse API response as JSON.", rawText }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}