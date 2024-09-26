import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  
  const [tone, setTone] = useState('Casual');
  const [length, setLength] = useState('Short');
  const [features, setFeatures] = useState('');
  const [brandPositioning, setBrandPositioning] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [highlightedText, setHighlightedText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const outputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Map length to the respective values
    let lengthValue;
    switch (length) {
      case 'Short':
        lengthValue = '4-6 sentences';
        break;
      case 'Medium':
        lengthValue = '8-10 sentences';
        break;
      case 'Long':
        lengthValue = '15-20 sentences';
        break;
      default:
        lengthValue = '4-6 sentences';
    }

    const payload = {
      Brand: brandPositioning,
      Features: features,
      Tone: tone,
      Length: lengthValue
    };

    try {
      const response = await axios.post('https://realestate-gold-kappa.vercel.app/generate-brochure', payload);
      setGeneratedText(response.data.text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInsertDB = async () => {
    const payload = {
      Brand: brandPositioning,
      Features: features,
      Tone: tone,
      Length: length,
      Output: generatedText
    };

    try {
      await axios.post('https://realestate-gold-kappa.vercel.app/insert', payload);
      alert('Data inserted successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Error inserting data');
    }
  };

  const handleHighlight = () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      setHighlightedText(selectedText);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleRegenerate = async () => {
    if (!highlightedText || !selectedOption || !generatedText) {
      alert('Please select text to regenerate and choose an option');
      return;
    }

    const payload = {
      highlightedText: highlightedText,
      option: selectedOption,
      Output: generatedText
    };

    try {
      const response = await axios.post('https://realestate-gold-kappa.vercel.app/regenerate', payload);
      setGeneratedText(response.data.text);
    } catch (error) {
      console.error('Error regenerating text:', error);
      alert('Error regenerating text');
    }
  };

  return (
    <div className="App">
    
      <h1>Real Estate Brochure Generator</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Brand Positioning:</label>
          <input type="text" value={brandPositioning} onChange={(e) => setBrandPositioning(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Features of the Building:</label>
          <input type="text" value={features} onChange={(e) => setFeatures(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Tone:</label>
          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="Casual">Casual</option>
            <option value="Formal">Formal</option>
            <option value="Grandiose">Grandiose</option>
          </select>
        </div>
        <div className="form-group">
          <label>Length of the Copy:</label>
          <select value={length} onChange={(e) => setLength(e.target.value)}>
            <option value="Short">Short</option>
            <option value="Medium">Medium</option>
            <option value="Long">Long</option>
          </select>
        </div>
        <div className="generate-button">
          <button class="button-27" type="submit">Generate Brochure</button>
        </div>
      </form>

      <div className="output-section" onMouseUp={handleHighlight} ref={outputRef}>
        <h2>Generated Brochure Text</h2>
        <textarea
          value={generatedText}
          readOnly
          rows={10}
        />
        {showDropdown && (
          <div className="regenerate-section">
            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="">Select an option</option>
              <option value="Shorter">Make it Shorter</option>
              <option value="Longer">Make it Longer</option>
            </select>
            <button class="button-27" onClick={handleRegenerate}>Regenerate</button>
          </div>
        )}
        <button class="button-27" onClick={handleInsertDB}>Insert to DB</button>
      </div>
    </div>
  );
}

export default App;
