import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CodeBlock, dracula } from "react-code-blocks";
import { sample } from "../components";
import incognitoOn from "../Icons/incognito toggle ON.svg";
import incognitoOff from "../Icons/incognito toggle OFF.svg";

import ellipsis from "../Icons/ellipsis-regular (1) 1.svg";
import add from "../Icons/add.svg";
import JS from "../Icons/JS.svg";

import Button from 'react-bootstrap'


import "react-tabs/style/react-tabs.css";

import { Chat } from "../Types";
import "./ChatPanel.css";

type ChatPanelProps = {
  chats: Chat[];
  activeChat: number;
  onChangeActiveChat: (newActiveChat: number) => void;
};

const IncognitoModeChat: React.FC<{}> = () => {
  const language = "jsx";
  const languageDemo = sample["jsx"];
  return (
    <CodeBlock
      text={languageDemo}
      language={language}
      showLineNumbers={true}
      theme={dracula}
      wrapLines={true}
    ></CodeBlock>
  );
};

const ChatPanel: React.FC<ChatPanelProps> = ({
  chats,
  activeChat,
  onChangeActiveChat,
}) => {
  const [incognitoMode, setIncognitoMode] = useState(false);
  return (
    <div className='chat-panel'>
      <Tabs className='tabs-panel' id='controlled-tabs' selectedTabClassName="current-chat" >
        <TabList>
          <div className='tabs-container'>
            <div className='chat-tabs'>
            {chats.map((chat, index) => {
            // TODO: render as tabs
            return (
                <Tab key={index} onClick={() => onChangeActiveChat(index)}><img style= {{ width: 15, marginRight: 5}}className='tab-image' src={JS}/>{chat.name}</Tab>
            );
          }) }
            </div>
             <div>
             {chats.length > 0 &&
            <Tab>
              <div className='tab-buttons'>
                <button><img style={{width: 20}} src={add}/></button>
                <button onClick={() => setIncognitoMode(!incognitoMode)}><img style={{ width: 20}} src={incognitoMode? incognitoOff: incognitoOn}/></button>
                <button><img style={{width: 20}} src={ellipsis}/></button>
              </div>
            </Tab>}
             </div>
          </div>
        </TabList>
        {chats.map(() => {
          return (
            <TabPanel>
              {incognitoMode ? (
                <ActiveChat chat={chats[activeChat]} />
              ) : (
                <IncognitoModeChat />
              )}
            </TabPanel>
          );
        })}
      </Tabs>
    </div>
  );
};

type ActiveChatProps = {
  chat: Chat;
};

const ActiveChat: React.FC<ActiveChatProps> = ({ chat }) => {
  return (
    <div className="active-chat">
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
          console.log(message.color);
          const { color, declarationType } = message;

          return (
            <div key={index}>
              {declarationType === "const" && (
                <>
                  const{" "}
                  <span className={`message-sender-color-${color}`}>
                    {message.username}
                  </span>{" "}
                  = '{message.text}';
                </>
              )}

              {declarationType === "let" && (
                <>
                  let{" "}
                  <span className={`message-sender-color-${color}`}>
                    {message.username}
                  </span>{" "}
                  = '{message.text}';
                </>
              )}

              {/* todo FIX */}
              {declarationType === "func" && (
                <>
                  const{" "}
                  <span className={`message-sender-color-${color}`}>
                    {message.username}
                  </span>{" "}
                  = '{message.text}';
                </>
              )}
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
