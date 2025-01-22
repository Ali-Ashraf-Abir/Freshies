import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../ContextApi/ContextApi';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const { userData } = useContext(AuthContext) || {}







  const handlePaid = () => {
    if (userData) {
      const unpaidProducts = userData?.cart?.filter(cart => cart.status != 'paid')
      const body = {
        products: unpaidProducts,
        userData: userData,
        restaurant: unpaidProducts.restaurant
      }

      fetch(`https://freshies-server.vercel.app/paid`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
      })
      console.log(unpaidProducts)
    }
    navigate('/')

  }

  return (
    <div style={styles.container}>
      <h1 style={styles.successMessage}>Payment Successful!</h1>
      <p style={styles.infoMessage}>Thank you for your purchase.</p>
      <p onClick={handlePaid} className='btn btn-primary' style={styles.infoMessage}>Continue Browsing</p>
    </div>
  );
};

// Optional: Add some basic styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
  },
  successMessage: {
    fontSize: '2rem',
    color: '#4caf50',
  },
  infoMessage: {
    fontSize: '1.2rem',
  },
};

export default PaymentSuccess;
