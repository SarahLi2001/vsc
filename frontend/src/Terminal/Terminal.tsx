import React from 'react';
import Terminal from 'react-console-emulator';

type TerminalProps = {
  username: string;
  onChatOpen: (chatName: string) => void;
  onChatChange: (chatIndex: number) => void;
  onMessageSend: (messageText: string) => void;
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
  const commands = {
    chat: {
      description: 'Open a chat tab',
      usage: 'chat <chat-name>',
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
          return 'chat name must not contain spaces';
        }
      },
    },
    send: {
      description: 'Send a message to the currently opened chat',
      usage: 'send <message-content>',
      fn: (...args: string[]) => {
        onMessageSend(args.join(' '));
        return 'message sent!';
      },
    },
    username: {
      description: 'Change your username',
      usage: 'username <new-username>',
      fn: (...args: string[]) => {
        if (args.length === 1) {
          onUsernameChange(args[0]);
          return `username changed to ${args[0]}!`;
        } else {
          return 'username must not contain spaces';
        }
      },
    },
  };

  return (
    <div className='terminal'>
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
