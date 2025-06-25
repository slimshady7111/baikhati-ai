import { useState } from 'react';

export default function AiTools() {
  const [pair, setPair] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleAnalyze = async () => {
    if (!pair) return;
    setLoading(true);
    setResult('');

    const prompt = `Buat prediksi teknikal untuk pasangan ${pair}. Sebutkan:\n\n1. Tren saat ini (naik/turun/sideways)\n2. Estimasi pergerakan ke depan dalam pips\n3. Alasan teknikal\nGunakan bahasa singkat dan profesional.`;

    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setResult(data.result || 'Tidak ada hasil.');
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#111', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ textAlign: 'center' }}>🔮 AI Prediksi Crypto & Forex</h1>
      <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Contoh: BTC/USDT atau XAU/USD"
          value={pair}
          onChange={(e) => setPair(e.target.value)}
          style={{ padding: '0.8rem', width: '80%', borderRadius: '8px', border: 'none', fontSize: '1rem' }}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{ marginLeft: '1rem', padding: '0.8rem 1.2rem', borderRadius: '8px', backgroundColor: '#fff', color: '#111', border: 'none', cursor: 'pointer' }}>
          {loading ? 'Menganalisa...' : 'Analisa Sekarang'}
        </button>
        {result && (
          <div style={{ marginTop: '2rem', padding: '1rem', background: '#222', borderRadius: '12px' }}>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
