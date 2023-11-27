import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <div className="">
        <footer className="relative fixed bottom-0 w-full py-10 flex flex-col items-center bg-gradient-to-t from-[#243748] via-[#4b749f] to-[#295270] overflow-hidden md:py-20">
          <div className="relative z-10 container m-auto px-6 md:px-12">
            <div className="m-auto md:w-10/12 lg:w-8/12 xl:w-6/12">
              <div className="flex flex-wrap items-center justify-between md:flex-nowrap">
                <div className="w-full space-x-12 flex justify-center text-white sm:w-7/12 md:justify-start">
                  <ul className="list-disc list-inside space-y-6">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/apartments">All Apartments</Link></li>
                    <li><Link to="/">Terms of Use</Link></li>
                  </ul>
                </div>
                <div className="w-10/12 m-auto mt-16 space-y-6 text-center sm:text-left sm:w-5/12 p-3 sm:mt-auto bg-[#394251]">
                  <div className="">
                    <span className="block text-white font-semibold text-2xl">Serenity Heaven</span>
                  </div>
                  <nav>

                    <div className="grid grid-flow-col gap-4 text-red-400">
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                        </svg>
                      </a>
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                      </a>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                      </a>
                    </div>
                  </nav>
                  <span className="block text-gray-300">&copy; 2023 Serenity Heaven</span>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute h-full inset-0 flex items-center">
            <div aria-hidden="true" className="bg-layers bg-scale w-56 h-56 m-auto blur-xl bg-gradient-to-t from-[#243748] via-[#4b749f] to-[#295270] rounded-full md:w-[30rem] md:h-[30rem] md:blur-3xl"></div>
          </div>

          <div aria-hidden="true" className="absolute inset-0 w-full h-full bg-current opacity-80"></div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
