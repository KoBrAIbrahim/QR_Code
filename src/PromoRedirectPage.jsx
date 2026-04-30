import { useEffect, useMemo, useState } from "react";

const IOS_APP_STORE_URL = "https://apps.apple.com/app/id6755399456";
const ANDROID_PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?id=com.savi.vouchers";
const DEEP_LINK_SCHEME = "voucherapp";

function buildDeepLink(promoCode) {
    if (!promoCode) return `${DEEP_LINK_SCHEME}://promo`;
    return `${DEEP_LINK_SCHEME}://promo/${encodeURIComponent(promoCode)}`;
}

export default function PromoRedirectPage() {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState("loading"); // loading | store

    const promoCode = useMemo(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get("code");
    }, []);

    useEffect(() => {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        const isAndroid = /android/i.test(ua);
        const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

        window.location.href = buildDeepLink(promoCode);

        // Animate progress bar
        const start = Date.now();
        const duration = 10000;
        const raf = setInterval(() => {
            const elapsed = Date.now() - start;
            const pct = Math.min((elapsed / duration) * 100, 100);
            setProgress(pct);
            if (pct >= 100) clearInterval(raf);
        }, 40);

        const timeout = setTimeout(() => {
            setPhase("store");
            if (isAndroid) window.location.href = ANDROID_PLAY_STORE_URL;
            else if (isIOS) window.location.href = IOS_APP_STORE_URL;
            else window.location.href = "https://savi.vouchers";
        }, 10000);

        return () => {
            clearTimeout(timeout);
            clearInterval(raf);
        };
    }, [promoCode]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Tajawal', system-ui, sans-serif;
          background: #0f0f0f;
        }

        .savi-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(198,40,40,0.35) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 100%, rgba(198,40,40,0.15) 0%, transparent 60%),
            #0f0f0f;
          position: relative;
          overflow: hidden;
        }

        /* Subtle grid lines */
        .savi-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(198,40,40,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(198,40,40,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 40px 36px;
          max-width: 480px;
          width: 100%;
          text-align: center;
          direction: rtl;
          position: relative;
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 0 1px rgba(198,40,40,0.2),
            0 32px 80px rgba(0,0,0,0.5),
            0 0 60px rgba(198,40,40,0.08) inset;
          animation: cardIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* Top accent bar */
        .card::before {
          content: '';
          position: absolute;
          top: 0; left: 24px; right: 24px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c62828, #FFB300, #c62828, transparent);
          border-radius: 0 0 4px 4px;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .logo-wrap {
          position: relative;
          display: inline-block;
          margin-bottom: 24px;
        }

        .logo-wrap img {
          width: 88px;
          height: 88px;
          border-radius: 20px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.1),
            0 8px 32px rgba(198,40,40,0.4),
            0 0 0 8px rgba(198,40,40,0.08);
          animation: logoPulse 2.5s ease-in-out infinite;
        }

        @keyframes logoPulse {
          0%, 100% { box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 8px 32px rgba(198,40,40,0.4), 0 0 0 8px rgba(198,40,40,0.08); }
          50%       { box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 8px 40px rgba(198,40,40,0.55), 0 0 0 16px rgba(198,40,40,0.05); }
        }

        .badge {
          position: absolute;
          bottom: -6px; left: -6px;
          background: linear-gradient(135deg, #FFB300, #FF8F00);
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 20px;
          box-shadow: 0 2px 8px rgba(255,179,0,0.5);
          letter-spacing: 0.5px;
          font-family: 'Tajawal', sans-serif;
        }

        h1 {
          font-size: 26px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.3;
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          margin-bottom: 28px;
        }

        /* Promo code chip */
        .promo-chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(198,40,40,0.12);
          border: 1px solid rgba(198,40,40,0.4);
          border-radius: 12px;
          padding: 10px 18px;
          margin-bottom: 28px;
          direction: ltr;
        }

        .promo-label {
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-family: 'Tajawal', sans-serif;
        }

        .promo-value {
          font-size: 18px;
          font-weight: 800;
          color: #FFB300;
          letter-spacing: 2px;
          font-family: 'Tajawal', sans-serif;
        }

        /* Progress track */
        .progress-track {
          background: rgba(255,255,255,0.06);
          border-radius: 8px;
          height: 6px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .progress-fill {
          height: 100%;
          border-radius: 8px;
          background: linear-gradient(90deg, #c62828, #FFB300);
          transition: width 0.1s linear;
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 24px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5));
          border-radius: 8px;
          animation: shimmer 1s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .progress-hint {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          margin-bottom: 28px;
          direction: rtl;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .divider-text { font-size: 11px; color: rgba(255,255,255,0.25); font-weight: 600; letter-spacing: 1px; white-space: nowrap; }

        .btn-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 20px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Tajawal', sans-serif;
          text-decoration: none;
          background: linear-gradient(135deg, #c62828, #b71c1c);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 4px 20px rgba(198,40,40,0.4);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          direction: rtl;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(198,40,40,0.5);
        }

        .btn-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 13px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Tajawal', sans-serif;
          text-decoration: none;
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.8);
          border: 1px solid rgba(255,255,255,0.1);
          transition: background 0.15s ease, transform 0.15s ease;
          flex: 1;
          direction: ltr;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.09);
          transform: translateY(-1px);
        }

        .store-row {
          display: flex;
          gap: 10px;
        }

        .store-icon {
          font-size: 18px;
        }

        .footer-text {
          margin-top: 28px;
          font-size: 12px;
          color: rgba(255,255,255,0.2);
          direction: rtl;
        }
      `}</style>

            <div className="savi-root">
                <div className="card">
                    <div className="logo-wrap">
                        <img src="/saviIconBG5.jpg" alt="Savi Vouchers" />
                        <span className="badge">PROMO</span>
                    </div>

                    <h1>جاري فتح التطبيق</h1>
                    <p className="subtitle">سيتم تحويلك تلقائياً في لحظات</p>

                    {promoCode && (
                        <div className="promo-chip">
                            <span className="promo-label">PROMO CODE</span>
                            <span className="promo-value">{promoCode}</span>
                        </div>
                    )}

                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="progress-hint">
                        {phase === "loading"
                            ? "جارٍ فتح التطبيق... سيتم التحويل للمتجر تلقائياً"
                            : "جارٍ التحويل إلى المتجر..."}
                    </p>

                    <div className="divider">
                        <div className="divider-line" />
                        <span className="divider-text">أو اختر يدوياً</span>
                        <div className="divider-line" />
                    </div>

                    <div className="btn-group">
                        <a href={buildDeepLink(promoCode)} className="btn-primary">
                            <span>📱</span>
                            <span>فتح التطبيق مباشرة</span>
                        </a>
                        <div className="store-row">
                            <a href={ANDROID_PLAY_STORE_URL} className="btn-secondary">
                                <span className="store-icon">🤖</span>
                                Google Play
                            </a>
                            <a href={IOS_APP_STORE_URL} className="btn-secondary">
                                <span className="store-icon">🍎</span>
                                App Store
                            </a>
                        </div>
                    </div>

                    <p className="footer-text">
                        Savi Vouchers · وفّر أكثر مع كل عملية شراء
                    </p>
                </div>
            </div>
        </>
    );
}