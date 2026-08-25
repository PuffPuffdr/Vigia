import GlassNav from "@/components/nav/GlassNav";
import Hero from "@/components/hero/Hero";
import ProductsSection from "@/components/products/ProductsSection";
import TrustSection from "@/components/trust/TrustSection";
import TrustBadges from "@/components/trust/TrustBadges";
import FaqSection from "@/components/faq/FaqSection";
import Footer from "@/components/footer/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ReservationModal from "@/components/cart/ReservationModal";
import WhatsappButton from "@/components/whatsapp/WhatsappButton";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GlassNav />
      <Hero />
      <TrustBadges />
      <ProductsSection />
      <TrustSection />
      <FaqSection />
      <Footer />
      <CartDrawer />
      <ReservationModal />
      <WhatsappButton />
    </main>
  );
}
