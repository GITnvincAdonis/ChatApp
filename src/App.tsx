import { Route, Routes } from "react-router-dom";
import ChatPage from "./MyComponents/ChatPage";
import ConversationPage from "./MyComponents/ConversationPage";
import "./App.css";
import SignInPage from "./MyComponents/SignInPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Client = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={Client}>
        <Routes>
          <Route path={"/"} element={<SignInPage></SignInPage>} />
          <Route path={"/home"} element={<ChatPage />} />
          <Route path={"/conversations"} element={<ConversationPage />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
