import { useEffect, useMemo } from "react";

const IOS_APP_STORE_URL =
  "https://apps.apple.com/app/id6755399456";

const ANDROID_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.savi.vouchers";

// ✅ USE YOUR VERCEL DOMAIN
const DEEP_LINK_SCHEME = "voucherapp";

function buildDeepLink(promoCode) {
  if (!promoCode) return `${DEEP_LINK_SCHEME}://promo`;
  return `${DEEP_LINK_SCHEME}://promo/${encodeURIComponent(promoCode)}`;
}

function PromoRedirectPage() {
  const promoCode = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("code");
  }, []);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroid = /android/i.test(ua);
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

    const deepLink = buildDeepLink(promoCode);
    window.location.href = deepLink;

    const timeout = setTimeout(() => {
      if (isAndroid) {
        window.location.href = ANDROID_PLAY_STORE_URL;
      } else if (isIOS) {
        window.location.href = IOS_APP_STORE_URL;
      } else {
        window.location.href = "https://savi.vouchers";
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [promoCode]);

  return (
    <div
      style={{
        direction: "rtl",
        textAlign: "center",
        marginTop: "4rem",
        fontFamily: "system-ui",
        padding: "0 16px",
        background: "var(--bg)",
      }}
    >
      <img src="/app_icon.png" alt="Savi" style={{height:80, display:'block', margin:'0 auto 12px'}} />
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
          href={buildDeepLink(promoCode)}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            textDecoration: "none",
            background: "var(--brand)",
            color: "white",
            fontWeight: 700,
          }}
        >
          فتح التطبيق
        </a>
        <a
          href={ANDROID_PLAY_STORE_URL}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            textDecoration: "none",
            background: "#ffffff",
            color: "var(--brand)",
            border: "1px solid var(--brand)",
            fontWeight: 700,
          }}
        >
          Google Play
        </a>
        <a
          href={IOS_APP_STORE_URL}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            textDecoration: "none",
            background: "#ffffff",
            color: "var(--brand)",
            border: "1px solid var(--brand)",
            fontWeight: 700,
          }}
        >
          App Store
        </a>
      </div>
    </div>
  );
}

export default PromoRedirectPage;