import BounceLoader from "react-spinners/BounceLoader";


export const Loader = ()=>{
    return (
        <div className="flex flex-col gap-3 justify-center items-center bg-black/80 absolute top-0 left-0 w-full h-full z-20">
            <BounceLoader
            className="relative"
            color="#ffffff"
            size={100}
            aria-label="bar loader"
          />
          <p className="uppercase text-white font-bold text-3xl">Chargement...</p>
        </div>
    )
}