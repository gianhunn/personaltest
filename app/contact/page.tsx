import Navigation from "@/components/navigation"
import { ContactFormSection } from "@/app/contact/components/contact-form-section"
import { ContactHeroSection } from "@/app/contact/components/contact-hero-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ed]">
      <Navigation currentPage="about" />

      <main className="relative h-screen">

        {/* Hero Section */}
        <ContactHeroSection />
        <ContactFormSection />
      </main>
    </div>
  )
}
