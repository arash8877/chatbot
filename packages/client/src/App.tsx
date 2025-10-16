import Chatbot from './components/chat/Chatbot';
import ReviewList from './components/reviews/ReviewList';
import { Navbar } from './components/Navbar';
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from 'react-router-dom';

function App() {
   return (
      <Router>
         <div className="p-4 h-screen max-full">
            <Navbar />
            <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
               <Routes>
                  <Route path="/" element={<Navigate to="/chatbot" />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                  <Route
                     path="/summarizer"
                     element={<ReviewList productId={3} />}
                  />
               </Routes>
            </main>
         </div>
      </Router>
   );
}

export default App;
