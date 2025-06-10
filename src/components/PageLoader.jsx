import React from 'react';

const PageLoader = () => {
  const [rotation, setRotation] = React.useState(0);

 React.useEffect(() => {
   const interval = setInterval(() => {
     setRotation(prev => prev + 10);
   }, 10);

   return () => clearInterval(interval);
 }, []);

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
      transform: `rotate(${rotation}deg)`
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