import Link from "next/link";
import Image from "next/image";

export default function Header(): React.JSX.Element {
    return (
        <header className="bg-[#FFFFF] text-white flex justify-between items-center px-8 max-h-100 py-4">
            <Image src="/coding_Ctrl_logo.png" alt="Logo" width={80} height={40} />
            <nav>
                <ul className="flex space-x-4 text-[#007bff] font-semibold text-lg">
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