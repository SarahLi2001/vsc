export type Chat = {
  name: string;
  messages: Message[];
};

export type Message = {
  username: string;
  text: string;
};

// export type ServerToClientEvents = {
//   noArg: () => void;
//   messageReceipt: (chat: Chat) => void;
//   chatCreated: (chat: Chat) => void;
//   chatChange: (chatName: string) => void;
//   usernameChange: (username: string) => void;
// };

// export type ClientToServerEvents = {
//   createChat: (newChat: Chat) => void;
//   changeChat: (chatName: string) => void;
//   messageSent: (chatToUpdate: Chat) => void;
//   changeUsername: (chosenName: string) => void;
// };

// export type SocketData = {
//   username: string;
//   chats: Chat[];
//   activeChat: number;
// };
