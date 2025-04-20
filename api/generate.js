export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Alleen POST requests zijn toegestaan." });
  }

  try {
    const { description, style, language, debug } = req.body || {};

    if (!description || !style || !language) {
      return res.status(400).json({ error: "Vul alle velden in: beschrijving, stijl en taal." });
    }

    // ✅ GRATIS TESTMODUS — zonder OpenAI kosten
    if (debug === true) {
      return res.status(200).json({
        result: `1. EcoVibe\n2. PureForma\n3. FemNatura\n4. VrouwelijkVitaal\n5. Sereen\n6. MinimaMood\n7. Veerkracht\n8. Naadloos\n9. EcoZacht\n10. NudeWave`
      });
    }

    const prompt = `
Je bent een professionele merknaam-expert. Genereer 10 creatieve, pakkende en merkwaardige bedrijfsnamen op basis van deze input:

Beschrijving: ${description}
Stijl: ${style}
Taal: ${language}

Lever de bedrijfsnamen als een genummerde lijst, zonder extra uitleg.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 300
      })
    });

    const data = await response.json();
    const output = data?.choices?.[0]?.message?.content;

    if (!output) {
      return res.status(200).json({ result: "⚠️ Geen namen gegenereerd." });
    }

    return res.status(200).json({ result: output });
  } catch (error) {
    console.error("Fout in API-handler:", error);
    return res.status(500).json({ error: "Er is iets misgegaan aan de serverzijde." });
  }
}



