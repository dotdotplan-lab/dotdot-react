import React from 'react';

function MainSpace({ children }) {
  return <main className="container mx-auto px-4 py-16">
    {children}
  </main>;
}

export default MainSpace;