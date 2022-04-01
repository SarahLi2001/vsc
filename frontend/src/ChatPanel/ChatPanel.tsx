import React from "react";

import { Chat } from "../Types";
import "./ChatPanel.css";

type ChatPanelProps = {
  chats: Chat[];
  activeChat: number;
  onChangeActiveChat: (newActiveChat: number) => void;
};

const ChatPanel: React.FC<ChatPanelProps> = ({
  chats,
  activeChat,
  onChangeActiveChat,
}) => {
  return (
    <div className="chat-panel">
      {/* <div>CHATS</div> */}
      {chats.map((chat, index) => {
        // TODO: render as tabs
        return (
          <div key={index} onClick={() => onChangeActiveChat(index)}>
            {chat.name}
          </div>
        );
      })}
      {chats.length > 0 && activeChat >= 0 ? (
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
    <div className="active-chat">
      <div>ACTIVE CHAT: {chat.name}</div>
      {chat.messages.map((message, index) => {
        if (message.join) {
          return (
            <div key={index}>
              const{" "}
              <span className="username-on-connect">{message.username}</span> =
              () =&gt; "successfully connected to {chat.name}" ;
            </div>
          );
        } else if (message.usernameChange) {
          return (
            <div key={index}>
              {message.username} has changed their username to {message.text}
            </div>
          );
        } else {
          return (
            <div key={index}>
              {message.username}: {message.text}
            </div>
          );
        }
      })}
    </div>
  );
};

const NoActiveChat: React.FC<{}> = () => {
  return <div className="no-active-chat"></div>;
};

export default ChatPanel;
