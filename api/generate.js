export default async function handler(req, res) {
  try {
    const body = await req.json?.() || req.body;
    const { description, style, language } = body;

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
        model: "gpt-4-0125-preview",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 800,
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    res.status(200).json({ result: text });
  } catch (error) {
    console.error("Error:", error);
if (error.response) {
  const errorDetails = await error.response.text?.();
  console.error("OpenAI error response:", errorDetails);
}


