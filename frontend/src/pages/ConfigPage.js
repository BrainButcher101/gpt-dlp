import React, { useState } from 'react';
import axios from 'axios';

const ConfigPage = () => {
  const [rateLimit, setRateLimit] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/config', {
        rateLimit,
        apiKey,
      });
      alert('Configuration saved successfully.');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>GPT-DLP Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rateLimit">Rate Limit:</label>
          <input
            type="number"
            id="rateLimit"
            value={rateLimit}
            onChange={(e) => setRateLimit(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="apiKey">API Key:</label>
          <input
            type={showApiKey ? 'text' : 'password'}
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            {showApiKey ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit">Save Configuration</button>
      </form>
    </div>
  );
};

export default ConfigPage;