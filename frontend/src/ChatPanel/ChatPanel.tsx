
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CodeBlock, dracula } from "react-code-blocks";
import { sample } from '../components'
import Button from 'react-bootstrap'

import 'react-tabs/style/react-tabs.css';

import { Chat } from "../Types";
import "./ChatPanel.css";

type ChatPanelProps = {
  chats: Chat[];
  activeChat: number;
  onChangeActiveChat: (newActiveChat: number) => void;
};

const IncognitoModeChat: React.FC<{}> = () => {
  const language ="jsx";
  const languageDemo = sample["jsx"];
  return (
    <CodeBlock
      text={languageDemo}
      language={language}
      showLineNumbers={true}
      theme={dracula}
      wrapLines={true}>
        
    </CodeBlock>
    
  )
}


const ChatPanel: React.FC<ChatPanelProps> = ({
  chats,
  activeChat,
  onChangeActiveChat
}) => {
  const [incognitoMode, setIncognitoMode] = useState(false)
  return (
    <div className='chat-panel'>
      <Tabs id='controlled-tabs' selectedTabClassName='bg-white'>
        <TabList>
        {chats.map((chat, index) => {
        // TODO: render as tabs
        return (
            <Tab key={index} onClick={() => onChangeActiveChat(index)}>{chat.name}</Tab>
        );
      }) }
      {chats.length > 0 &&
       <Tab>
          <button onClick={() => setIncognitoMode(!incognitoMode)}><img src='incognito toggle OFF.svg'/></button>
        </Tab>}

        </TabList>
      {chats.map(() => {
        return (
         <TabPanel>
          <ActiveChat chat={chats[activeChat]} />
      </TabPanel>
        )
      })}
      {incognitoMode && <TabPanel>
        <IncognitoModeChat/>
        </TabPanel>}
        
   
     
 
      </Tabs>
     
    </div>
  );
};

type ActiveChatProps = {
  chat: Chat;
};

const ActiveChat: React.FC<ActiveChatProps> = ({ chat }) => {
  console.log(chat.messages)
  return (
    <div className='active-chat'>
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
