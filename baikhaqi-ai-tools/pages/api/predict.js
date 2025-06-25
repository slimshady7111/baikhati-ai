export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'Kamu adalah analis teknikal profesional.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    res.status(200).json({ result });
  } catch (err) {
    console.error('OpenAI API error:', err);
    res.status(500).json({ message: 'Terjadi kesalahan saat memproses permintaan.' });
  }
}
