export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Alleen POST requests zijn toegestaan." });
  }

  const { description, style, language, debug } = req.body;

  if (!description || !style || !language) {
    return res.status(400).json({ error: "Vul alle velden in: beschrijving, stijl en taal." });
  }

  // ✅ Gratis testmodus (geen API-kosten)
  if (debug === true) {
    return res.status(200).json({
      result: `1. EcoVibe\n2. PureForma\n3. FemNatura\n4. VrouwelijkVitaal\n5. Sereen\n6. MinimaMood\n7. Veerkracht\n8. Naadloos\n9. EcoZacht\n10. NudeWave`
    });
  }

  const prompt = `


