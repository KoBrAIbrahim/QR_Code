import { BrowserRouter, Routes, Route } from "react-router-dom";
import PromoRedirectPage from "./PromoRedirectPage";

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
      <p>رابط التحويل هو: <code>/promo?code=ABC123</code></p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* صفحة التحويل مع البروموكود */}
        <Route path="/promo" element={<PromoRedirectPage />} />

        {/* صفحة رئيسية بسيطة (اختيارية) */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
