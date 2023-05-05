export const getExamples = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/examples`);
  const data = await res.json();
  return data;
};

type NewExample = {
  name: string;
  description: string;
  token: string;
};

export const createExample = async ({
  name,
  description,
  token,
}: NewExample) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/examples`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });

  const data = await res.json();
  return data;
};

type DeleteParams = {
  id: number;
  token: string;
};

export const deleteExample = async ({ id, token }: DeleteParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/examples/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return data;
};
