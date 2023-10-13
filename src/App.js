import logo from './logo.svg';
import './App.css';
import Content from './components/contentArea/content';
import FileExplorer from './components/fileExplorer/fileExplorer';

function App() {
  return (
    <div className="App">
      <FileExplorer/>
      <Content/>
    </div>
  );
}

export default App;
