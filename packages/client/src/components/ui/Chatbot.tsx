import { Button } from './button';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRef } from 'react';

type FormData = {
   prompt: string;
};

const Chatbot = () => {
   const { register, handleSubmit, reset, formState } = useForm<FormData>();
   const conversationId = useRef(crypto.randomUUID())

   const onSubmit = async ({prompt}: FormData) => {
      reset();
      const {data} = await axios.post('/api/chat', {
        prompt: prompt,
        conversationId: conversationId.current
      })
      console.log(data);

   };

   const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
      >
         <textarea
            {...register('prompt', {
               required: true,
               validate: (data) => data.trim().length > 0, // Prevents only whitespace input
            })}
            onKeyDown={onKeyDown}
            className="w-full border-0 focus:outline-0 resize-none"
            placeholder="Ask me anything..."
            maxLength={1000}
         />
         <Button disabled={!formState.isValid} className="rounded-full w-9 h-9">
            <FaArrowUp />
         </Button>
      </form>
   );
};

export default Chatbot;
