const CryptoJS = require("crypto-js");
const axios = require('axios');
const crypto = require('crypto');
const UserModel = require('../models/User');
const moment = require('moment');

const config = {
    app_id: '2553',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
};

exports.ZaloPayment = async (req, res) => {
    const extraData = req.body;
    const userIdString = String(req.user.userId);
    const userPlan = extraData.userPlan;

    let amount = 0;

    if (userPlan === "mini") {
        amount = 10500;
    } else if (userPlan === "individual") {
        amount = 59000;
    } else if (userPlan === "student") {
        amount = 29500;
    }

    const embed_data = {
        //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
        redirecturl: 'http://localhost:3000/profile',
        userId: userIdString,
        userPlan: userPlan,
    };

    const items = [];
    const transID = Math.floor(Math.random() * 1000000);

    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: 'user123',
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: amount,
        //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
        //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
        callback_url: 'https://b09d-1-53-27-130.ngrok-free.app/api/payment/zalopay/callback',
        description: `Lazada - Payment for the order #${transID}`,
        bank_code: '',
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
        config.app_id +
        '|' +
        order.app_trans_id +
        '|' +
        order.app_user +
        '|' +
        order.amount +
        '|' +
        order.app_time +
        '|' +
        order.embed_data +
        '|' +
        order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
        const result = await axios.post(config.endpoint, null, { params: order });

        return res.status(200).json(result.data);
    } catch (error) {
        console.log(error);
    }
}

exports.ZaloPaymentCallback = async (req, res) => {
    const data = JSON.parse(req.body.data);

    // Access the data object correctly from req.body.data
    const { app_trans_id, embed_data } = data;

    // Log the transaction ID and embed_data for debugging
    console.log("Transaction ID from callback:", app_trans_id);  // This should now log the correct transaction ID
    console.log("Raw embed_data:", embed_data);  // This will show the raw embed_data directly

    // Step 1: Check if embed_data exists and is a valid string
    if (!embed_data || typeof embed_data !== "string") {
        return res.status(400).json({ message: "Invalid or missing embed_data" });
    }

    // Step 2: Parse embed_data string to JSON
    let parsedEmbedData = {};
    try {
        parsedEmbedData = JSON.parse(embed_data);
        console.log("Parsed embed_data:", parsedEmbedData);  // Debugging the parsed embed_data
    } catch (err) {
        console.error("Error parsing embed_data:", err);
        return res.status(400).json({ message: 'Invalid embed_data format' });
    }

    // Step 3: Extract userId and userPlan from parsed embed_data
    const { userId, userPlan } = parsedEmbedData;

    console.log("userId:", userId, "userPlan:", userPlan);

    if (!userId || !userPlan) {
        return res.status(400).json({ message: "Missing userId or userPlan in embed_data" });
    }

    // Step 4: Determine subscription_id based on userPlan
    let subscription_id = 0;
    if (userPlan === "mini") {
        subscription_id = 1;
    } else if (userPlan === "individual") {
        subscription_id = 2;
    } else if (userPlan === "student") {
        subscription_id = 3;
    } else {
        return res.status(400).json({ message: "Invalid userPlan" });
    }

    // Step 5: Update user with VIP status and subscription_id
    try {
        UserModel.update(userId, { is_vip: true, subscription_id: subscription_id }, (err, results) => {
            if (err) {
                console.error("Error updating user:", err);
                return res.status(500).json({ message: "Server error", error: err });
            }

            if (results.affectedRows === 0) {
                return res.status(200).json({ message: "No changes made to VIP status" });
            }

            return res.status(200).json({ message: "VIP updated successfully" });
        });
    } catch (err) {
        console.error("Error processing user update:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.MoMoPayment = async (req, res) => {
    const data = req.body;
    const userIdString = String(req.user.userId);
    const userPlan = data.userPlan;

    // MoMo parameters
    const accessKey = 'F8BBA842ECF85';
    const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const orderInfo = data.orderInfo;
    const partnerCode = 'MOMO';
    const redirectUrl = 'http://localhost:3000/profile';
    const ipnUrl = 'https://b09d-1-53-27-130.ngrok-free.app/api/payment/momo/callback';
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







