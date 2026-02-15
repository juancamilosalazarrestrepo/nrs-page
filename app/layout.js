import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'No Rules Clan — Rap desde Envigado, Medellín',
  description: 'No Rules Clan (NRS) — Grupo de Hip Hop compuesto por Anyone/Cualkiera, Sison Beats y DJ Kario One. Boom Bap desde Envigado, Medellín, Colombia.',
  keywords: 'No Rules Clan, NRS, rap colombiano, hip hop, Envigado, Medellín, boom bap, Anyone, Cualkiera, Sison Beats, Kario One',
  openGraph: {
    title: 'No Rules Clan',
    description: 'Rap desde Envigado, Medellín — Anyone, Sison Beats & DJ Kario One',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
