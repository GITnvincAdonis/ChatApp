import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./MyComponents/ChatPage";
import ConversationPage from "./MyComponents/ConversationPage";

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
