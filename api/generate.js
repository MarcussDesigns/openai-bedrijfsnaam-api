export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Alleen POST requests zijn toegestaan." });
  }

  try {
    const { description, style, language } = req.body;

    const prompt = `
Je bent een creatieve merkstrateeg. Genereer 10 unieke bedrijfsnamen op basis van de volgende input:

Beschrijving: ${description}
Stijl: ${style}
Taal: ${language}

Voor elke naam, geef een korte toelichting waarom het een goede naam is.
Gebruik geen bestaande bedrijfsnamen of merknamen.
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 800,
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(200).json({ result: "⚠️ Geen namen gegenereerd." });
    }

    res.status(200).json({ result: text });
  } catch (error) {
    console.error("OpenAI response:", error);
    res.status(500).json({ error: "Er ging iets mis met de naamgeneratie." });
  }
}







