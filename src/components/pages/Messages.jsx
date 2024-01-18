import { useEffect, useState } from "react";
import MassageList from "../MassageList/MassageList";
import { DeleteMessage, GetMessages } from "../../services/ContactUsAPI";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

function Messages() {
  const [status, setStatus] = useState("idle");
  const [messages, setMessages] = useState(false);
  const [update, setUpdate] = useState(1);

  useEffect(() => {
    setStatus("loading");
    GetMessages()
      .then((messages) => {
        setMessages(messages);
        setStatus("idle");
      })
      .catch((error) => {
        console.log(error.message);
        setStatus("error");
      });
  }, [update]);

  const handleDeleteModel = async (id) => {
    await DeleteMessage(id);
    setUpdate((prevState) => prevState + 1);
  };

  return (
    <>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {messages && (
        <>
          Всього {messages.length}
          <MassageList messages={messages} onDelete={handleDeleteModel} />
        </>
      )}
    </>
  );
}
export default Messages;
