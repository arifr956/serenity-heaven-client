import ClipboardJS from 'clipboard';
import { useContext } from 'react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../providers/AuthProvider';
import useCoupon from '../../hooks/useCoupon';

const YourComponent = () => {
  const [coupon] = useCoupon();

  const { user } = useContext(AuthContext);
  useEffect(() => {
  // Initialize ClipboardJS
  const clipboard = new ClipboardJS('.btn-copy');

  
  clipboard.on('success', function (e) {
    e.clearSelection();
    toast.success('Coupon code copied to clipboard!', {
      position: 'top-center',
      autoClose: 2000,
    });
  });

 

  // Clean up the clipboard when the component unmounts
  return () => clipboard.destroy();
}, []); 

  return (
    
    
      user && (
        <div className='grid grid-cols-1 md:grid-cols-2'>
          coupon.map((c) => <div key={coupon._id} className="my-6 grid md:grid-cols-2 lg:grid-cols-3">
         
         <div className="container bg-red-400 text-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
         <div className="text-3xl font-bold mb-4">{coupon.description}</div>
           <div className="text-lg mb-4">
             Get <span className="text-yellow-400 font-bold">{c.percentage}% OFF</span> your next Agreement!
           </div>
           <div className="text-base mb-4">Use coupon code:</div>
           <div className="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
             <span className="text-2xl font-semibold">{c.code}</span>
             <button
               className="btn-copy bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
               data-clipboard-text="TAILOFFER10"
             >
               Copy
             </button>
           </div>
           <div className="text-sm mt-4">
             
             <p>Terms and conditions apply.</p>
           </div>
         </div>
 
       <ToastContainer />
    )
        </div>
      ) 
    
  );
};

export default YourComponent;
