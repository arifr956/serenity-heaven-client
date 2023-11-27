import ClipboardJS from 'clipboard';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const YourComponent = () => {
  useEffect(() => {
    // Initialize ClipboardJS
    const clipboard = new ClipboardJS('.btn-copy');

    // Event listener when copying is successful
    clipboard.on('success', function (e) {
      e.clearSelection();
      toast.success('Coupon code copied to clipboard!', {
        position: 'top-center',
        autoClose: 2000,
      });
    });

    // Event listener when copying is unsuccessful
    clipboard.on('error', function (e) {
      toast.error('Failed to copy coupon code to clipboard!', {
        position: 'top-center',
        autoClose: 2000,
      });
    });

    // Clean up the clipboard instance when the component unmounts
    return () => clipboard.destroy();
  }, []); // Run the effect only once during the component mount

  return (
    <>
      <div className="my-6 md:flex">
        {/* Your coupon components */}
        <div className="container bg-red-400 text-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="text-3xl font-bold mb-4">Special Offer!</div>
          <div className="text-lg mb-4">
            Get <span className="text-yellow-400 font-bold">10% OFF</span> your next Agreement!
          </div>
          <div className="text-base mb-4">Use coupon code:</div>
          <div className="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
            <span className="text-2xl font-semibold">TAILOFFER10</span>
            <button
              className="btn-copy bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-clipboard-text="TAILOFFER10"
            >
              Copy
            </button>
          </div>
          <div className="text-sm mt-4">
            <p>
              Valid until <span className="font-semibold">December 31, 2023</span>
            </p>
            <p>Terms and conditions apply.</p>
          </div>
        </div>

        <div className="container bg-red-400 text-white p-4 rounded-lg shadow-lg max-w-md mx-auto mt-4 md:mt-0">
        <div className="text-3xl font-bold mb-4">Exclusive Deal!</div>
    <div className="text-lg mb-4">Unlock <span className="text-yellow-400 font-bold">15% OFF</span> on your next Lease!</div>
    <div className="text-base mb-4">Use coupon code:</div>
    <div className="bg-teal-600 text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
      <span className="text-2xl font-semibold">TAILLEASE15</span>
      <button className="btn-copy bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" data-clipboard-text="TAILLEASE15">Copy</button>
    </div>
    <div className="text-sm mt-4">
      <p>Valid until <span className="font-semibold">December 31, 2023</span></p>
      <p>Terms and conditions apply.</p>
    </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default YourComponent;
