import React from 'react';
import { Chat } from '../Types';

type ChatPanelProps = {
  chats: Chat[];
  activeChat: number | null;
  onChangeActiveChat: (newActiveChat: number) => void;
};

const ChatPanel: React.FC<ChatPanelProps> = ({
  chats,
  activeChat,
  onChangeActiveChat,
}) => {
  return (
    <div className='chat-panel'>
      <div>CHATS</div>
      {chats.map((chat, index) => {
        // render tabs
        return (
          <div key={index} onClick={() => onChangeActiveChat(index)}>
            {chat.name}
          </div>
        );
      })}
      {activeChat !== null ? (
        <ActiveChat chat={chats[activeChat]} />
      ) : (
        <NoActiveChat />
      )}
    </div>
  );
};

type ActiveChatProps = {
  chat: Chat;
};

const ActiveChat: React.FC<ActiveChatProps> = ({ chat }) => {
  return (
    <div className='active-chat'>
      <div>ACTIVE CHAT: {chat.name}</div>
      {chat.messages.map((message, index) => {
        return <div key={index}>{message}</div>;
      })}
    </div>
  );
};

const NoActiveChat: React.FC<{}> = () => {
  return <div className='no-active-chat'></div>;
};

export default ChatPanel;
