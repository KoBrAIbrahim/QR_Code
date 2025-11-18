import { useEffect } from "react";
import { useParams } from "react-router-dom";

const IOS_APP_STORE_URL =
  "https://apps.apple.com/app/id6755399456";

const ANDROID_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.savi.vouchers";

// إعدادات الـ Deep Link للشركات
const DEEP_LINK_SCHEME = "voucherapp";
const DEEP_LINK_HOST = "app.voucherapp.com";

// ببني رابط الـ deep link مع معرف الشركة
function buildDeepLink(companyId) {
  if (!companyId) return `${DEEP_LINK_SCHEME}://${DEEP_LINK_HOST}`;
  // نبعت الـ companyId في الـ path مع query parameter للتأكيد
  return `${DEEP_LINK_SCHEME}://${DEEP_LINK_HOST}/company/${encodeURIComponent(companyId)}`;
}

function CompanyRedirectPage() {
  // نقرأ معرف الشركة من الـ URL
  const { companyId } = useParams();

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroid = /android/i.test(ua);
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

    const deepLink = buildDeepLink(companyId);

    // 1) نحاول نفتح التطبيق أولاً
    window.location.href = deepLink;

    // 2) بعد ثانيتين، لو التطبيق مش منصّب، نحول على المتجر المناسب
    const timeout = setTimeout(() => {
      if (isAndroid) {
        window.location.href = ANDROID_PLAY_STORE_URL;
      } else if (isIOS) {
        window.location.href = IOS_APP_STORE_URL;
      } else {
        // لو من لابتوب أو جهاز غريب، ودّيه لأي صفحة ويب
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
          href={buildDeepLink(companyId)}
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
