import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ apartment, selectedMonth, discountedRent }) {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (discountedRent > 0) {
      axiosSecure.post('/create-payment-intent',{ discountedRent } )
        .then(res => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
    }

  }, [axiosSecure, discountedRent])
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)

    if (card === null) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })

    if (error) {
      console.log('payment error', error);
      setError(error.message);
    }
    else {
      console.log('payment method', paymentMethod)
      setError('');
    }

    // confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
        }
      }
    })

    if (confirmError) {
      console.log('confirm error')
    }
    else {
      console.log('payment intent', paymentIntent)
      if (paymentIntent.status === 'succeeded') {
        console.log('transaction id', paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          email: user.email,
          price: discountedRent,
          transactionId: paymentIntent.id,
          month: selectedMonth, // utc date convert. use moment js to 
          apartmentId: apartment._id,
          floorNo: apartment.floorNo,
          blockName: apartment.blockName,
          apartmentNo: apartment.apartmentNo,
          rentPaid: discountedRent,
          status: 'paid'
        }

        const res = await axiosSecure.post('/payments', payment);
        console.log('payment saved', res.data);
        if (res.data.insertedId) {
          Swal.fire({
            
            icon: "success",
            title: "Payment Successful !",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/dashboard/history')
        }

      }
    }

  }
  return (
    
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
                fontSize: '16px',
                color: '#ffffff', 
                '::placeholder': {
                    color: '#aab7c4',
                },
                border: '4px solid #ff6382',
                padding: '12px',
            },
            invalid: {
                color: '#9e2146',
            },
        },
        }}
      />
      <button className=" bg-red-400 my-4 px-3 py-2 text-white" type="submit" disabled={!stripe || !clientSecret}>
        Pay Now
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
    </form>
  );
}