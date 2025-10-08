import { useRef, useState } from 'react';
import axios from 'axios';
import ChatMessages from './ChatMessages';
import type { Message } from './ChatMessages';
import TypingIndicator from './TypingIndicator';
import ChatInput, { type ChatFormData } from './ChatInput';

type ChatResponse = {
   message: string[];
};

const Chatbot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const [error, setError] = useState('');
   const conversationId = useRef(crypto.randomUUID());

   const onSubmit = async ({ prompt }: ChatFormData) => {
      try {
         setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
         setIsBotTyping(true);
         setError('');

         // await new Promise((resolve) => setTimeout(resolve, 5000));

         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt: prompt,
            conversationId: conversationId.current,
         });
         // @ts-ignore
         setMessages((prev) => [
            ...prev,
            { content: data.message, role: 'bot' },
         ]);
      } catch (error) {
         console.error(error);
         setError('Something went wrong. Please try again!');
      } finally {
         setIsBotTyping(false);
      }
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
            <ChatMessages messages={messages} />
            {isBotTyping && <TypingIndicator />}
            {error && <p className="text-red-500">{error}</p>}
         </div>
         <ChatInput onSubmit={onSubmit} />
      </div>
   );
};

export default Chatbot;
