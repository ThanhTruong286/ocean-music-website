// src/views/App.js
import './App.scss';
import { Home } from './Home'; // Nếu bạn cũng muốn sử dụng Home, giữ lại import này.
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Album from './Album'; // Đảm bảo import đúng đường dẫn


const App = () => {
  return (
    <div id='main'>
      
      <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
        <Sidebar />
      </aside>
      <main className="main-content">
        <Album /> {/* Gọi component Album tại đây */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
