import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GongZuo",
  description:
    "GongZuo which means work in Chinese. Enabling people to manage their work time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
