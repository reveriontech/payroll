import React from 'react';

const PageLoader = () => {
  const styles = {
    pageLoader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      fontFamily: "'Google Sans', 'Helvetica Neue', sans-serif"
    },
    loaderContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '1rem',
      color: '#5f6368',
      fontWeight: 400
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid #e0e0e0',
      borderTop: '2px solid #1a73e8',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  return (
    <div style={styles.pageLoader}>
      <div style={styles.loaderContent}>
        <div style={styles.spinner}></div>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default PageLoader;