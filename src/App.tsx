import { Route, Routes } from "react-router-dom";
import ChatPage from "./MyComponents/ChatPage";
import ConversationPage from "./MyComponents/ConversationPage";
import "./App.css";
import SignInPage from "./MyComponents/SignInPage";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<SignInPage></SignInPage>} />
        <Route path={"/home"} element={<ChatPage />} />
        <Route path={"/conversations"} element={<ConversationPage />} />
      </Routes>
    </>
  );
}

export default App;
