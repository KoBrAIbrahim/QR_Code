import { useEffect } from "react";
import { useParams } from "react-router-dom";

const IOS_APP_STORE_URL =
  "https://apps.apple.com/app/id6755399456";

const ANDROID_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.savi.vouchers";

// إعدادات الـ Deep Link
const DEEP_LINK_SCHEME = "voucherapp";
const DEEP_LINK_HOST = "qr-code-seven-rose.vercel.app"; // 🔥 CHANGED


function CompanyRedirectPage() {
  const { companyId } = useParams();

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroid = /android/i.test(ua);
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

    // First try app deep link
    const appDeepLink = `${DEEP_LINK_SCHEME}://company/${encodeURIComponent(companyId || '')}`;
    window.location.href = appDeepLink;

    // After 2 seconds, redirect to store if app not installed
    const timeout = setTimeout(() => {
      if (isAndroid) {
        window.location.href = ANDROID_PLAY_STORE_URL;
      } else if (isIOS) {
        window.location.href = IOS_APP_STORE_URL;
      } else {
        window.location.href = "https://savi.vouchers";
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [companyId]);

  return (
    <div
      style={{
        direction: "rtl",
        textAlign: "center",
        marginTop: "4rem",
        fontFamily: "system-ui",
        padding: "0 16px",
      }}
    >
      <h1>جاري فتح تطبيق Savi Vouchers...</h1>
      <p>إذا لم يتم فتح التطبيق خلال ثوانٍ، سيتم تحويلك تلقائيًا إلى المتجر لتنزيله.</p>
      <p>أو يمكنك الاختيار يدويًا من الأزرار بالأسفل:</p>

      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <a
          href={`${DEEP_LINK_SCHEME}://company/${encodeURIComponent(companyId || '')}`}
          style={{
            padding: "8px 16px",
            border: "1px solid #ccc",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          فتح التطبيق
        </a>
        <a
          href={ANDROID_PLAY_STORE_URL}
          style={{
            padding: "8px 16px",
            border: "1px solid #ccc",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Google Play
        </a>
        <a
          href={IOS_APP_STORE_URL}
          style={{
            padding: "8px 16px",
            border: "1px solid #ccc",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          App Store
        </a>
      </div>
    </div>
  );
}

export default CompanyRedirectPage;