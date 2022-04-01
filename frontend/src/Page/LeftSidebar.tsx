import React from "react";
import { Chat } from "../Types";
import pages from "../Icons/pages.svg";
import search from "../Icons/search.svg";
import source_control from "../Icons/source-control.svg";
import bug from "../Icons/bug.svg";
import blocks from "../Icons/blocks.svg";
import profile from "../Icons/profile.svg";
import gear from "../Icons/gear-regular-1.svg";

type Props = {
  chats: Chat[];
  activeChat: number;
  onChangeActiveChat: (newActiveChat: number) => void;
};

const LeftSidebar: React.FC<Props> = ({
  chats,
  activeChat,
  onChangeActiveChat,
}) => {
  const chatNames = chats.map((chat: Chat) => chat.name);

  return (
    <div className="left-sidebar">
      <div className="left-of-sidebar">
        <div className="top-icons">
          <img src={pages} />
          <img src={search} />
          <img src={source_control} />
          <img src={bug} />
          <img src={blocks} />
        </div>
        <div className="bottom-icons">
          <img src={profile} />
          <img src={gear} />
        </div>
      </div>
      <div className="right-of-sidebar">
        <h2>Explorer</h2>
        <h3>
          <span>&#709;</span> Chatrooms
          <div className="plus">&#43;</div>
        </h3>
        <ul className="sidebar-chats-list">
          {!chatNames.length && (
            <li className="non-selectable-tab">&gt; no_chats_yet</li>
          )}
          {chatNames.map((chatName, index) => (
            <li
              key={index}
              className={activeChat === index ? "current-chat" : ""}
              onClick={() => onChangeActiveChat(index)}
            >
              &gt; {activeChat === index && "[1]"}
              {chatName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
