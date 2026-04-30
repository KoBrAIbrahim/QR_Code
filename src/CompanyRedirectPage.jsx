import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IOS_APP_STORE_URL = "https://apps.apple.com/app/id6755399456";
const ANDROID_PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?id=com.savi.vouchers";

export default function CompanyRedirectPage() {
    const { companyId } = useParams();
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState("loading");

    useEffect(() => {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        const isAndroid = /android/i.test(ua);
        const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

        const deepLink = `voucherapp://company/${encodeURIComponent(companyId || "")}`;

        setTimeout(() => {
            window.location.href = deepLink;
        }, 100);

        // Animate progress 0→100 over 3s
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
    }, [companyId]);

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

        /* Floating orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(60px);
          opacity: 0.4;
        }
        .orb-1 {
          width: 300px; height: 300px;
          background: rgba(198,40,40,0.25);
          top: -80px; right: -80px;
          animation: drift 8s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 200px; height: 200px;
          background: rgba(255,179,0,0.12);
          bottom: -40px; left: -40px;
          animation: drift 10s ease-in-out infinite alternate-reverse;
        }

        @keyframes drift {
          from { transform: translate(0, 0); }
          to   { transform: translate(20px, 20px); }
        }

        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 28px;
          padding: 44px 36px;
          max-width: 480px;
          width: 100%;
          text-align: center;
          direction: rtl;
          position: relative;
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 0 1px rgba(198,40,40,0.2),
            0 32px 80px rgba(0,0,0,0.5),
            0 0 60px rgba(198,40,40,0.06) inset;
          animation: cardIn 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0; left: 24px; right: 24px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c62828, #FFB300, #c62828, transparent);
          border-radius: 0 0 4px 4px;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Logo */
        .logo-wrap {
          position: relative;
          display: inline-block;
          margin-bottom: 28px;
        }

        .logo-ring {
          position: absolute;
          inset: -12px;
          border-radius: 30px;
          border: 1.5px solid rgba(198,40,40,0.3);
          animation: ringPulse 2s ease-in-out infinite;
        }

        .logo-ring-2 {
          position: absolute;
          inset: -22px;
          border-radius: 36px;
          border: 1px solid rgba(198,40,40,0.12);
          animation: ringPulse 2s ease-in-out infinite 0.4s;
        }

        @keyframes ringPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.03); }
        }

        .logo-wrap img {
          width: 96px;
          height: 96px;
          border-radius: 22px;
          display: block;
          box-shadow: 0 8px 32px rgba(198,40,40,0.45);
          position: relative;
          z-index: 1;
        }

        h1 {
          font-size: 27px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.3;
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 32px;
        }

        /* Spinner ring */
        .spinner-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }

        .spinner {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 3px solid rgba(255,255,255,0.07);
          border-top-color: #c62828;
          border-right-color: #FFB300;
          animation: spin 0.9s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Progress */
        .progress-track {
          background: rgba(255,255,255,0.06);
          border-radius: 100px;
          height: 5px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .progress-fill {
          height: 100%;
          border-radius: 100px;
          background: linear-gradient(90deg, #c62828 0%, #FFB300 100%);
          transition: width 0.06s linear;
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 30px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4));
          border-radius: 100px;
        }

        .progress-hint {
          font-size: 12px;
          color: rgba(255,255,255,0.28);
          margin-bottom: 28px;
          direction: rtl;
        }

        /* Company ID tag */
        .company-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,179,0,0.08);
          border: 1px solid rgba(255,179,0,0.25);
          border-radius: 10px;
          padding: 7px 14px;
          margin-bottom: 24px;
          direction: ltr;
        }

        .company-label {
          font-size: 10px;
          font-weight: 700;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-family: 'Tajawal', sans-serif;
        }

        .company-value {
          font-size: 13px;
          font-weight: 700;
          color: #FFB300;
          font-family: monospace;
          letter-spacing: 0.5px;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
        .divider-text { font-size: 11px; color: rgba(255,255,255,0.22); font-weight: 600; letter-spacing: 1px; white-space: nowrap; }

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
          padding: 15px 20px;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          font-family: 'Tajawal', sans-serif;
          text-decoration: none;
          background: linear-gradient(135deg, #c62828 0%, #b71c1c 100%);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow:
            0 4px 20px rgba(198,40,40,0.45),
            0 1px 0 rgba(255,255,255,0.1) inset;
          transition: transform 0.15s, box-shadow 0.15s;
          direction: rtl;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(198,40,40,0.55), 0 1px 0 rgba(255,255,255,0.1) inset;
        }

        .btn-primary:active { transform: translateY(0); }

        .btn-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 20px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Tajawal', sans-serif;
          text-decoration: none;
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.09);
          transition: background 0.15s, transform 0.15s;
          flex: 1;
          direction: ltr;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.09);
          transform: translateY(-1px);
        }

        .store-row { display: flex; gap: 10px; }

        .footer-text {
          margin-top: 28px;
          font-size: 11px;
          color: rgba(255,255,255,0.16);
          direction: rtl;
          letter-spacing: 0.3px;
        }
      `}</style>

            <div className="savi-root">
                <div className="orb orb-1" />
                <div className="orb orb-2" />

                <div className="card">
                    <div className="logo-wrap">
                        <div className="logo-ring" />
                        <div className="logo-ring-2" />
                        <img src="/saviIconBG5.jpg" alt="Savi Vouchers" />
                    </div>

                    <h1>جاري فتح التطبيق</h1>
                    <p className="subtitle">سيتم تحويلك إلى Savi Vouchers تلقائياً</p>

                    {companyId && (
                        <div className="company-tag">
                            <span className="company-label">COMPANY</span>
                            <span className="company-value">{companyId}</span>
                        </div>
                    )}

                    <div className="spinner-wrap">
                        <div className="spinner" />
                    </div>

                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="progress-hint">
                        {phase === "loading"
                            ? "جارٍ التحقق من التطبيق... سيتم التحويل للمتجر تلقائياً إذا لم يكن مثبتاً"
                            : "جارٍ التحويل إلى المتجر..."}
                    </p>

                    <div className="divider">
                        <div className="divider-line" />
                        <span className="divider-text">أو اختر يدوياً</span>
                        <div className="divider-line" />
                    </div>

                    <div className="btn-group">
                        <a
                            href={`voucherapp://company/${encodeURIComponent(companyId || "")}`}
                            className="btn-primary"
                        >
                            <span>📱</span>
                            <span>فتح التطبيق مباشرة</span>
                        </a>
                        <div className="store-row">
                            <a href={ANDROID_PLAY_STORE_URL} className="btn-secondary">
                                🤖 Google Play
                            </a>
                            <a href={IOS_APP_STORE_URL} className="btn-secondary">
                                🍎 App Store
                            </a>
                        </div>
                    </div>

                    <p className="footer-text">Savi Vouchers · وفّر أكثر مع كل عملية شراء</p>
                </div>
            </div>
        </>
    );
}