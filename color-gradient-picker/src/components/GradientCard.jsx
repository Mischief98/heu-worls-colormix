import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const GradientCard = ({ name, code }) => {
  return (
    <div className="gradient-card" style={{ background: code }}>
      <div className="gradient-info">
        <h5>{name}</h5>
        <CopyToClipboard text={code}>
          <button className="copy-btn">Copy CSS Code</button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default GradientCard;
