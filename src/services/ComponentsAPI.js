import { BACKEND } from "./config";

const ENDPOINT = "components";

export const GetComponents = async () => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const components = await response.json();
  return components;
};

export const GetComponent = async (id) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${id}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const component = await response.json();
  return component;
};

export const SubmitComponent = async (component) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(component),
  });

  const addedComponent = await response.json();
  return addedComponent;
};

export const EditComponent = async (component) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${component._id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(component),
  });

  const editedComponent = await response.json();
  return editedComponent;
};

export const DeleteComponent = async (id) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  const component = await response.json();
  return component;
};
