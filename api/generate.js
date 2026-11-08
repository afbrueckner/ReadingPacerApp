export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { topic, lexileLabel } = req.body;
  
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required.' });
    }
  
    const apiKey = process.env.GEMINI_API_KEY;
  
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not configured in Vercel.' });
    }
  
    // CATHOLIC PEDAGOGICAL & FAITH GUARDRAILS
    const promptText = `System Instructions:
  You are an educational content generator for a Catholic middle school reading program.
  1. FAITH & MORAL ALIGNMENT: Content must respect Catholic teachings, natural law, traditional Christian virtues (e.g., courage, prudence, justice, temperance, charity, honesty), and classical middle school education standards.
  2. PROHIBITED TOPICS: Strictly avoid any controversial social or political ideologies, gender theory, anti-religious rhetoric, graphic violence, occult themes, or inappropriate concepts.
  3. APPROVED SUBJECT MATTER: Passages must focus exclusively on wholesome, factual, and academically enriching topics (e.g., historical events, scientific discoveries, nature, classic literature, space exploration, saints/historical figures, and civic history).
  4. TONE & READABILITY: Maintain an encouraging, objective, and intellectually engaging tone suitable for Grades 5-8.
  
  Task:
  Generate a middle school reading package about "${topic}".
  CALIBRATION INSTRUCTION: Calibrate the vocabulary and sentence structure specifically for a student at the "${lexileLabel || '600L - 750L'}" reading level.
  
  Output ONLY a raw JSON object (no markdown formatting, no backticks, no explanatory text) with this exact structure:
  {
    "title": "Passage Title",
    "passage": "A 150-200 word informative passage about ${topic}.",
    "preview": "A 2-sentence summary of the main idea.",
    "guiding_question": "A key question to think about while reading.",
    "chunks": [
      {"text": "Short phrase 1", "oap": 3},
      {"text": "Short phrase 2", "oap": 2}
    ],
    "quiz": {
      "question": "Comprehension question about the passage?",
      "options": ["Option A", "Option B", "Option C"],
      "correctIndex": 1
    }
  }`;
  
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });
  
      if (!response.ok) {
        const errData = await response.json();
        return res.status(response.status).json({ error: errData.error?.message || 'Gemini API Error' });
      }
  
      const data = await response.json();
      let rawText = data.candidates[0].content.parts[0].text;
      rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
  
      return res.status(200).json(JSON.parse(rawText));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }