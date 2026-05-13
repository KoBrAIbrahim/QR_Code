import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IOS_APP_STORE_URL = "https://apps.apple.com/app/id6755399456";
const ANDROID_PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?id=com.savi.vouchers";

const GooglePlayIcon = () => (
    <svg width="26" height="26" viewBox="0 0 100 100" fill="none">
        <polygon points="0,0 50,50 0,50" fill="#4285F4"/>
        <polygon points="0,0 100,50 50,50" fill="#34A853"/>
        <polygon points="0,50 50,50 0,100" fill="#EA4335"/>
        <polygon points="50,50 100,50 0,100" fill="#FBBC05"/>
    </svg>
);

const AppleIcon = () => (
    <svg viewBox="0 0 814 1000" width="20" height="24" fill="white">
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.8 0 663 0 541.8c0-207.4 133.8-317 265.5-317 70.5 0 130.8 44.9 177.4 44.9 44.9 0 115.8-47.3 196.5-47.3 31.7 0 108.9 2.6 168.1 63.3z"/>
        <path d="M554.3 44.6C584.9 8 605.7-30.3 605.7-68c0-8.6-1.3-16.5-2.6-24.4-47.3 1.3-103 31.7-140.3 71.9-34.5 36.4-63.5 96.2-63.5 158.3 0 7.9 1.3 16.5 2 18.4 3.2.6 9.2 1.3 15.2 1.3 42.8.1 93.3-29 138-112.9z"/>
    </svg>
);

