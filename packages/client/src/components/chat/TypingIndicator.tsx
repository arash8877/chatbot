
const TypingIndicator = () => {
   return (
      <div className="flex self-start gap-1 px-3 py-3 bg-gray-200 rounded-r-2xl rounded-tl-2xl">
         <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse"></div>
         <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.3s]"></div>
         <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.6s]"></div>
      </div>
   );
};

export default TypingIndicator;
