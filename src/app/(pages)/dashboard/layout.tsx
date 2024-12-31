import Sidebar from "@/components/Sidebar";


export default function Layout({
    children
  }: {
    children: React.ReactNode;
  }) {

    return (
      <div className="flex flex-1 p-2 gap-2 text-text h-screen bg-secondary w-screen">
          <Sidebar />
          <div className="flex flex-1 p-4 rounded-xl bg-primary shadow overflow-y-scroll">
            {children}
          </div>
      </div>
    );
}