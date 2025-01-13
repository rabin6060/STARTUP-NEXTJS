import { Toaster } from "@/components/ui/sonner";
import Navbar from "../components/Navbar";

export default function  Layout({children}:Readonly<{children:React.ReactNode}>) {
    return (
        <main>
            <Navbar/>
            {children}
            <Toaster position="bottom-right"/>
        </main>
    )
}