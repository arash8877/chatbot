import { useRef, useState } from "react";
import axios from "axios";
import ChatMessages from "./ChatMessages";
import type { Message } from "./ChatMessages";
import TypingIndicator from "./TypingIndicator";
import ChatInput, { type ChatFormData } from "./ChatInput";
import popSound from "@/assets/sounds/pop.mp3";
import notificationSound from "@/assets/sounds/notification.mp3";

const popAudio = new Audio(popSound);
const notificationAudio = new Audio(notificationSound);
popAudio.volume = 0.2;
notificationAudio.volume = 0.2;

type ChatResponse = {
  message: string[];
};

//---------------------------- Chatbot Component ----------------------------//
const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState("");
  const conversationId = useRef(crypto.randomUUID());

  const onSubmit = async ({ prompt }: ChatFormData) => {
    try {
      setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
      setIsBotTyping(true);
      setError("");
      popAudio.play();

      const { data } = await axios.post<ChatResponse>("/api/chat", {
        prompt,
        conversationId: conversationId.current,
      });

      // @ts-expect-error The API returns message as string[], but Message expects a string; adjust as needed.
      setMessages((prev) => [...prev, { content: data.message, role: "bot" }]);
      notificationAudio.play();
    } catch (error) {
      console.error(error);
      setError("⚠️ Something went wrong. Please try again!");
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-7rem)] max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
        <h2 className="text-lg font-semibold tracking-wide flex items-center gap-2">
          🤖 TivoliBot Assistant
        </h2>
        <span className="text-sm opacity-80">Ask me anything!</span>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col gap-4 p-5 overflow-y-auto bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <ChatMessages messages={messages} />

        {isBotTyping && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}

        {error && (
          <div className="text-center bg-red-50 text-red-600 px-3 py-2 rounded-lg border border-red-200">
            {error}
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="border-t border-gray-200 bg-white p-4">
        <ChatInput onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Chatbot;
