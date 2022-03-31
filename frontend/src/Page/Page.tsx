import React, { useState } from 'react';
import ChatPanel from '../ChatPanel/ChatPanel';
import Terminal from '../Terminal/Terminal';
import { Chat } from '../Types';

const Page: React.FC<{}> = ({}) => {
  const [username, setUserName] = useState<string>('anonymous');
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<number | null>(null); // index of active chat in chats array

  const handleCommandSent = (command: string) => {
    const cmd = command.split(' ')[0];
    const content = command.substring(cmd.length + 1);

    if (cmd === 'create-chat' && !(content.indexOf(' ') >= 0)) {
      createChat(content);
    } else if (cmd === 'join-chat' && !(content.indexOf(' ') >= 0)) {
      // fetch remote chat and add to chats
    } else if (cmd === 'msg') {
      sendMessage(content);
    } else if (cmd === 'change-username' && !(content.indexOf(' ') >= 0)) {
      setUserName(content);
    } else {
      console.log('invalid command');
    }
  };

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

  const sendMessage = (message: string) => {
    if (activeChat !== null) {
      const tempChats = [...chats];
      tempChats[activeChat].messages.push({
        username: username,
        text: message,
      });
      setChats(tempChats);
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
        activeChat={activeChat || null}
        onChangeActiveChat={handleChangeActiveChat}
      />
      <Terminal onCommandSend={handleCommandSent} />
    </div>
  );
};

export default Page;
