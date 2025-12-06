import Container from "./ui/container"
import Logo from "./Logo";
import { User } from "lucide-react"
import ThemeToggle from "./themeToggle";

export default function Navbar() {
    return (

        <nav className="bg-main w-full">
            <Container>
                <div className="flex items-center justify-between">
                    <Logo />
                   <div className="flex gap-5 items-center">
                    <ThemeToggle/>
                     <div className="p-1 rounded-full border-2 border-brd hover:scale-110 transition-all duration-300">
                        <User color="#fff" size={20} />
                    </div>
                   </div>
                </div>
            </Container>
        </nav>

    )
}