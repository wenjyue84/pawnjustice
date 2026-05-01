import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PawnJustice — Fighting Pawnshop Overcharging in Malaysia",
    template: "%s | PawnJustice",
  },
  description:
    "Public advocacy against pawnshop overcharging in Malaysia. Document cases, know your rights under the Pawnbrokers Act 1972, submit complaints.",
  metadataBase: new URL("https://pawnjustice.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_MY",
    siteName: "PawnJustice",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
