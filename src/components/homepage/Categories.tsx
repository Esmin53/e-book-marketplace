import { GENRES } from "@/lib/utils"
import Image from "next/image"


const Categories = () => {

    return (
        <div className="w-full flex flex-col gap-4">
            <h1 className="text-3xl font-medium">Browse Categories</h1>
            <div className="w-full grid grid-cols-4 gap-5">
                {GENRES.map((item, i) => (
                    <div className="w-full aspect-video bg-secondary relative shadow-sm rounded-sm overflow-hidden flex items-center justify-center" key={item.id}>
                        <div className="w-full py-3 z-20 relative bg-secondary/70 flex items-center justify-center">
                            <p className="font-medium">{item.title}</p>
                        </div>
                        <Image fill src={`/books${i+1}.jpg`} alt="Books" className="object-cover z-10"/>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories