import { BACKEND } from "./config";

const ENDPOINT = "clients";

export const GetClients = async () => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const clients = await response.json();
  return clients;
};

export const GetClient = async (id) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${id}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const client = await response.json();
  return client;
};

export const SubmitClient = async (model) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(model),
  });

  const addedClient = await response.json();
  return addedClient;
};

export const EditClient = async (model) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${model._id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(model),
  });

  const editedClient = await response.json();
  return editedClient;
};

export const DeleteClient = async (id) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  const client = await response.json();
  return client;
};
