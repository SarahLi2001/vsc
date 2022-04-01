import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Page.css";

import { Chat, Message } from "../Types";
import ChatPanel from "../ChatPanel/ChatPanel";
import TerminalComponent from "../Terminal/Terminal";
import LeftSidebar from "./LeftSidebar";
import { codeNames } from "../CodeNames";

const generateCodeName = () => {
  return (
    codeNames.firstNames[
      Math.floor(Math.random() * codeNames.firstNames.length)
    ] +
    codeNames.lastNames[Math.floor(Math.random() * codeNames.lastNames.length)]
  );
};

const Page: React.FC = () => {
  const [socket, setSocket] = useState<any>();
  const [username, setUsername] = useState<string>(generateCodeName());
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<number>(-1); // index of active chat in chats array

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("messageReceipt", (chatName: string, message: Message) => {
      console.log(chatName);
      setChats((prevChats) => {
        const newChats = [...prevChats];
        const chatIndex = newChats.findIndex((chat) => {
          return chat.name === chatName;
        });
        if (chatIndex >= 0) {
          newChats[chatIndex].messages.push(message);
        }
        return newChats;
      });
    });
  }, [socket]);

  const openChat = (chatName: string) => {
    const newChat: Chat = {
      name: chatName,
      messages: [],
    };
    setChats((prevChats) => {
      return [...prevChats, newChat];
    });
    setActiveChat((prevIndex) => chats.length);
    socket.emit("openChat", newChat.name);
    const joinMessage: Message = {
      username: username,
      text: "",
      join: true,
    };
    socket.emit("messageSent", newChat.name, joinMessage);
  };

  const sendMessage = (messageText: string) => {
    if (activeChat >= 0) {
      const newMessage = {
        username: username,
        text: messageText,
      };
      socket.emit("messageSent", chats[activeChat].name, newMessage);
    }
  };

  const changeUsername = (chosenName: string) => {
    chats.forEach((chat) => {
      const newMessage: Message = {
        username: username,
        text: chosenName,
        usernameChange: true,
      };
      socket.emit("messageSent", chat.name, newMessage);
    });
    setUsername(chosenName);
  };

  return (
    <div className="page">
      <LeftSidebar
        chats={chats}
        activeChat={activeChat}
        onChangeActiveChat={setActiveChat}
        openChat={openChat}
      />
      <main className="main-container">
        <ChatPanel
          chats={chats}
          activeChat={activeChat}
          onChangeActiveChat={setActiveChat}
        />
        <TerminalComponent
          username={username}
          onChatChange={setActiveChat}
          onChatOpen={openChat}
          onMessageSend={sendMessage}
          onUsernameChange={changeUsername}
          existingChats={chats.map((chat) => chat.name)}
        />
      </main>
    </div>
  );
};

export default Page;
