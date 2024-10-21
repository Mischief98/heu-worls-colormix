import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import colorsData from '../data/colors.json';
import gradientsData from '../data/gradients.json';
import '../ColorPicker.css';

const ColorPicker = () => {
  const [filter, setFilter] = useState('');

  const handleCopy = (colorCode) => {
    toast.success(`Copied: ${colorCode}`, {
      position: "bottom-center", 
    });
  };

  const filteredColors = colorsData.filter(color => {
    const regex = new RegExp(filter, 'i'); 
    return regex.test(color.name) || regex.test(color.code); 
  });

  const filteredGradients = gradientsData.filter(gradient => {
    const regex = new RegExp(filter, 'i'); 
    return regex.test(gradient.name); 
  });

  return (
    <div className="color-picker">
      <div className="filter-panel">
        <h3>Filter by colors or gradients</h3>
        <input
          type="text"
          placeholder="Search colors or gradients..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="color-section">
        <h3>Colors</h3>
        <div className="color-grid">
          {filteredColors.map((color) => (
            <div className="color-card" style={{ backgroundColor: color.code }} key={color.name}>
              <div className="color-info">
                <p>{color.name}</p>
                <p>{color.code}</p> 
                <CopyToClipboard text={color.code} onCopy={() => handleCopy(color.code)}>
                  <button className="copy-btn">Copy Code</button>
                </CopyToClipboard>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="gradient-section">
        <h3>Gradients</h3>
        <div className="gradient-grid">
          {filteredGradients.map((gradient) => (
            <div
              className="gradient-card"
              style={{ background: `linear-gradient(${gradient.colors.join(', ')})` }}
              key={gradient.name}
            >
              <div className="gradient-info">
                <p>{gradient.name}</p>
                <CopyToClipboard text={`linear-gradient(${gradient.colors.join(', ')})`} onCopy={() => handleCopy(gradient.colors.join(', '))}>
                  <button className="copy-btn">Copy Code</button>
                  
                </CopyToClipboard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
