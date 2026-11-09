export const config = {
  runtime: 'edge', // Runs on Vercel Edge Network for instant execution without cold starts or proxy bottlenecks
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

    const combinedPrompt = `System Instructions:
You are an educational content generator for a Catholic middle school reading program.
1. FAITH & MORAL ALIGNMENT: Content must respect Catholic teachings, natural law, traditional Christian virtues, and classical middle school education standards.
2. PROHIBITED TOPICS: Strictly avoid any controversial social or political ideologies, gender theory, anti-religious rhetoric, graphic violence, occult themes, or inappropriate concepts.
3. APPROVED SUBJECT MATTER: Passages must focus exclusively on wholesome, factual, and academically enriching topics (e.g., historical events, scientific discoveries, nature, classic literature, space exploration, saints/historical figures, and civic history).
4. TONE & READABILITY: Maintain an encouraging, objective tone suitable for Grades 5-8.

Task:
Generate a middle school reading package about "${topic}".
Calibrate vocabulary and sentence structure for a student at the "${lexileLabel || '600L - 750L'}" reading level.

Output ONLY a raw JSON object (no markdown formatting, no backticks, no explanatory text) with this exact structure:
{
  "title": "Passage Title",
  "passage": "A 150-200 word informative passage about ${topic}.",
  "preview": "A 2-sentence summary of the main idea.",
  "guiding_question": "A key question to think about while reading.",
  "questions": [
    {
      "type": "Literal Recall",
      "question": "Comprehension question 1?",
      "options": ["Option A", "Option B", "Option C"],
      "correctIndex": 0
    },
    {
      "type": "Inferential",
      "question": "Comprehension question 2?",
      "options": ["Option A", "Option B", "Option C"],
      "correctIndex": 1
    },
    {
      "type": "Vocabulary",
      "question": "Comprehension question 3?",
      "options": ["Option A", "Option B", "Option C"],
      "correctIndex": 2
    }
  ]
}`;

    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: combinedPrompt }] }],
        generationConfig: {
          temperature: 0.7
        }
      })
    });

    if (!geminiRes.ok) {
      const errData = await geminiRes.json();
      return new Response(JSON.stringify({ error: errData.error?.message || 'Gemini API Error' }), {
        status: geminiRes.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await geminiRes.json();
    let rawText = data.candidates[0].content.parts[0].text;
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

    return new Response(rawText, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}