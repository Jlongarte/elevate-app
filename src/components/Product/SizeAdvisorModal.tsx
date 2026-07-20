import React, { useState } from 'react';

interface SizeAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  productContext: any;
}

export const SizeAdvisorModal: React.FC<SizeAdvisorModalProps> = ({ isOpen, onClose, productContext }) => {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [tipoEntrenamiento, setTipoEntrenamiento] = useState('General training');
  const [ajustePreferido, setAjustePreferido] = useState('Normal fit');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      
      const baseUrl = import.meta.env.VITE_API_URL || 'https://elevate-backend-bqdb.onrender.com';
      
      const response = await fetch(`${baseUrl}/api/ai/size-advisor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          altura,
          peso,
          tipoEntrenamiento,
          ajustePreferido,
          productoContext: productContext,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.message || 'Could not fetch size recommendation.');
      }
    } catch (err) {
      console.error("Fetch error details:", err);
      setError('Connection error with the size advisor server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="advisor-overlay" onClick={onClose}>
      <div className="advisor-modal" onClick={(e) => e.stopPropagation()}>
        <button className="advisor-close-btn" onClick={onClose}>×</button>
        
        <h2>PERFORMANCE SIZE ADVISOR</h2>
        <p className="advisor-intro">
          Enter your metrics to calculate the optimal engineering fit for <strong>{productContext.name}</strong>.
        </p>

        {!result ? (
          <form onSubmit={handleSubmit} className="advisor-form">
            <div className="advisor-fields-row">
              <div className="advisor-field">
                <label>HEIGHT (CM)</label>
                <input 
                  type="number" 
                  required 
                  placeholder="e.g. 178"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                />
              </div>
              <div className="advisor-field">
                <label>WEIGHT (KG)</label>
                <input 
                  type="number" 
                  required 
                  placeholder="e.g. 75"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                />
              </div>
            </div>

            <div className="advisor-field">
              <label>TRAINING DISCIPLINE</label>
              <select value={tipoEntrenamiento} onChange={(e) => setTipoEntrenamiento(e.target.value)}>
                <option value="General training">General fitness & Gym</option>
                <option value="Running / Cardio">Running & High Intensity Cardio</option>
                <option value="Powerlifting / Strength">Powerlifting & Strength Training</option>
                <option value="Yoga / Mobility">Yoga & Flexibility</option>
              </select>
            </div>

            <div className="advisor-field">
              <label>FIT PREFERENCE</label>
              <select value={ajustePreferido} onChange={(e) => setAjustePreferido(e.target.value)}>
                <option value="Normal fit">Standard Fit</option>
                <option value="Compressive / Tight">Compressive / Secure Fit</option>
                <option value="Loose / Relaxed">Relaxed / Loose Fit</option>
              </select>
            </div>

            {error && <div className="advisor-error-msg">{error}</div>}

            <button type="submit" className="advisor-submit-btn" disabled={loading}>
              {loading ? 'CALCULATING BIOMECHANICS...' : 'GENERATE PERFECT SIZE'}
            </button>
          </form>
        ) : (
          <div className="advisor-result-box">
            <pre className="advisor-output-text">{result}</pre>
            <button className="advisor-reset-btn" onClick={() => setResult(null)}>
              RE-CALCULATE METRICS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};