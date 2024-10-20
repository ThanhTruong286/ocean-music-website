import './App.scss';
import { Home } from './Home';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const App = () => {
  return (
    <div id='main'>

      <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
        <Sidebar />
      </aside>
      <main className="main-content">
        <Home />
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default App;
