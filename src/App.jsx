import { BrowserRouter, Routes, Route } from "react-router-dom";
import PromoRedirectPage from "./PromoRedirectPage";
import CompanyRedirectPage from "./CompanyRedirectPage";

function HomePage() {
  return (
    <div
      style={{
        direction: "rtl",
        textAlign: "center",
        marginTop: "4rem",
        fontFamily: "system-ui",
      }}
    >
      <h1>مرحبا في Savi Vouchers Redirect</h1>
      <p>هذه الصفحة الرئيسية فقط للتجربة.</p>
      <p>روابط التحويل:</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><code>/promo?code=ABC123</code> - للبروموكود</li>
        <li><code>/company/CompanyId123</code> - لصفحة الشركة</li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* صفحة التحويل مع البروموكود */}
        <Route path="/promo" element={<PromoRedirectPage />} />

        {/* صفحة التحويل لمعرف الشركة */}
        <Route path="/company/:companyId" element={<CompanyRedirectPage />} />

        {/* صفحة رئيسية بسيطة (اختيارية) */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
