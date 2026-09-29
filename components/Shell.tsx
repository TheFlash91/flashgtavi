import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './BackToTop';
import GlobalBackdrop from './GlobalBackdrop';

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalBackdrop />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
