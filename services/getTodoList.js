async function getTodoList(token) {
  const response = await fetch('https://todosapi.homelabforton.ru/todos', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }

  return response.json(); // список задач
}
