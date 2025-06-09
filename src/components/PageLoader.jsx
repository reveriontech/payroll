import React from 'react';

const PageLoader = () => {
  return (
    <div className="page-loader">
      <div className="loader-content">
        <div className="spinner"></div>
        <span>Loading...</span>
      </div>
      
      <style jsx>{`
        .page-loader {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
          font-family: 'Google Sans', 'Helvetica Neue', sans-serif;
        }
        
        .loader-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1rem;
          color: #5f6368;
          font-weight: 400;
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #e0e0e0;
          border-top: 2px solid #1a73e8;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .page-loader {
            height: 40vh;
          }
          
          .loader-content {
            font-size: 0.875rem;
          }
          
          .spinner {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default PageLoader; 