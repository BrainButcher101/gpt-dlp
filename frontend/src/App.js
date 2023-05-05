import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopMenu from './components/TopMenu';
import ConfigPage from './pages/ConfigPage';
import './App.css';


function App() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');

  const [rateLimit, setRateLimit] = useState(
    localStorage.getItem('rateLimit') || 0
  );

  const [dailyPrompts, setDailyPrompts] = useState(
    localStorage.getItem('dailyPrompts') || 0
  );

  const checkGDPRCompliance = (text) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /(\+\d{1,2}\s)?\(?\d{1,4}\)?[\s.-]\d{1,4}[\s.-]\d{1,4}/;
    const ssnRegex = /\d{3}-\d{2}-\d{4}|\d{9}/;
    const creditCardRegex = /\b(?:\d[ -]*?){13,16}\b/;
    const dobRegex = /(0[1-9]|1[0-2])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\d\d|(0[1-9]|[12][0-9]|3[01])[-/.](0[1-9]|1[0-2])[-/.](19|20)\d\d|(19|20)\d\d[-/.](0[1-9]|1[0-2])[-/.](0[1-9]|[12][0-9]|3[01])/;
    const ipRegex = /((25[0-5]|(2[0-4]|1{0,1}\d|[1-9]?)?\d)\.){3}(25[0-5]|(2[0-4]|1{0,1}\d|[1-9]?)?\d)/;
  
    return !(emailRegex.test(text) || phoneRegex.test(text) || ssnRegex.test(text) || creditCardRegex.test(text) || dobRegex.test(text) || ipRegex.test(text));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dailyPrompts >= rateLimit) {
      alert('Rate limit exceeded');
      return;
    }

    if (!checkGDPRCompliance(prompt)) {
      alert('The prompt contains GDPR sensitive data. Please remove it before submitting.');
      setPrompt('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/generate', { prompt });
      setOutput(response.data.output);
      setDailyPrompts(dailyPrompts + 1);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <TopMenu />
        <Routes>
          <Route path="/" element={
            <>
              <header className="App-header">
                <h1>API Prompt Generator</h1>
              </header>
              <main>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="prompt">Enter your prompt:</label>
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                  />
                  <button type="submit">Generate Output</button>
                </form>
                <div>
                  <h2>Generated Output:</h2>
                  <pre>{output}</pre>
                </div>
              </main>
            </>
          } />
          <Route path="/config" element={<ConfigPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
