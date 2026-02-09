module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email requis' });
  }

  // Validation email basique
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email invalide' });
  }

  // Liste Neoabita Nurturing Guide = 57
  const listId = 57;

  const attributes = {
    SOURCE: 'landing-guide-tendances-2026'
  };

  try {
    // Créer ou mettre à jour le contact dans Brevo
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        attributes: attributes,
        listIds: [listId],
        updateEnabled: true
      })
    });

    if (response.ok || response.status === 201 || response.status === 204) {
      return res.status(200).json({ success: true, message: 'Contact ajouté à la liste nurturing', email });
    }

    const errorData = await response.text();
    console.error('Brevo error:', response.status, errorData);
    return res.status(500).json({ error: 'Erreur Brevo', details: errorData });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
};
