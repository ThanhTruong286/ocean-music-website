import React, { useEffect, useState } from 'react';

function AdComponent() {
    const [isVisible, setIsVisible] = useState(true);
    const [countdown, setCountdown] = useState(30);

    // Đếm ngược từ 30 giây
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer); // Xóa bộ đếm khi component bị hủy
        }
    }, [countdown]);

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1000'
        }}>
            <div style={{
                width: '320px',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                textAlign: 'center',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                position: 'relative'
            }}>
                <video width="280" height="150" controls autoPlay style={{ marginBottom: '15px' }}>
                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ video.
                </video>
                <h4>Quảng Cáo Tới Chơi Bro</h4>
                {/* Hiển thị nút đóng bên dưới video */}
                <div style={{ marginTop: '10px' }}>
                    <button
                        onClick={() => countdown === 0 && setIsVisible(false)}
                        style={{
                            backgroundColor: countdown === 0 ? '#ff4d4d' : '#ccc',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '5px 10px',
                            cursor: countdown === 0 ? 'pointer' : 'default'
                        }}
                        disabled={countdown > 0}
                    >
                        {countdown > 0 ? `Đóng sau ${countdown}s` : 'Đóng'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdComponent;
