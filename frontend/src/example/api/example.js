export const getExamples = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/examples`
  );
  return await res.json();
};

export const createExample = async ({ name, description, token }) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/examples`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    }
  );

  return await res.json();
};

export const deleteExample = async ({ id, token }) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/examples/id`,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

  return await res.json();
};
