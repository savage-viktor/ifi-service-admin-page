import { Route, Routes } from "react-router-dom";

import SharedLayout from "./pages/SharedLayout";
import Models from "./pages/Models";
import Services from "./pages/Services";
import Service from "./pages/Service";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";
import Model from "./pages/Model";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { getLoginStatus } from "../redux/login/selectors";
import Components from "./pages/Components";
import Shop from "./pages/Shop";
import Clients from "./pages/Clients";
import Orders from "./pages/Orders";
import Order from "./pages/Order";

function App() {
  // const { isLogin } = useSelector(getLoginStatus);
  const isLogin = true;

  return (
    <Routes>
      <Route path="/" element={isLogin ? <SharedLayout /> : <Login />}>
        <Route index element={<Models />} />
        <Route path="orders" element={<Orders />} />
        <Route path="order" element={<Order />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:serviceId" element={<Service />} />
        <Route path="messages" element={<Messages />} />
        <Route path="shop" element={<Shop />} />
        <Route path="components" element={<Components />} />
        <Route path="clients" element={<Clients />} />
        <Route path="/:modelId" element={<Model />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
}

export default App;
