export const SubmitService = async service => {
  const response = await fetch(
    'https://6547fc62902874dff3acea00.mockapi.io/ifiservice/Services',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(service),
    }
  );

  const addedService = await response.json();
  return addedService;
};

export const EditService = async service => {
  const response = await fetch(
    `https://6547fc62902874dff3acea00.mockapi.io/ifiservice/Services/${service.id}`,
    {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(service),
    }
  );

  const editedService = await response.json();
  return editedService;
};

export const GetServices = async () => {
  const response = await fetch(
    'https://6547fc62902874dff3acea00.mockapi.io/ifiservice/Services',
    {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }
  );

  const services = await response.json();
  return services;
};

export const DeleteService = async id => {
  const response = await fetch(
    `https://6547fc62902874dff3acea00.mockapi.io/ifiservice/Services/${id}`,
    {
      method: 'DELETE',
    }
  );

  const deletedService = await response.json();
  return deletedService;
};
