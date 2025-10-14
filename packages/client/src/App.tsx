// import Chatbot from './components/chat/Chatbot';
import ReviewList from './components/reviews/ReviewList';

function App() {
   return (
      <div className="p-4 h-screen max-full">
         {/* <Chatbot /> */}
         <ReviewList productId={4}/>
      </div>
   );
}

export default App;
