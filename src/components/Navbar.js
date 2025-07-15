import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
function Navbar() {
  const user = false;
  return (
    <>
      <div className="fixed px-10 top-11 md:top-12 left-0 right-0 z-50 h-15 flex text-red-500 p-4 justify-between items-center border-b-2 border-b-red-500 uppercase bg-white md:h-20 lg:px-20 xl:px-40">
        <div className="hidden md:flex gap-4 flex-1 md:text-[18px]">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="text-xl md:font-bold flex-1 md:text-center">
          <Link href="/">Massimo</Link>
        </div>
        <div className="md:hidden">
            <Menu />
        </div>
        <div className="hidden md:flex gap-4 flex-1 justify-end">
          <div
            className="flex items-center gap-2 cursor-pointer px-2 rounded-md whitespace-nowrap"
            style={{ backgroundColor: "rgb(247, 202, 100)" }}
          >
            <span>📞 123 456 789</span>
          </div>
          <Link href="/login" className="md:text-[18px]">Login</Link>
          <Link href="/cart">
            {" "}
            <CartIcon />{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
export default Navbar;