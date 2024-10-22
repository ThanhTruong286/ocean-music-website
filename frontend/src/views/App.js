import './App.scss';
import { Home } from './Home';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Album from './Album';
import Library from './Library';
import Artist from './Artist';
import Roles from '../components/Roles';

const App = () => {
  return (
    <div id='main'>

      <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
        <Sidebar />
      </aside>

      <main className="main-content">
        <Roles/>
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default App;
