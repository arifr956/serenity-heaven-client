
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from './SectionTitle';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const YourComponent = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.div variants={item}>
         <div>
      <SectionTitle heading="Apartment Location" />
      <div className="md:flex items-stretch ">
        <div className="bg-gray-200 w-full md:w-1/2 rounded-lg p-6 flex flex-col justify-between my-3">
          <div className="card__content mt-4">
            <p className="text-gray-700">
              Discover the prime location of our apartment, situated in the heart
              of the city. Conveniently located near major landmarks, shopping
              centers, and recreational spots, our apartment offers the perfect
              blend of accessibility and tranquility. Finding us is easy, with
              clear directions provided below.
            </p>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Directions:</h3>
              <p className="text-gray-700">
                Arsalan Zaman,House No.415, Road No. 13E, Gulshan, Dhaka 1213
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 md:ml-4 my-3 ">
          <iframe
            title="Apartment Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.1659893651193!2d90.4085052!3d23.7913323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70bec2ed6cd%3A0xd76cc5e621d2bb55!2sArsalan%20Zaman%2C%20Rd%20No.%2013E%2C%20Dhaka%201213!5e0!3m2!1sen!2sbd!4v1637946018762!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default YourComponent;
