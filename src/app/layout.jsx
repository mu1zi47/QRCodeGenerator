import "./globals.css";
import ParticlesBackground from "@/components/ParticlesBackground";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "mu1zi47 QR code generator",
  description: "qr code generator by mu1zi47",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ParticlesBackground/>
        {children}
        <SpeedInsights/>
      </body>
    </html>
  );
}
