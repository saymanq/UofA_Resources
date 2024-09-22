import "./globals.css";
import { AuthContextProvider } from "../context/AuthContext";
//import GoogleAnalytics from '@/components/GoogleAnalytics';
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  title: "UofA Resources",
  description: "University of Alberta resources for students (STAT252 currently)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        backgroundImage: `url("imgs/bgimg.jpeg")`,
        backgroundSize: 'cover',
        
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        minHeight: '100vh',
      }}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_MEASUREMENT_ID} />
    </html>
  );
}
