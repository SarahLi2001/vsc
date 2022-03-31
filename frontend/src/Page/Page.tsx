import React, { useState } from 'react';

import { Chat, Message } from '../Types';
import ChatPanel from '../ChatPanel/ChatPanel';
import TerminalComponent from '../Terminal/Terminal';

const Page: React.FC<{}> = ({}) => {
  const [username, setUsername] = useState<string>('anonymous');
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<number>(-1); // index of active chat in chats array

  const createChat = (chatName: string) => {
    const tempChats = [...chats];
    const newChat = {
      name: chatName,
      messages: [],
    };
    tempChats.push(newChat);
    setChats(tempChats);
    setActiveChat(tempChats.indexOf(newChat));
  };

  const applyMessage = (chatIndex: number, message: Message) => {
    const tempChats = [...chats];
    tempChats[chatIndex].messages.push(message);
    setChats(tempChats);
  };

  const sendMessage = (messageText: string) => {
    if (activeChat >= 0) {
      const newMessage = {
        username: username,
        text: messageText,
      };
      applyMessage(activeChat, newMessage);
      // TODO: send to server
    }
  };

  const receiveMessage = (chatName: string, message: Message) => {
    // TODO: call when message received from server
    const chatIndex = chats.findIndex((chat) => {
      return chat.name === chatName;
    });
    if (chatIndex >= 0) {
      applyMessage(chatIndex, message);
    }
  };

  const handleChangeActiveChat = (newActiveChat: number) => {
    setActiveChat(newActiveChat);
  };

  return (
    <div className='chat-panel'>
      <></>
      <ChatPanel
        chats={chats}
        activeChat={activeChat}
        onChangeActiveChat={handleChangeActiveChat}
      />
      <TerminalComponent
        username={username}
        onChatOpen={createChat}
        onMessageSend={sendMessage}
        onUsernameChange={setUsername}
      />
    </div>
  );
};

export default Page;
