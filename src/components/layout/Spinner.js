import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <div>
      <img
        src={ spinner }
        alt="Loading..."
        style={{ width: '70px', margin: ' 0px auto', display: 'block' }}
      />
    </div>
  );
};