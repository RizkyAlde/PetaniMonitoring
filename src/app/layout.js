import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: 'EEPIS REPLON MOBILE',
  description: 'Generated for Replon',
  icons:{
    icon: ['/favicon.ico?v=4'],
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
