import "./globals.css";
import { AppProvider } from "./context/Context";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppProvider>
        <body>{children}</body>
      </AppProvider>
    </html>
  );
}
