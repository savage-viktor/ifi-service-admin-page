const EditModel = async model => {
  const response = await fetch(
    `https://6519e0a5340309952f0cc472.mockapi.io/api/ifiservice/Models/${model.id}`,
    {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(model),
    }
  );

  const editedModel = await response.json();
  return editedModel;
};

export default EditModel;
