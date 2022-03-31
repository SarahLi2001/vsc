export type Chat = {
  name: string;
  messages: Message[];
};

export type Message = {
  username: string;
  text: string;
};
