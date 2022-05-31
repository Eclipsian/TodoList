import './App.css';
import React from 'react';



const initialTodos = [
  {
    title: 'Title',
    completed: false,
  },
  {
    title: '...',
    completed: false,
    editable: false,
  },
];



const Todolist = () => {
  const [todos, setTodos] = React.useState(initialTodos);
  const [newTodo, setNewTodo] = React.useState('');

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.length === 0) {
      return alert('Please enter a todo');
    }
    const nextTodos = [...todos];
    nextTodos.push({
      title: newTodo,
      completed: false,
      editable: false,
    });
    setTodos(nextTodos);
    setNewTodo('');
  };

  const handleToggleComplete = (index) => {
    const nextTodos = [...todos];
    nextTodos[index].completed = !nextTodos[index].completed;
    setTodos(nextTodos);
  };
  
  const handleDeleteTodo = (index) => {
    const nextTodos = [...todos];
    nextTodos.splice(index, 1);
    setTodos(nextTodos);
  };

  const handleMakeEditable = (index) => {
    const nextTodos = [...todos];
    nextTodos[index].editable = true;
    setTodos(nextTodos);
  };

  const handleEditTodo = (index, newTitle) => {
    const nextTodos = [...todos];
    nextTodos[index].title = newTitle;
    setTodos(nextTodos);
  };

  const handleFinishEdit = (index) => {
    const nextTodos = [...todos];
    nextTodos[index].editable = false;
    setTodos(nextTodos);
  };
  
  return (
    
    <div className='flex items-center justify-center h-screen'>
      <div>
        <h1 className='font-mono text-4xl font-extrabold text-center'>
          {todos.length
          ? `${todos.length} todos for today`
        : 'No todos for today'}
        </h1>
        <ul className='my-8 space-y-4'>
         {todos.map((todo, index) => (
          <li key={index} className='flex items-center space-x-4'>
            <div className='flex items-center justify-between space-x-4'>
              <div className='cursor-pointer' onClick={() => handleToggleComplete(index)}>
                <input type='checkbox' />
              </div>
              {todo.editable ? (
                <input className='w-full px-2.5 py1.5 mx-auto text-lg font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-offset-2 focus:ring-gray-500 h-10 justify-center'
                onChange={(e) => handleEditTodo(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleFinishEdit(index);
                }}
                value={todo.title} />
              ) : (
                <span onClick={() => handleMakeEditable(index)} className='font-mono text-xl font-semibold truncate w-60'>{todo.title}</span>
              )}
              </div>
              <button onClick={() => handleDeleteTodo(index)} className='text-white bg-red-500 px-3.5 py-1.5 border border-transparent font-medium rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>Delete</button>
            </li>
          ))}
        </ul>
        <div className='flex space-x-4'>
          <input className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline' onChange={handleInputChange} value={newTodo} type='text' />
          <button className='w-40 text-white bg-blue-500 px-3.5 py-1.5 border border-transparent font-medium rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' onClick={handleAddTodo}>Add Todo</button>
        </div>
      </div>
    </div>
  );
};

export default Todolist;