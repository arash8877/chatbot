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
         <Navbar />
         <main className="p-4 h-[calc(100vh-4rem)] max-full">
            <Routes>
               <Route path="/" element={<Navigate to="/chatbot" />} />
               <Route path="/chatbot" element={<Chatbot />} />
               <Route
                  path="/summarizer"
                  element={<ReviewList productId={4} />}
               />
            </Routes>
         </main>
      </Router>
   );
}

export default App;
