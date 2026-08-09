import Navigation from "./Navigation";
import ContactCTA from "./ContactCTA";
import Footer from "./Footer";

export interface PublicLayoutProps {
  children: React.ReactNode;
  showContactCTA?: boolean;
  settings?: Record<string, any>;
}

export default function PublicLayout({
  children,
  showContactCTA = true,
  settings,
}: PublicLayoutProps) {
  const siteName = settings?.site_name || "Veda Brahma Shri Pradeep Nadig";
  const address = settings?.office_address || "Asharaya layout, Vaderahalli, K.G.Vaderahalli, Bengaluru, Karnataka 560097";
  const mobile = settings?.contact_mobile || "+91 98440 42068";
  const whatsapp = settings?.whatsapp_number || "919844042068";
  const email = settings?.contact_email || "pradeep@vedabrahma.com";

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation siteName={siteName} />
      <main className="grow">{children}</main>
      {showContactCTA && (
        <ContactCTA whatsappNumber={whatsapp} mobileNumber={mobile} email={email} />
      )}
      <Footer siteName={siteName} address={address} mobile={mobile} email={email} />
    </div>
  );
}
