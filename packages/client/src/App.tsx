import Chatbot from './components/chat/Chatbot';
import SummarizerPage from './pages/SummarizerPage';
import { Navbar } from './components/ui/Navbar';
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
         <main className="p-4 h-[calc(100vh-7rem)] max-full">
            <Routes>
               <Route path="/" element={<Navigate to="/chatbot" />} />
               <Route path="/chatbot" element={<Chatbot />} />
               <Route
                  path="/summarizer"
                  element={<SummarizerPage />}
               />
            </Routes>
         </main>
      </Router>
   );
}

export default App;
