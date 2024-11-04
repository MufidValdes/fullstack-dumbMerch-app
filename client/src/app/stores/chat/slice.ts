import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Message = {
  senderId: number;
  message: string;
};

interface ChatState {
  messages: Message[];
  isConnected: boolean;
}

const initialState: ChatState = {
  messages: [],
  isConnected: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, setConnected, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
