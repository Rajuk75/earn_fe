import React from 'react';

const HeroBanner = () => {
  return (
    <div className="relative w-full aspect-[2/1] md:aspect-auto md:h-64 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 rounded-[2rem] overflow-hidden mb-6">
      {/* Content Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Mock Phone UI */}
        <div className="relative w-32 h-56 bg-white border-4 border-gray-900 rounded-[2rem] shadow-xl transform rotate-0 overflow-hidden flex flex-col items-center pt-2">
            <div className="w-12 h-4 bg-gray-200 rounded-full mb-2"></div>
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
             </div>
             <div className="text-[8px] text-center px-2 text-gray-500">Introducing communities</div>
             <div className="mt-2 text-[6px] text-gray-400 px-4 text-center leading-tight">Connect with others, share your achievements and learn more.</div>
        </div>
        
        {/* Decorative elements */}
         <div className="absolute top-4 left-10 bg-blue-500 p-1 rounded-lg shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
         </div>
      </div>
    </div>
  );
};

export default HeroBanner;

