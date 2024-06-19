import { Section, Container } from "@/components/craft";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import Balancer from "react-wrap-balancer";
import { Button } from "@/components/ui/button";
import { Camera, ShoppingCart } from "lucide-react";

const Hero = () => {
    return (

        <Container className="text-center items-center flex flex-col">
            <Image
                src={Logo}
                width={172}
                height={72}
                alt="Company Logo"
                className="not-prose dark:invert mb-6 md:mb-8"
            />
            <h1 className="mb-5 text-2xl font-black">
                <Balancer>
                    Tout pour l{"'"}école en un seul endroit.
                </Balancer>
            </h1>
            <h3 className="text-muted-foreground ">
                <Balancer>
                    Découvrez notre vaste collection de livres, fournitures scolaires, et bien plus encore. Trouvez tout ce qu{"'"}il vous faut pour une année scolaire réussie.
                </Balancer>
            </h3>
            <div className="mt-6 md:mt-12 not-prose flex gap-2">
                <Button asChild>
                    <Link href="/shop">
                        <ShoppingCart className="mr-2" />
                        Explorez notre collection
                    </Link>
                </Button>
                {/* <Button variant={"ghost"} asChild>
            <Link href="/posts">Dolor Sit Amet -{">"}</Link>
          </Button> */}
            </div>
        </Container>

    );
};

export default Hero;
