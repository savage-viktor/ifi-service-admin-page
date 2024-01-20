import { BACKEND } from "./config";

const ENDPOINT = "services";

export const GetServices = async () => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const services = await response.json();
  return services;
};

export const SubmitService = async (service) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(service),
  });

  const addedService = await response.json();
  return addedService;
};

export const EditService = async (service) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${service._id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(service),
  });

  const editedService = await response.json();
  return editedService;
};

export const DeleteService = async (id) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  const deletedService = await response.json();
  return deletedService;
};
