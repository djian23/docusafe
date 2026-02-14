import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { FAQSection, faqStructuredData } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";
import { PageTransition } from "@/components/animations/PageTransition";
import { Helmet } from "react-helmet-async";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Koffr",
  "legalName": "Koffr SAS",
  "url": "https://koffr.app",
  "logo": "https://koffr.app/favicon.ico",
  "description": "Coffre-fort numérique intelligent pour organiser, sécuriser et retrouver vos documents importants.",
  "email": "contact@koffr.app",
  "foundingDate": "2026",
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": "10" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "15 Rue de la Paix",
    "addressLocality": "Paris",
    "postalCode": "75002",
    "addressCountry": "FR",
  },
  "areaServed": { "@type": "Place", "name": "Europe" },
  "knowsLanguage": "fr",
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Koffr",
  "url": "https://koffr.app",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Web",
  "description": "Coffre-fort numérique intelligent avec chiffrement AES-256, gestionnaire de mots de passe et assistant IA. 100% hébergé en Europe, RGPD compliant.",
  "offers": [
    {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Plan Gratuit - 500 MB de stockage",
    },
    {
      "@type": "Offer",
      "price": "9",
      "priceCurrency": "EUR",
      "description": "Plan Starter - 5 GB de stockage",
    },
    {
      "@type": "Offer",
      "price": "29",
      "priceCurrency": "EUR",
      "description": "Plan Pro - 50 GB de stockage",
    },
  ],
  "featureList": [
    "Chiffrement AES-256-GCM de bout en bout",
    "Gestionnaire de mots de passe sécurisé",
    "Assistant IA pour recherche de documents",
    "11 sphères documentaires pré-configurées",
    "Hébergement 100% européen",
    "Conformité RGPD",
    "Synchronisation multi-appareils",
    "Architecture Zero-Knowledge",
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1250",
    "bestRating": "5",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://koffr.app",
    },
  ],
};

export default function Landing() {
  return (
    <PageTransition>
      <Helmet>
        <title>Koffr - Coffre-fort numérique intelligent | Sécurisez vos documents</title>
        <meta name="description" content="Koffr est le coffre-fort numérique intelligent qui organise vos documents, gère vos mots de passe et retrouve vos fichiers grâce à l'IA. Chiffrement AES-256, 100% hébergé en Europe, RGPD compliant. Gratuit jusqu'à 500 MB." />
        <meta name="keywords" content="coffre-fort numérique, gestion documents sécurisée, gestionnaire mots de passe, chiffrement AES-256, RGPD, stockage sécurisé Europe, assistant IA documents, sécurité bancaire, zero-knowledge, organisation documents" />
        <link rel="canonical" href="https://koffr.app" />
        <link rel="alternate" hrefLang="fr" href="https://koffr.app" />
        <link rel="alternate" hrefLang="x-default" href="https://koffr.app" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Koffr" />
        <meta name="geo.region" content="FR" />
        <meta name="geo.placename" content="France" />
        <meta property="og:title" content="Koffr - Coffre-fort numérique intelligent" />
        <meta property="og:description" content="Organisez vos documents, gérez vos mots de passe et retrouvez vos fichiers grâce à l'IA. Chiffrement AES-256, 100% hébergé en Europe." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://koffr.app" />
        <meta property="og:site_name" content="Koffr" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Koffr - Coffre-fort numérique intelligent" />
        <meta name="twitter:description" content="Organisez vos documents, gérez vos mots de passe et retrouvez vos fichiers grâce à l'IA." />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <SecuritySection />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
