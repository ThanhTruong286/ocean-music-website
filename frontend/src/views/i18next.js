// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          title: "Settings",
          language: "Language",
          languageDescription: "Select a language - Changes will apply after restarting the app",
          explicitContent: "Explicit Content",
          explicitContentDescription: "Allow playback of content flagged as explicit.",
          autoplay: "Autoplay",
          autoplayDescription: "Enjoy uninterrupted music. When you finish listening, we'll play similar content",
          audioQuality: "Audio Quality",
          streamQuality: "Stream Quality",
          downloadQuality: "Download",
          autoAdjust: "Auto-adjust quality",
          normalizeVolume: "Normalize volume - Set the same level for all songs and podcasts"
        }
      },
      vi: {
        translation: {
          title: "Cài đặt",
          language: "Ngôn ngữ",
          languageDescription: "Chọn ngôn ngữ - Các thay đổi sẽ được áp dụng sau khi bạn khởi động lại ứng dụng",
          explicitContent: "Nội dung phản cảm",
          explicitContentDescription: "Cho phép phát nội dung được đánh giá là phản cảm.",
          autoplay: "Tự động phát",
          autoplayDescription: "Thưởng thức nhạc không gián đoạn. Khi bạn nghe hết nhạc, chúng tôi sẽ phát nội dung tương tự",
          audioQuality: "Chất lượng âm thanh",
          streamQuality: "Chất lượng stream",
          downloadQuality: "Tải xuống",
          autoAdjust: "Tự động điều chỉnh chất lượng",
          normalizeVolume: "Chuẩn hóa âm lượng - Đặt cùng mức âm lượng cho tất cả các bài hát và podcast"
        }
      }
    },
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
