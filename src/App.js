import React,{useState,useEffect} from 'react';
import './App.css';
//importing components from
import Form from './components/Form.js'
import TodoList from './components/TodoList.js'

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  },[] )


  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  },[todos,status] )

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.uncompleted === false))
        break;
      default:
        setFilteredTodos(todos)
        break;
    }
  }
  const saveLocalTodos = () => {
    
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));

    } else {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }
  const getLocalTodos = () => {

    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));

    } else {
      let localThing = JSON.parse(localStorage.getItem('todos'));
      setTodos(localThing);
    }

  }

  return (
    <div className="App">
      <header>
        <h1>Atakan'nın Todo Listesi</h1>
      </header>
      <Form todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList filteredTodos={filteredTodos}
        todos={todos}
        setTodos={setTodos}
        inputText={inputText} />
    </div>
  );
}

export default App;
