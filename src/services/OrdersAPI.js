import { BACKEND } from "./config";

const ENDPOINT = "orders";

export const GetOrders = async () => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const orders = await response.json();
  return orders;
};

export const GetOrder = async (id) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${id}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const order = await response.json();
  return order;
};

export const SubmitOrder = async (order) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(order),
  });

  const addedOrder = await response.json();
  return addedOrder;
};

export const EditOrder = async (order) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${order._id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(order),
  });

  const editedOrder = await response.json();
  return editedOrder;
};

export const DeleteOrder = async (id) => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  const order = await response.json();
  return order;
};
