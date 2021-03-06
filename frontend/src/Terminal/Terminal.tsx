import React from "react";
import Terminal from "react-console-emulator";
import "./Terminal.css";

type TerminalProps = {
  username: string;
  onChatOpen: (chatName: string) => void;
  onChatChange: (chatIndex: number) => void;
  onMessageSend: (
    messageText: string,
    color?: string,
    declarationType?: string
  ) => void;
  onUsernameChange: (newUsername: string) => void;
  existingChats: string[];
};

const TerminalComponent: React.FC<TerminalProps> = ({
  username,
  onChatOpen,
  onChatChange,
  onMessageSend,
  onUsernameChange,
  existingChats,
}) => {
  const colors = ["yellow", "blue", "pink"];

  const chooseColor = () => colors[Math.floor(Math.random() * 2)];

  const letConstOrFunc = ["let", "const", "func"];

  const getDeclarationType = () =>
    letConstOrFunc[Math.floor(Math.random() * 2)];

  const commands = {
    chat: {
      description: "Open a chat tab",
      usage: "chat <chat-name>",
      fn: (...args: string[]) => {
        if (args.length === 1) {
          const existingChatIndex = existingChats.findIndex((chat) => {
            return chat === args[0];
          });
          if (existingChatIndex >= 0) {
            onChatChange(existingChatIndex);
            return `switched to ${args[0]} chat`;
          } else {
            onChatOpen(args[0]);
            return `${args[0]} chat opened!`;
          }
        } else {
          return "chat name must not contain spaces";
        }
      },
    },
    send: {
      description: "Send a message to the currently opened chat",
      usage: "send <message-content>",
      fn: (...args: string[]) => {
        onMessageSend(args.join(" "), chooseColor(), getDeclarationType());
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
    <div className="terminal-component">
      <div className="terminal-tabs">
        <div className="terminal-tab">PROBLEMS</div>
        <div className="terminal-tab">OUTPUT</div>
        <div className="terminal-tab">DEBUG CONSOLE</div>
        <div className="terminal-tab terminal-tab--selected">TERMINAL</div>
        <div className="terminal-searchbar">
          Search (e.g. text, **/*.ts, !**/node_modules/**)
        </div>
        <div className="terminal-hideicon"></div>
      </div>
      <Terminal
        commands={commands}
        welcomeMessage={
          'Welcome to VSC! Type command "help" for available commands'
        }
        promptLabel={`${username}@vsc:~$`}
        autoFocus={true}
        style={terminalStyle}
        contentStyle={terminalContentStyle}
        styleEchoBack={"fullInherit"}
      />
    </div>
  );
};

export default TerminalComponent;

const terminalStyle: React.CSSProperties = {
  backgroundColor: "#110c1a",
  height: "calc(100% - 60px)",
  minHeight: "unset",
  borderRadius: 0,
  overflow: "hidden",
};

const terminalContentStyle: React.CSSProperties = {
  color: "#AE7CFF",
};