export default function CompanyRedirectPage() {
    const { companyName } = useParams();
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState("loading");
    const [dots, setDots] = useState("");

    useEffect(() => {
        const dotsInterval = setInterval(() => {
            setDots(d => (d.length >= 3 ? "" : d + "."));
        }, 500);
        return () => clearInterval(dotsInterval);
    }, []);

    useEffect(() => {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        const isAndroid = /android/i.test(ua);
        const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

        const deepLink = `voucherapp://company/${encodeURIComponent(companyName || "")}`;

        setTimeout(() => {
            window.location.href = deepLink;
        }, 100);

        const start = Date.now();
        const duration = 3000;
        const raf = setInterval(() => {
            const elapsed = Date.now() - start;
            const pct = Math.min((elapsed / duration) * 100, 100);
            setProgress(pct);
            if (pct >= 100) clearInterval(raf);
        }, 30);

        const timeout = setTimeout(() => {
            setPhase("store");
            if (isAndroid) window.location.href = ANDROID_PLAY_STORE_URL;
            else if (isIOS) window.location.href = IOS_APP_STORE_URL;
            else window.location.href = "https://savi.vouchers";
        }, 3000);

        return () => {
            clearTimeout(timeout);
            clearInterval(raf);
        };
    }, [companyName]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Tajawal', system-ui, sans-serif;
          background: #0a0a0a;
        }

        .savi-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          background:
            radial-gradient(ellipse 80% 55% at 50% -5%, rgba(139,0,0,0.45) 0%, transparent 70%),
            radial-gradient(ellipse 50% 35% at 85% 100%, rgba(139,0,0,0.2) 0%, transparent 60%),
            radial-gradient(ellipse 30% 30% at 15% 60%, rgba(100,0,0,0.12) 0%, transparent 50%),
            #0a0a0a;
          position: relative;
          overflow: hidden;
        }

        .savi-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(139,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,0,0,0.05) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
        }
        .orb-1 {
          width: 420px; height: 420px;
          background: rgba(139,0,0,0.18);
          top: -120px; right: -100px;
          animation: drift 10s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 260px; height: 260px;
          background: rgba(120,0,0,0.12);
          bottom: -70px; left: -70px;
          animation: drift 13s ease-in-out infinite alternate-reverse;
        }
        .orb-3 {
          width: 200px; height: 200px;
          background: rgba(160,0,0,0.07);
          top: 55%; left: 50%;
          transform: translate(-50%, -50%);
          animation: pulseOrb 5s ease-in-out infinite;
        }

        @keyframes drift {
          from { transform: translate(0, 0); }
          to   { transform: translate(28px, 28px); }
        }

        @keyframes pulseOrb {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.7; transform: translate(-50%, -50%) scale(1.25); }
        }

        .card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 32px;
          padding: 48px 40px;
          max-width: 500px;
          width: 100%;
          text-align: center;
          direction: rtl;
          position: relative;
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          box-shadow:
            0 0 0 1px rgba(139,0,0,0.25),
            0 44px 110px rgba(0,0,0,0.65),
            0 0 80px rgba(139,0,0,0.04) inset;
          animation: cardIn 0.75s cubic-bezier(0.16,1,0.3,1) both;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0; left: 32px; right: 32px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #8B0000, #cc1111, #8B0000, transparent);
          border-radius: 0 0 4px 4px;
        }

        .card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 32px; right: 32px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,0,0,0.25), transparent);
          border-radius: 4px 4px 0 0;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(48px) scale(0.93); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Logo */
        .logo-wrap {
          position: relative;
          display: inline-block;
          margin-bottom: 32px;
        }

        .logo-ring {
          position: absolute;
          inset: -14px;
          border-radius: 34px;
          border: 1.5px solid rgba(139,0,0,0.45);
          animation: ringPulse 2.5s ease-in-out infinite;
        }

        .logo-ring-2 {
          position: absolute;
          inset: -26px;
          border-radius: 42px;
          border: 1px solid rgba(139,0,0,0.18);
          animation: ringPulse 2.5s ease-in-out infinite 0.5s;
        }

        .logo-ring-3 {
          position: absolute;
          inset: -40px;
          border-radius: 54px;
          border: 0.5px solid rgba(139,0,0,0.07);
          animation: ringPulse 2.5s ease-in-out infinite 1s;
        }

        @keyframes ringPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.04); }
        }

        .logo-wrap img {
          width: 100px;
          height: 100px;
          border-radius: 24px;
          display: block;
          box-shadow:
            0 10px 36px rgba(139,0,0,0.5),
            0 0 0 1px rgba(139,0,0,0.3);
          position: relative;
          z-index: 1;
        }

        .status-badge {
          position: absolute;
          top: -8px;
          left: -8px;
          width: 22px;
          height: 22px;
          background: #8B0000;
          border-radius: 50%;
          border: 2.5px solid #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          animation: badgePulse 1.8s ease-in-out infinite;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #ff5555;
          border-radius: 50%;
        }

        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(139,0,0,0.6); }
          50%       { box-shadow: 0 0 0 6px rgba(139,0,0,0); }
        }

        h1 {
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.3;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }

        .subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.38);
          margin-bottom: 24px;
          line-height: 1.6;
        }

        /* Company name tag */
        .company-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, rgba(139,0,0,0.18), rgba(139,0,0,0.07));
          border: 1px solid rgba(139,0,0,0.38);
          border-radius: 12px;
          padding: 10px 18px;
          margin-bottom: 22px;
          direction: rtl;
          box-shadow: 0 0 24px rgba(139,0,0,0.12);
        }

        .company-dot {
          width: 8px;
          height: 8px;
          background: #8B0000;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(139,0,0,0.9);
          animation: badgePulse 2s ease-in-out infinite;
        }

        .company-sep {
          width: 1px;
          height: 16px;
          background: rgba(139,0,0,0.4);
          flex-shrink: 0;
        }

        .company-label {
          font-size: 10px;
          font-weight: 700;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
          letter-spacing: 1.6px;
        }

        .company-value {
          font-size: 15px;
          font-weight: 800;
          color: #ff7777;
          letter-spacing: 0.2px;
        }

        /* Feature pills */
        .feature-pills {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }

        .pill {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          padding: 4px 12px;
          font-size: 11px;
          color: rgba(255,255,255,0.32);
          direction: rtl;
        }

        .pill-dot {
          width: 5px;
          height: 5px;
          background: #8B0000;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* Loading box */
        .loading-box {
          background: rgba(139,0,0,0.05);
          border: 1px solid rgba(139,0,0,0.14);
          border-radius: 18px;
          padding: 20px 18px;
          margin-bottom: 22px;
        }

        .spinner-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
          direction: rtl;
        }

        .spinner {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 3px solid rgba(255,255,255,0.05);
          border-top-color: #8B0000;
          border-right-color: #cc1111;
          animation: spin 0.9s linear infinite;
          flex-shrink: 0;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .spinner-info {
          text-align: right;
          direction: rtl;
        }

        .spinner-title {
          font-size: 14px;
          font-weight: 700;
          color: rgba(255,255,255,0.82);
          margin-bottom: 2px;
        }

        .spinner-sub {
          font-size: 12px;
          color: rgba(255,255,255,0.28);
        }

        .progress-track {
          background: rgba(255,255,255,0.05);
          border-radius: 100px;
          height: 6px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-fill {
          height: 100%;
          border-radius: 100px;
          background: linear-gradient(90deg, #8B0000 0%, #cc0000 55%, #ff4444 100%);
          transition: width 0.06s linear;
          position: relative;
          box-shadow: 0 0 10px rgba(139,0,0,0.55);
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 40px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45));
          border-radius: 100px;
        }

        .progress-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          direction: ltr;
        }

        .progress-hint {
          font-size: 11px;
          color: rgba(255,255,255,0.22);
        }

        .progress-pct {
          font-size: 11px;
          font-weight: 700;
          color: rgba(139,0,0,0.85);
          font-variant-numeric: tabular-nums;
        }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }
        .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
        .divider-text {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          font-weight: 600;
          letter-spacing: 1.2px;
          white-space: nowrap;
          text-transform: uppercase;
        }

        /* Buttons */
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
          padding: 16px 24px;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 700;
          font-family: 'Tajawal', sans-serif;
          text-decoration: none;
          background: linear-gradient(135deg, #8B0000 0%, #6b0000 50%, #8B0000 100%);
          background-size: 200% 200%;
          color: #fff;
          border: 1px solid rgba(200,0,0,0.3);
          box-shadow:
            0 6px 28px rgba(139,0,0,0.5),
            0 1px 0 rgba(255,255,255,0.08) inset;
          transition: transform 0.18s, box-shadow 0.18s;
          direction: rtl;
          animation: gradShift 3.5s ease-in-out infinite;
        }

        @keyframes gradShift {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 38px rgba(139,0,0,0.6), 0 1px 0 rgba(255,255,255,0.1) inset;
        }

        .btn-primary:active { transform: translateY(0); }

        .btn-icon { font-size: 20px; line-height: 1; }

        /* Official store badge buttons */
        .store-row {
          display: flex;
          gap: 10px;
        }

        .store-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 13px 14px;
          background: #000;
          border: 1.5px solid rgba(255,255,255,0.18);
          border-radius: 14px;
          text-decoration: none;
          color: white;
          transition: transform 0.16s, border-color 0.16s, box-shadow 0.16s;
          direction: ltr;
        }

        .store-btn:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.35);
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        }

        .store-btn:active { transform: translateY(0); }

        .store-btn-text {
          text-align: left;
          line-height: 1.25;
        }

        .store-btn-small {
          font-size: 9px;
          font-weight: 400;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.2px;
          display: block;
          font-family: system-ui, sans-serif;
        }

        .store-btn-large {
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          display: block;
          letter-spacing: -0.2px;
          font-family: system-ui, sans-serif;
        }

        .footer-text {
          margin-top: 28px;
          font-size: 11px;
          color: rgba(255,255,255,0.12);
          direction: rtl;
          letter-spacing: 0.3px;
        }
      `}</style>

            <div className="savi-root">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />

                <div className="card">
                    <div className="logo-wrap">
                        <div className="logo-ring" />
                        <div className="logo-ring-2" />
                        <div className="logo-ring-3" />
                        <div className="status-badge">
                            <div className="status-dot" />
                        </div>
                        <img src="/saviIconBG5.jpg" alt="Savi Vouchers" />
                    </div>

                    <h1>جاري فتح التطبيق</h1>
                    <p className="subtitle">سيتم تحويلك إلى Savi تلقائياً</p>

                    {companyName && (
                        <div className="company-tag">
                            <div className="company-dot" />
                            <div className="company-sep" />
                            <span className="company-label">اسم الشركة</span>
                            <span className="company-value">{decodeURIComponent(companyName)}</span>
                        </div>
                    )}

                    <div className="feature-pills">
                        <div className="pill"><div className="pill-dot" />قسائم حصرية</div>
                        <div className="pill"><div className="pill-dot" />توفير ذكي</div>
                        <div className="pill"><div className="pill-dot" />مكافآت يومية</div>
                    </div>

                    <div className="loading-box">
                        <div className="spinner-row">
                            <div className="spinner" />
                            <div className="spinner-info">
                                <div className="spinner-title">
                                    {phase === "loading"
                                        ? `جارٍ الفتح${dots}`
                                        : "جارٍ التحويل..."}
                                </div>
                                <div className="spinner-sub">
                                    {phase === "loading"
                                        ? "التحقق من التطبيق"
                                        : "الانتقال للمتجر"}
                                </div>
                            </div>
                        </div>
                        <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="progress-meta">
                            <div className="progress-hint">
                                {phase === "loading"
                                    ? "سيتم التحويل تلقائياً إذا لم يكن التطبيق مثبتاً"
                                    : "جارٍ التحويل إلى المتجر..."}
                            </div>
                            <div className="progress-pct">{Math.round(progress)}%</div>
                        </div>
                    </div>

                    <div className="divider">
                        <div className="divider-line" />
                        <span className="divider-text">أو اختر يدوياً</span>
                        <div className="divider-line" />
                    </div>

                    <div className="btn-group">
                        <a
                            href={`voucherapp://company/${encodeURIComponent(companyName || "")}`}
                            className="btn-primary"
                        >
                            <span className="btn-icon">📱</span>
                            <span>فتح التطبيق مباشرة</span>
                        </a>
                        <div className="store-row">
                            <a href={ANDROID_PLAY_STORE_URL} className="store-btn">
                                <GooglePlayIcon />
                                <div className="store-btn-text">
                                    <span className="store-btn-small">GET IT ON</span>
                                    <span className="store-btn-large">Google Play</span>
                                </div>
                            </a>
                            <a href={IOS_APP_STORE_URL} className="store-btn">
                                <AppleIcon />
                                <div className="store-btn-text">
                                    <span className="store-btn-small">Download on the</span>
                                    <span className="store-btn-large">App Store</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <p className="footer-text">Savi Vouchers · وفّر أكثر مع كل عملية شراء</p>
                </div>
            </div>
        </>
    );
}
