import Link from "next/link";

export default function Header(): React.JSX.Element {
    return (
        <header className="bg-[#FFFFF] text-white mb-4 flex justify-between items-center px-2 ">
            <h1 className="text-2xl font-bold text-[#007bff]"> Code 'n Ctrl</h1>
            <nav>
                <ul className="flex space-x-4 p-4 text-[#007bff] font-semibold text-2xl">
                    <li><Link href={"/"}> Home </Link></li>
                    <li><Link href={"/posts"}>Articles</Link></li>
                    <li><Link href={"/category"}>Categories</Link></li>
                    <li><Link href={"/about"}>About</Link></li>
                    <li><Link href={"/contact"}>Contact</Link></li>
                </ul>
            </nav>
            <div>Dark Mode</div>
        </header>
    );
}