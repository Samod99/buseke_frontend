import React from 'react';

const RequestResponseDisplay = ({ req, res }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2></h2>

      <div style={{ marginTop: '20px' }}>
        <h3>Request Object</h3>
        <pre style={{ background: '#f8f8f8', padding: '10px' }}>
          {req ? JSON.stringify(req, null, 2) : 'No request data provided'}
        </pre>

        <h3>Response Object</h3>
        <pre style={{ background: '#f8f8f8', padding: '10px' }}>
          {res ? JSON.stringify(res, null, 2) : 'No response data provided'}
        </pre>
      </div>
    </div>
  );
};

export default RequestResponseDisplay;