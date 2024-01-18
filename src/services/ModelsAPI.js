import { BACKEND } from "./config";

const ENDPOINT = "models";

export const GetModels = async () => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const models = await response.json();
  return models;
};

export const GetModel = async (id) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${id}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const model = await response.json();
  return model;
};

export const SubmitModel = async (model) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(model),
  });

  const addedModel = await response.json();
  return addedModel;
};

export const EditModel = async (model) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${model._id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(model),
  });

  const editedModel = await response.json();
  return editedModel;
};

export const DeleteModel = async (id) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  const model = await response.json();
  return model;
};
