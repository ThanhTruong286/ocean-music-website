import './App.scss';
import { Home } from './Home';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const App = () => {
  return (
    <div id='main'>
      <Home />
      {<Footer />}
    </div>
  )
}

export default App;
