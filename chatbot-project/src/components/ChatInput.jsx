import dayjs from "dayjs";
import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';
import SpinningGif from '../assets/loading-spinner.gif'
export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }

    setIsLoading(true);

    setInputText('');
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];
    setChatMessages([
      ...newChatMessages,
      // This creates a temporary Loading... message.
      // Because we don't save this message in newChatMessages,
      // it will be removed later, when we add the response.
      {
        message: <img src={SpinningGif} className="loading-gif" />,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);
    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);
    setIsLoading(false);
  }
  function clearMessages() {
    setChatMessages([
      // Here, you could also run:
      // localStorage.setItem('messages', JSON.stringify([]));

      // However, because chatMessages is being updated, the
      // useEffect in the App component will run, and it will
      // automatically update messages in localStorage to be [].
    ]);
  }
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }
  return (
    <div className="input-container">
      <input
        className="input-field"
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
      />
      <button
        className="send-button"
        onClick={sendMessage}
      >Send</button>
      <button
        onClick={clearMessages}
        className="clear-button">
        Clear</button>
    </div>
  );
}