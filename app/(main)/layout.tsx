import { auth } from "@/auth";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/homepage/navbar";

export const experimental_ppr = true;

export default async function Layout({ children }: { children: React.ReactNode }) {
      const session =  await auth();
      const username = session?.user?.name;
    return (
        <div>
            <Navbar username={username}/>
            {children}
            <Footer />
        </div>

    )
}