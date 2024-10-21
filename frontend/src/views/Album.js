// src/Album.js
import Header from "../components/Header";
import '../styles/album.scss'; // Import SCSS file

import AlbumList from "../components/AlbumList";
const Album = () => {
  

  return (
    <div>
      <Header />

      <div className="album-container">
        
        {/** Album LIST */}
        <AlbumList />
        {/** END album LIST */}
      </div>
          
      
      
    </div>
  );
};

export default Album;
