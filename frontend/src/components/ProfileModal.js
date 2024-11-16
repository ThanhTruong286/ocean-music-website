import React from "react";
import "../styles/profileModal.scss";

const ProfileModal = ({ isOpen, onClose, user, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Chi tiết hồ sơ</h2>
        <div className="profile-avatar">
          <img src={user.avatar} alt="Avatar" />
        </div>
        <input
          type="text"
          defaultValue={user.name}
          placeholder="Tên hiển thị"
          className="profile-input"
        />
        <p className="description">
          Bằng cách tiếp tục, bạn đồng ý cho phép Spotify truy cập vào hình ảnh bạn đã chọn để tải lên. Vui lòng đảm bảo bạn có quyền tải lên hình ảnh.
        </p>
        <button className="save-btn" onClick={onSave}>
          Lưu
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
