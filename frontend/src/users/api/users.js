export const signUpUser = async ({ name, email, password }) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  return await res.json();
};

export const loginUser = async ({ email, password }) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  return await res.json();
};
