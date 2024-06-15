import * as Craft from "@/components/craft";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Placeholder from "@/public/placeholder.svg";

const Feature = () => {
    return (
        <Craft.Section>
            <Craft.Container className="grid md:grid-cols-2 md:gap-12 items-stretch">
                <div className="not-prose border relative rounded-lg overflow-hidden flex h-96">
                    <Image
                        src={Placeholder}
                        alt="placeholder"
                        className="fill object-cover"
                    />
                </div>
                <div className="flex flex-col gap-6 py-8">
                    <h3 className="!my-0">Commandes scolaires prédéfinies</h3>
                    <p className="font-light leading-[1.4] opacity-70">
                        Nous avons préparé des commandes prédéfinies pour des écoles spécifiques, conformément aux listes fournies par les établissements scolaires marocains.
                    </p>
                    <div className="not-prose flex items-center gap-2">
                        <Button className="w-fit" asChild>
                            <Link href="#">Voir les listes scolaires  {"->"}</Link>

                        </Button>

                    </div>
                </div>
            </Craft.Container>
        </Craft.Section>
    );
};

export default Feature;
