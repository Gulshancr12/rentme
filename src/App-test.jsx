import React from 'react';

const TestApp = () => {
  console.log('TestApp component is rendering');
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #faf5ff, #fce7f3)', padding: '2rem' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#9333ea', marginBottom: '2rem' }}>
          Test Page - Inline Styles
        </h1>
        <div style={{ background: 'rgba(255,255,255,0.9)', padding: '2rem', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
          <p style={{ fontSize: '1.25rem', color: '#374151', marginBottom: '1rem' }}>
            If you can see this, React is working!
          </p>
          <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1rem' }}>
            Tailwind CSS classes: bg-gradient-to-br from-purple-50 to-pink-50
          </p>
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg inline-block">
            This should be blue if Tailwind works
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestApp;
