import './App.scss';
import { Home } from './Home';
import Sidebar from '../components/Sidebar';

const App = () => {
  return (
    <div>
      <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
        <Sidebar />
      </aside>
      <main class="main-content">
        <Home />
      </main>
    </div>
  )
}

export default App;
