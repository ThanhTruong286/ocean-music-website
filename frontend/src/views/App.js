import './App.scss';
import { Home } from './Home';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Album from './Album';


const App = () => {
  return (
    <div id='main'>
      
      <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
        <Sidebar />
      </aside>
      <main class="main-content">
        <Album />
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default App;
