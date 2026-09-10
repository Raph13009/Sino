import type { Metadata } from "next";
import LocaleNotFound from "./[locale]/not-found";

export const metadata: Metadata = {
  title: {
    absolute: "Page not found | OPOPA",
  },
  robots: { index: false, follow: false },
};

export default function RootNotFound() {
  return <LocaleNotFound />;
}
