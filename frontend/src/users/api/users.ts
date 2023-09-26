type NewUser = {
  username?: string;
  email?: string;
  password?: string;
};

export const signUpUser = async ({ username, email, password }: NewUser) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await res.json();
  return data;
};

type ExistingUser = Omit<NewUser, 'username'>;

export const loginUser = async ({ email, password }: ExistingUser) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();
  return data;
};
