import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import { Chat, Message } from "../Types";
import ChatPanel from "../ChatPanel/ChatPanel";
import TerminalComponent from "../Terminal/Terminal";

const Page: React.FC = () => {
  const [socket, setSocket] = useState<any>();
  const [username, setUsername] = useState<string>("anonymous");
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<number>(-1); // index of active chat in chats array

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("messageReceipt", (chat: Chat) => {
      console.log("chat: ", chat);

      setChats((prevChats) => [
        ...prevChats.map((thisChat) => {
          return thisChat.name === chat.name ? chat : thisChat;
        }),
      ]);
    });

    socket.on("chatCreated", (chat: Chat, chatLength: number) => {
      setChats((prevChats) => {
        return [...prevChats, chat];
      });
      setActiveChat((prevIndex) => chatLength);
    });

    socket.on("chatChange", (chatIndex: number) => {
      setActiveChat((prevIndex) => chatIndex);
    });

    socket.on("usernameChange", (username: string) => {
      setUsername((prevUsername) => username);
    });
  }, [socket]);

  const createChat = (chatName: string) => {
    const newChat: Chat = {
      name: chatName,
      messages: [{ username, text: `let newChat = "${chatName}"` }],
    };

    let oldChat;

    socket.emit(
      "createChat",
      newChat,
      (oldChat = activeChat > -1 && chats[activeChat].name),
      chats.length
    );
  };

  const changeChat = (chatName: string) => {
    const chatIndex = chats.findIndex((chat) => chat.name === chatName);

    let oldChat;
    socket.emit(
      "changeChat",
      chatName,
      chatIndex,
      (oldChat = chats[activeChat].name)
    );
  };

  const sendMessage = (messageText: string) => {
    const newMessage: Message = {
      username: username,
      text: messageText,
    };

    let chatToUpdate: Chat = chats[activeChat];
    chatToUpdate.messages.push(newMessage);
    socket.emit("messageSent", chatToUpdate);
  };

  const changeUsername = (chosenName: string) => {
    setUsername(chosenName);
  };

  return (
    <div className="chat-panel">
      <ChatPanel
        chats={chats}
        activeChat={activeChat}
        onChangeActiveChat={setActiveChat}
      />
      <TerminalComponent
        username={username}
        createChat={createChat}
        changeChat={changeChat}
        onMessageSend={sendMessage}
        onUsernameChange={changeUsername}
        existingChats={chats.map((chat) => chat.name)}
      />
    </div>
  );
};

export default Page;
