import pattern from '@/assets/pattern.jpg';
import Chatbot from '@/components/chat/Chatbot';

export default function ChatPage() {
   return (
      <div
         style={{
            backgroundImage: `url(${pattern})`,
            backgroundSize: 'cover',
            backgroundColor: '#414952',
            backgroundBlendMode: 'multiply',
         }}
      >
         <div className="relative z-10 p-4">
            <Chatbot />
         </div>
      </div>
   );
}
