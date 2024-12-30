import Sidebar from "@/components/Sidebar";


export default function Layout({
    children
  }: {
    children: React.ReactNode;
  }) {

    return (
      <div className="w-full flex flex-1 p-2 gap-2 text-text min-h-screen bg-secondary">
          <Sidebar />
          <div className="flex flex-1 overflow-hidden p-4 rounded-lg bg-primary shadow">
            {children}
          </div>
      </div>
    );
}