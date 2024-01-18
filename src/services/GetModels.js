const GetModels = async () => {
  const response = await fetch(
    'https://6519e0a5340309952f0cc472.mockapi.io/api/ifiservice/Models',
    {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }
  );

  const models = await response.json();
  return models;
};

export default GetModels;
