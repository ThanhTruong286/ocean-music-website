const axios = require('axios');
const crypto = require('crypto');
const UserModel = require('../models/User');

exports.MoMoPayment = async (req, res) => {
    const data = req.body;
    const userIdString = String(data.userId);
    const userPlan = data.userPlan;

    // MoMo parameters
    const accessKey = 'F8BBA842ECF85';
    const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const orderInfo = data.orderInfo;
    const partnerCode = 'MOMO';
    const redirectUrl = 'http://localhost:3000/profile';
    const ipnUrl = 'https://1813-1-53-97-49.ngrok-free.app/api/payment/momo/callback';
    const requestType = "payWithMethod";
    const amount = data.amount;
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const extraData = JSON.stringify({ userId: userIdString, userPlan: userPlan });

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
    const { orderId, resultCode, message, transId, extraData } = req.body;
    // Kiểm tra trạng thái thanh toán
    if (resultCode === 0) { // Kiểm tra mã kết quả (0 thường có nghĩa là thành công)
        console.log(`Thanh toán thành công cho đơn hàng: ${orderId}, giao dịch ID: ${transId}`);

        // Parse userId từ extraData
        let userId, userPlan;
        try {
            const data = JSON.parse(extraData);
            userId = data.userId; // Lấy userId
            userPlan = data.userPlan; // Lấy userPlan
        } catch (error) {
            console.error('Invalid extraData format', error);
            return res.status(400).json({ message: 'Invalid extraData format' });
        }

        //UPDATE VIP HERE
        let subscription_id = 0;

        if (userPlan === "mini") {
            subscription_id = 1;
        } else if (userPlan === "individual") {
            subscription_id = 2;
        } else if (userPlan === "student") {
            subscription_id = 3;
        }
        try {
            // Gọi phương thức update với callback
            UserModel.update(userId, { is_vip: true, subscription_id: subscription_id }, (err, results) => {
                if (err) {
                    return res.status(500).json({ message: "Server error", error: err });
                }

                if (results.affectedRows === 0) {
                    return res.status(200).json({ message: "No changes made to VIP status" });
                }

                res.status(200).json({ message: "UP VIP successfully" });
            });
        } catch (err) {
            console.error('Error finding userId:', userId, err);
            res.status(500).json({ message: "Server error" });
        }

    } else {
        console.log(`Thanh toán thất bại cho đơn hàng: ${orderId}, lý do: ${message}`);
        return res.status(400).json({ message: 'Thanh toán thất bại' });
    }
};







