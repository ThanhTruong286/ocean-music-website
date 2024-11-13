// services/emailService.js
exports.sendResetEmail = async (email, temporaryPassword) => {
    if (!transporter) {
        await setupTransporter();
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Mật khẩu tạm thời của bạn',
        text: `Dưới đây là mật khẩu tạm thời của bạn: ${temporaryPassword}. Vui lòng đăng nhập và thay đổi mật khẩu ngay lập tức.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Đã gửi email mật khẩu tạm thời');
    } catch (error) {
        console.error('Lỗi khi gửi email mật khẩu tạm thời:', error);
        throw new Error('Không thể gửi email mật khẩu tạm thời');
    }
};
