import { Route, Routes } from "react-router-dom";
import ChatPage from "./MyComponents/ChatPage";
import ConversationPage from "./MyComponents/ConversationPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<ChatPage />} />
        <Route path={"/conversations"} element={<ConversationPage />} />
      </Routes>
    </>
  );
}

export default App;
