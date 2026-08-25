import GlassNav from "@/components/nav/GlassNav";
import Hero from "@/components/hero/Hero";
import ProductsSection from "@/components/products/ProductsSection";
import TrustSection from "@/components/trust/TrustSection";
import FaqSection from "@/components/faq/FaqSection";
import Footer from "@/components/footer/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ReservationModal from "@/components/cart/ReservationModal";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GlassNav />
      <Hero />
      <ProductsSection />
      <TrustSection />
      <FaqSection />
      <Footer />
      <CartDrawer />
      <ReservationModal />
    </main>
  );
}
