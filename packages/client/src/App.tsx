import SummarizerPage from './pages/SummarizerPage';
import { Navbar } from './components/ui/Navbar';
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from 'react-router-dom';
import ChatPage from './pages/ChatPage';

function App() {
   return (
      <Router>
         <Navbar />
         <main className="h-[calc(100vh-7rem)] max-full">
            <Routes>
               <Route path="/" element={<Navigate to="/chatbot" />} />
               <Route path="/chatbot" element={<ChatPage />} />
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
