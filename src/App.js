import Header from './components/header/Header';
import './styles/reset.css';
import './styles/normalize.css';
import './styles/main.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="filter">
        <ul className="filter__main-list">

        </ul>
      </div>
    </div>
  );
}

export default App;
