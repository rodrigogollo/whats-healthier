import logo from './logo.svg';
import './App.css';

function App() {

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => console.log(data.message));
  }, []);

  return (
    <div className="App">
      <input type="file" id="imageFile" capture="user" accept="image/*" />
    </div>
  );
}

export default App;
