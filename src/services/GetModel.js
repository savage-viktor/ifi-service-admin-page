const GetModel = async (id) => {
  const response = await fetch(
    `https://6519e0a5340309952f0cc472.mockapi.io/api/ifiservice/Models/${id}`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
    }
  );

  const model = await response.json();
  return model;
};

export default GetModel;
