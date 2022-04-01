import React from "react";
import Terminal from "react-console-emulator";

type TerminalProps = {
  username: string;
  createChat: (chatName: string) => void;
  changeChat: (chatName: string) => void;
  // onChatOpen: (chatName: string) => void;
  onMessageSend: (messageText: string) => void;
  onUsernameChange: (newUsername: string) => void;
  existingChats: string[];
};

const TerminalComponent: React.FC<TerminalProps> = ({
  username,
  createChat,
  changeChat,
  // onChatOpen,
  onMessageSend,
  onUsernameChange,
  existingChats,
}) => {
  const onChatOpen = (chatName: string) => {
    existingChats.includes(chatName)
      ? changeChat(chatName)
      : createChat(chatName);
  };

  const commands = {
    chat: {
      description: "Open a chat tab",
      usage: "chat <chat-name>",
      fn: (...args: string[]) => {
        if (args.length === 1) {
          onChatOpen(args.join(" "));
          return "chat opened!";
        } else {
          return "chat name must not contain spaces";
        }
      },
    },
    send: {
      description: "Send a message to the currently opened chat",
      usage: "send <message-content>",
      fn: (...args: string[]) => {
        onMessageSend(args.join(" "));
        return "message sent!";
      },
    },
    username: {
      description: "Change your username",
      usage: "username <new-username>",
      fn: (...args: string[]) => {
        if (args.length === 1) {
          onUsernameChange(args[0]);
          return `username changed to ${args[0]}!`;
        } else {
          return "username must not contain spaces";
        }
      },
    },
  };

  return (
    <div className="terminal">
      <Terminal
        commands={commands}
        welcomeMessage={
          'Welcome to VSC! Type command "help" for available commands'
        }
        promptLabel={`${username}@vsc:~$`}
        autoFocus={true}
      />
    </div>
  );
};

export default TerminalComponent;
