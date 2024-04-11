import React, { useState } from 'react';

const StripeContainer = ({show, url}) => {
console.log("i'm strape cotainer")

  return (
    <div>
      {/* <button onClick={handleLinkClick}>close Model</button> */}
      {show && (
        <div className="modal">
          <div className="modal-content">
            {/* <span className="close" onClick={handleCloseModel}>&times;</span>
            <iframe title="URL Model" src={url} width="100%" height="100%"></iframe>
             */}
             hello ir' stipe
          </div>
        </div>
      )}
    </div>
  );
}

export default StripeContainer;
