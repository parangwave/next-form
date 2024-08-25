import Header from "@/components/Header";
import TabBar from "@/components/TabBar";

export default async function TabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="wrapper">
      <div className="device bg-white">
        <Header />
        <section className="device-inner">{children}</section>
        <TabBar />
      </div>
    </section>
  );
}
