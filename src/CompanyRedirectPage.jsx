import { useEffect } from "react";
import { useParams } from "react-router-dom";

const IOS_APP_STORE_URL = "https://apps.apple.com/app/id6755399456";
const ANDROID_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.savi.vouchers";

function CompanyRedirectPage() {
  const { companyId } = useParams();

  useEffect(() => {
    console.log('🔗 CompanyRedirectPage - Company ID:', companyId);
    
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroid = /android/i.test(ua);
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

    console.log('📱 Device:', isAndroid ? 'Android' : isIOS ? 'iOS' : 'Other');

    // Build deep link with proper format
    const deepLink = `voucherapp://company/${encodeURIComponent(companyId || '')}`;
    console.log('🚀 Opening deep link:', deepLink);

    // IMPORTANT: Try to open the app immediately
    // The browser will either open the app or ignore this
    setTimeout(() => {
      window.location.href = deepLink;
    }, 100); // Small delay to ensure page renders

    // Fallback to store after 3 seconds if app doesn't open
    const timeout = setTimeout(() => {
      console.log('⚠️ App did not open, redirecting to store...');
      if (isAndroid) {
        window.location.href = ANDROID_PLAY_STORE_URL;
      } else if (isIOS) {
        window.location.href = IOS_APP_STORE_URL;
      } else {
        window.location.href = "https://savi.vouchers";
      }
    }, 3000);

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
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "560px",
          margin: "0 auto",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          borderTop: "6px solid var(--brand)",
        }}
      >
        <img src="/app_icon.png" alt="Savi" style={{height:80, display:'block', margin:'0 auto 12px'}} />
        <h1 style={{ color: "var(--brand)", marginBottom: "0.6rem" }}>
          🎫 Savi Vouchers
        </h1>
        
        <div
          style={{
            border: "4px solid #f6f6f6",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            margin: "18px auto",
            animation: "spin 1s linear infinite",
          }}
        />
        
        <p style={{ fontSize: "18px", fontWeight: "bold", margin: "1rem 0" }}>
          جاري فتح التطبيق...
        </p>

        {/* Debug info */}
        <div
          style={{
            background: "#fafafa",
            padding: "12px",
            marginTop: "20px",
            borderRadius: "8px",
            fontSize: "12px",
            fontFamily: "monospace",
            textAlign: "left",
            direction: "ltr",
            color: "var(--text)",
          }}
        >
          <div>
            <strong>🔗 Deep Link:</strong>
          </div>
            <div style={{ wordBreak: "break-all", marginTop: "6px", color: "var(--brand)" }}>
            voucherapp://company/{companyId || "unknown"}
          </div>
          <div style={{ marginTop: "10px" }}>
            <strong>📋 Company ID:</strong> {companyId || "Not found"}
          </div>
          <div style={{ marginTop: "6px" }}>
            <strong>📍 Current URL:</strong> {window.location.href}
          </div>
        </div>

        <p style={{ marginTop: "24px", fontSize: "14px", color: "#666" }}>
          إذا لم يتم فتح التطبيق خلال ثوانٍ، سيتم تحويلك تلقائيًا إلى المتجر لتنزيله.
        </p>

        <p style={{ marginTop: "16px", fontSize: "14px", fontWeight: "bold" }}>
          أو يمكنك الاختيار يدويًا:
        </p>

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: "0.8rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href={`voucherapp://company/${encodeURIComponent(companyId || "")}`}
            style={{
              padding: "10px 20px",
              background: "var(--brand)",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            📱 فتح التطبيق
          </a>
          <a
            href={ANDROID_PLAY_STORE_URL}
            style={{
              padding: "10px 20px",
              background: "#ffffff",
              color: "var(--brand)",
              border: "1px solid var(--brand)",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            🤖 Google Play
          </a>
          <a
            href={IOS_APP_STORE_URL}
            style={{
              padding: "10px 20px",
              background: "#ffffff",
              color: "var(--brand)",
              border: "1px solid var(--brand)",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            🍎 App Store
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default CompanyRedirectPage;