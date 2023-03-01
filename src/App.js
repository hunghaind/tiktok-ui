import {useRef, useState} from 'react';
import classNames from 'classnames/bind';
import styles from './App.module.scss';

const cx = classNames.bind(styles)

function App() {
  const inputRef = useRef();
  const [todoKey, setTodoKey] = useState(1);
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleAdd();
    }
  }
  const handleAdd = () => {
    const check = todos.filter(todo => todo.value === todoInput.toLowerCase());

    if (check.length > 0) {
      alert('This todo has been existed. Please add another todo!')
    } else if(!todoInput) {
      alert('Please input a task!')
    } else {
      setTodos(prevState => {
        return (
            [...prevState, {
              key: todoKey,
              value: todoInput.toLowerCase()
            }]
        )
      });
      setTodoInput('');
      setTodoKey(previousKey => previousKey + 1);
      inputRef.current.focus();
    }
  }
  const handleRemove = (key) => {
    setTodos(todos.filter((todo) => {
      return todo.key !== key
    }));
  }
  console.log(todoInput)
  console.log(todos)
  return (
      <div className={cx('App-header')}>
        <input ref={inputRef} value={todoInput} onChange={e=>setTodoInput(e.target.value)} onKeyDown={e => handleKeyPress(e)}/>
        <button onClick={handleAdd}>Add</button>
        <ul>
          {
            todos.map((todo, index) => {
              return (
                  <li key={index} className={cx('upper-first-letter')}>
                    {todo.value}
                    <button onClick={() => handleRemove(todo.key)}>X</button>
                  </li>
              )
            })
          }
        </ul>
      </div>
  );
}

export default App;
