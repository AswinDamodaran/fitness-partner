import Image from "next/image";
import { Dumbbell } from "lucide-react";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="#" className="p-2 bg-darkBg rounded-md">
          <Dumbbell color="#fff" />
        </Link>
    )
}