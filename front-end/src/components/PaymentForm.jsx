
import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';


const PaymentForm = ()=>{
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async ((event)=>{
    event.preventDefault();
    if(!stripe || !elements){
      //strip not loaded
    }
    console.log("strip loaded")
  })
  return(
    <form onSubmit={handleSubmit}>
    <CardElement />
    <button type="submit" disabled={!stripe}>
      Pay
    </button>
  </form>
  )
}

export default PaymentForm;
