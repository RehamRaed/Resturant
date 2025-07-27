import Link from "next/link";
function Footer(){
    return(
      <div className=" md:h-15 p-4 lg:px-25 xl:px-40 text-red-500 flex flex-col items-center justify-between bg-white [@media(min-width:450px)]:flex-row">
          <Link href="/" className="font-bold text-xl">Tavolo</Link>
          <p className="text-center text-sm text-gray-500 ">
            © 2025 Massimo. All rights reserved.
          </p>
      </div>
    )
}
export default Footer;