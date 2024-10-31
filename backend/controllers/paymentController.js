const axios = require('axios');
const crypto = require('crypto');
const UserModel = require('../models/User');

exports.MoMoPayment = async (req, res) => {
    const data = req.body;
    const userIdString = String(data.userId);
    // MoMo parameters
    const accessKey = 'F8BBA842ECF85';
    const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const orderInfo = data.orderInfo;
    const partnerCode = 'MOMO';
    const redirectUrl = 'http://localhost:3000';
    const ipnUrl = 'http://localhost:5000/api/payment/momo/callback';
    const requestType = "payWithMethod";
    const amount = data.amount;
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const extraData = userIdString;
    const orderGroupId = '';
    const autoCapture = true;
    const lang = 'vi';

    // Tạo chữ ký
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    // Định dạng dữ liệu gửi đi
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
    });

    const option = {
        method: "POST",
        url: 'https://test-payment.momo.vn/v2/gateway/api/create',
        headers: {
            'Content-Type': "application/json",
            'Content-Length': Buffer.byteLength(requestBody),
        },
        data: requestBody
    };

    try {
        // Gửi yêu cầu tới API MoMo và lưu phản hồi vào biến `response`
        const response = await axios(option);

        // Trả về phản hồi từ MoMo cho frontend
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({
            message: "Payment processing failed",
            error: error.message
        });
    }
};
exports.MoMoCallBack = async (req, res) => {
    const { orderId, status, message, transId, extraData } = req.body;

    // Kiểm tra trạng thái thanh toán
    if (status === 'SUCCESS') {
        // Cập nhật trạng thái thanh toán trong cơ sở dữ liệu
        console.log(`Thanh toán thành công cho đơn hàng: ${orderId}, giao dịch ID: ${transId}`);

        // Parse userId từ extraData
        let userId;
        try {
            const data = JSON.parse(extraData);
            userId = data.userId; // Lấy userId
        } catch (error) {
            console.error('Invalid extraData format', error);
            return res.status(400).json({ message: 'Invalid extraData format' });
        }

        // Cập nhật trạng thái người dùng từ thường thành VIP
        try {
            const foundUser = await UserModel.findById(userId);
            if (!foundUser) {
                return res.status(404).json({ message: "User not found" });
            }

            foundUser.is_vip = true; // Cập nhật is_vip thành true
            foundUser.subscription_type = "VIP PRO MAX";
            await foundUser.save(); // Lưu thay đổi

            res.status(200).json({
                message: 'Thanh toán thành công và người dùng đã được nâng cấp thành VIP',
                redirectUrl: '/profile'
            });
        } catch (error) {
            console.error('Error updating user VIP status:', error);
            return res.status(500).json({ message: 'Failed to update user status', error });
        }
    } else {
        console.log(`Thanh toán thất bại cho đơn hàng: ${orderId}, lý do: ${message}`);
        res.status(400).json({ message: 'Thanh toán thất bại' });
    }
};


