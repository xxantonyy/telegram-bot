import fetch from 'node-fetch';

async function authenticateUser(login, password) {
  const response = await fetch('https://todosapi.homelabforton.ru/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password })
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data.token; // предположим, что токен в поле token
}


export { authenticateUser }