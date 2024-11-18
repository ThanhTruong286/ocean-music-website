import React, { useState } from "react";
import "../styles/profileModal.scss";

const ProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const [name, setName] = useState(user.name); // Lưu tên người dùng
  const [avatar, setAvatar] = useState(user.avatar); // Lưu avatar tạm thời

  // Hàm xử lý khi người dùng chọn ảnh mới
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh
      setAvatar(imageUrl); // Cập nhật ảnh hiển thị
    }
  };

  // Hàm lưu thông tin cập nhật
  const handleSave = () => {
    onSave({ name, avatar }); // Gửi dữ liệu mới về SettingProfile
    onClose(); // Đóng modal
  };

  if (!isOpen) return null;

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Chi tiết hồ sơ</h2>
        <div className="profile-avatar">
          <img src={avatar} alt="Avatar" onClick={() => document.getElementById("avatarInput").click()} />
          <input
            type="file"
            id="avatarInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên hiển thị"
          className="profile-input"
        />
        <p className="description">
          Bằng cách tiếp tục, bạn đồng ý cho phép Spotify truy cập vào hình ảnh bạn đã chọn để tải lên. Vui lòng đảm bảo bạn có quyền tải lên hình ảnh.
        </p>
        <button className="save-btn" onClick={handleSave}>
          Lưu
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
