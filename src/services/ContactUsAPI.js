import { BACKEND } from "./config";

const ENDPOINT = "contactUs";

export const GetMessages = async () => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const messages = await response.json();
  return messages;
};

export const GetMessage = async (id) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${id}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const message = await response.json();
  return message;
};

export const SubmitMessage = async (model) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(model),
  });

  const addedMessage = await response.json();
  return addedMessage;
};

export const DeleteMessage = async (id) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  const message = await response.json();
  return message;
};
