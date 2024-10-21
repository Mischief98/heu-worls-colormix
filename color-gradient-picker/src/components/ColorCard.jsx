import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ColorCard = ({ name, code }) => {
  return (
    <div className="color-card" style={{ backgroundColor: code }}>
      <div className="color-info">
        <h5>{name}</h5>
        <CopyToClipboard text={code}>
          <button className="copy-btn">Copy CSS Code</button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default ColorCard;
