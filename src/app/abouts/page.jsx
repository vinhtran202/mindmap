import AboutPage from "./About";
import Head from "next/head";

export const metadata = {
  title: "Giới thiệu",
  description: "Đây là trang chủ của tôi.",
  icons: [
    {
      url: "/svg/gears-solid.svg",
      type: "image/png",
    },
  ],
  openGraph: {
    title: "Giải thiệu aaaaaaaa",
    description: "Đây là trang chủ của tôi.",
  },
};
export default function page() {
  return (
    <>
      <Head>
        <link rel="preload" href="/svg/gears-solid.svg" as="image" />
      </Head>
      <div>
        <AboutPage />
      </div>
    </>
  );
}
