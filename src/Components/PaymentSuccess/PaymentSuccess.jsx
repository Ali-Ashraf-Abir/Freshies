import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../ContextApi/ContextApi';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const {userData}=useContext(AuthContext)

    useEffect(() => {
        // Redirect to home after 2 seconds

            const timer = setTimeout(() => {
                navigate('/'); // Change to your home route
              }, 2000);
          
              // Cleanup timer on component unmount
              return () => clearTimeout(timer);
        
      }, [navigate]);




      
    useEffect(()=>{
        if(userData){
        const unpaidProducts=userData?.cart?.filter(cart=>cart.status!='paid')
        const body = {
            products: unpaidProducts,
            userData: userData
        }
        
        fetch(`http://localhost:5000/paid`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body)
        })
        console.log(userData)
        }
      },[userData])
  
  return (
    <div style={styles.container}>
      <h1 style={styles.successMessage}>Payment Successful!</h1>
      <p style={styles.infoMessage}>Thank you for your purchase.</p>
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
