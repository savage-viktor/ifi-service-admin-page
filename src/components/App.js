import { Route, Routes } from "react-router-dom";

import SharedLayout from "./pages/SharedLayout";
import Models from "./pages/Models";
import Services from "./pages/Services";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";
import Model from "./pages/Model";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { getLoginStatus } from "../redux/login/selectors";

function App() {
  const isLogin = useSelector(getLoginStatus);

  return (
    <Routes>
      <Route path="/" element={isLogin ? <SharedLayout /> : <Login />}>
        <Route index element={<Models />} />
        <Route path="services" element={<Services />} />
        <Route path="messages" element={<Messages />} />
        <Route path="shop" element={<Messages />} />
        <Route path="/:modelId" element={<Model />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
}

export default App;