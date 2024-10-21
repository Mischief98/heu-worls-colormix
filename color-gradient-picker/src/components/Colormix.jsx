import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';


const ColorMix = () => {
  const [colors, setColors] = useState(['#ff0000', '#0000ff']);
  const [blendRatios, setBlendRatios] = useState([50, 50]);
  const [mixedColor, setMixedColor] = useState('');
  const [gradient, setGradient] = useState('');

  const handleColorChange = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const handleBlendRatioChange = (index, value) => {
    const newRatios = [...blendRatios];
    newRatios[index] = value;
    setBlendRatios(newRatios);
  };

  const addColor = () => {
    setColors([...colors, '#000000']);
    setBlendRatios([...blendRatios, 50]);
  };

  const removeColor = (index) => {
    const newColors = colors.filter((_, i) => i !== index);
    const newRatios = blendRatios.filter((_, i) => i !== index);
    setColors(newColors);
    setBlendRatios(newRatios);
  };

  const blendColors = (colors, ratios) => {
    let totalRatio = ratios.reduce((a, b) => a + b, 0);
    let blendedColor = colors.reduce((prevColor, currColor, index) => {
      const percentage = ratios[index] / totalRatio;
      const f = parseInt(prevColor.slice(1), 16);
      const t = parseInt(currColor.slice(1), 16);
      const R1 = f >> 16;
      const G1 = (f >> 8) & 0x00ff;
      const B1 = f & 0x0000ff;
      const R2 = t >> 16;
      const G2 = (t >> 8) & 0x00ff;
      const B2 = t & 0x0000ff;

      return `#${(
        0x1000000 +
        Math.round((R2 - R1) * percentage + R1) * 0x10000 +
        Math.round((G2 - G1) * percentage + G1) * 0x100 +
        Math.round((B2 - B1) * percentage + B1)
      )
        .toString(16)
        .slice(1)}`;
    }, colors[0]);

    return blendedColor;
  };

  const handleMix = () => {
    const newMixedColor = blendColors(colors, blendRatios);
    const newGradient = `linear-gradient(90deg, ${colors.join(', ')})`;
    setMixedColor(newMixedColor);
    setGradient(newGradient);
  };

  const handleCopy = (code) => {
    toast.success(`Copied: ${code}`, { position: 'bottom-center' });
  };

  return (
    <div className='body'>
    <div className="color-mix-tool-container">
      <h1>Color Mix Tool</h1>

      <div className="color-inputs-container">
        {colors.map((color, index) => (
          <div className="color-picker-container" key={index}>
            <label>Color {index + 1}</label>
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(index, e.target.value)}
            />
            <button className="remove-color-button" onClick={() => removeColor(index)}>
              X
            </button>
            <p>{color}</p>
            <label>Blend Ratio: {blendRatios[index]}%</label>
            <input
              type="range"
              value={blendRatios[index]}
              onChange={(e) => handleBlendRatioChange(index, e.target.value)}
              min="0"
              max="100"
            />
          </div>
        ))}
      </div>

      <div className="color-control-buttons">
        <button className="add-color-button" onClick={addColor}>
          Add Color
        </button>
        <button className="mix-colors-button" onClick={handleMix}>
          Mix Colors
        </button>
      </div>

      <div className="color-preview-section">
        
        <div className="mixed-color-preview">
          <h3>Mixed Color</h3>
          <div className="mixed-color-box" style={{ backgroundColor: mixedColor }}>
            {mixedColor && <p className="mixed-color-code">{mixedColor}</p>}
          </div>
          {mixedColor && (
            <CopyToClipboard text={mixedColor} onCopy={() => handleCopy(mixedColor)}>
              <button className="copy-mixed-color-button">Copy Mixed Color</button>
            </CopyToClipboard>
          )}
        </div>

        
        <div className="gradient-color-preview">
          <h3>Gradient Color</h3>
          <div className="gradient-color-box" style={{ background: gradient }}>
            {gradient && <p className="gradient-color-code">{gradient}</p>}
          </div>
          {gradient && (
            <CopyToClipboard text={gradient} onCopy={() => handleCopy(gradient)}>
              <button className="copy-gradient-color-button">Copy Gradient</button>
            </CopyToClipboard>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ColorMix;
