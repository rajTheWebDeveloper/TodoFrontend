import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App bg-gray-50 h-screen w-[100vw] overflow-x-hidden">
        <TodoList/>
    </div>
  );
}

export default App;
