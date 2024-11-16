import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProfileModal from "../components/ProfileModal";
import { fetchArtists } from "../api/api";
import "../styles/profile.scss";

const SettingProfile = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState({
    name: "Tahi",
    avatar: "https://storage.googleapis.com/a1aa/image/nGaXdXeD8DxTAKGxk0YWKK2pH6oOZc9W4nNEBYvfdnIkuNxTA.jpg",
  });

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const data = await fetchArtists();
        setArtists(data);
      } catch (error) {
        console.error("Failed to fetch artists:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSave = () => {
    alert("Thông tin đã được lưu!");
    handleCloseModal();
  };

  return (
    <div>
      <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
        <Sidebar />
      </aside>
      <main className="main-content">
        <div id="home">
          <Header />
          <div className="container">
            <div className="profile-header">
              <img
                alt="Profile picture"
                height="150"
                src={user.avatar}
                width="150"
                onClick={handleOpenModal}
                style={{ cursor: "pointer" }}
              />
              <h1>{user.name}</h1>
              <p>1 danh sách phát công khai • 1 người theo dõi • 2 đang theo dõi</p>
            </div>

            <div className="section">
              <h2>Nghệ sĩ hàng đầu tháng này</h2>
              <p>Chỉ hiển thị với bạn</p>
              {loading ? (
                <p>Đang tải danh sách nghệ sĩ...</p>
              ) : (
                <div className="artists">
                  {artists.length > 0 ? (
                    artists.map((artist) => (
                      <div className="artist" key={artist.id}>
                        <img alt={artist.name} height="100" src={artist.image} width="100" />
                        <p className="name">{artist.name}</p>
                        <p className="role">{artist.role}</p>
                      </div>
                    ))
                  ) : (
                    <p>Không có nghệ sĩ nào.</p>
                  )}
                </div>
              )}
              <div className="show-all">Hiện tất cả</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <ProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={user}
        onSave={handleSave}
      />
    </div>
  );
};

export default SettingProfile;
