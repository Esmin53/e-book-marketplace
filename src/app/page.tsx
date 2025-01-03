
export default function Home() {
  return (
    <div className="flex-1 bg-primary text-text ">
      <div className="w-full flex flex-col gap-4 px-52 py-10">
          <h2 className="text-2xl text-text/90">Russian classics</h2>
          <div className="w-2/6 h-[1.5px] bg-accent2" />
          <div className="w-full flex gap-6">
            <div className="flex flex-col gap-1">
              <div className="w-56 h-64 bg-red-200" />
              <h1 className="text-lg">All Tomorrows</h1>
              <p className="text-sm text-text">Erich Maria Remarque</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-56 h-64 bg-red-200" />
              <h1 className="text-lg">White Nights</h1>
              <p className="text-sm text-text">Dostoyevski</p>
            </div>
          </div>
      </div>
    </div>
  );
}
