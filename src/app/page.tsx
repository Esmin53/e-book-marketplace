import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-1 bg-[#F7F5EB] text-gray-900">
      <div className="w-full h-72 bg-[#EAC7C7] flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Banner image and text go here</h1>
      </div>
      <div className="w-full flex flex-col gap-6 px-52 py-10">
          <h2 className="text-2xl text-gray-700">Russian classics</h2>
          <div className="w-full flex gap-6">
            <div className="flex flex-col gap-1">
              <div className="w-56 h-64 bg-red-200" />
              <h1 className="text-lg">All Tomorrows</h1>
              <p className="text-sm text-gray-600">Erich Maria Remarque</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-56 h-64 bg-red-200" />
              <h1 className="text-lg">White Nights</h1>
              <p className="text-sm text-gray-600">Dostoyevski</p>
            </div>
          </div>
      </div>
    </div>
  );
}
