import { auth } from "@/auth";
import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import prisma from "@/utils/db";
import Image from "next/image";
import Link from "next/link";

// export default async function Home() {
//   const session = await auth()
//   if (!session?.user) {
//     return <SignInButton />
//   }
//   return (
//     <div>LOGGED IN WITH {session.user.userRole} ACCOUNT </div>
//   );
// }


export default function Component() {
  return (
    <div className="grid md:grid-cols-[1fr_320px] gap-8 max-w-6xl mx-auto px-4 py-12">
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Our Store</h1>
          <p className="text-gray-500 dark:text-gray-400">Browse our selection of high-quality products.</p>
        </div>
        <div className="grid gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Apparel</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
                <Link className="block" href="#">
                  <Image
                    alt="Product Image"
                    className="w-full aspect-square object-cover"
                    height={300}
                    src="/placeholder.svg"
                    width={300}
                  />
                </Link>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">
                    <Link href="#">Cozy Hoodie</Link>
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                    A soft and comfortable hoodie perfect for everyday wear.
                  </p>
                  <Button className="w-full" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
                <Link className="block" href="#">
                  <Image
                    alt="Product Image"
                    className="w-full aspect-square object-cover"
                    height={300}
                    src="/placeholder.svg"
                    width={300}
                  />
                </Link>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">
                    <Link href="#">Casual T-Shirt</Link>
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                    A versatile t-shirt that can be dressed up or down.
                  </p>
                  <Button className="w-full" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
                <Link className="block" href="#">
                  <Image
                    alt="Product Image"
                    className="w-full aspect-square object-cover"
                    height={300}
                    src="/placeholder.svg"
                    width={300}
                  />
                </Link>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">
                    <Link href="#">Denim Jeans</Link>
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                    A classic pair of denim jeans that will never go out of style.
                  </p>
                  <Button className="w-full" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Accessories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
                <Link className="block" href="#">
                  <Image
                    alt="Product Image"
                    className="w-full aspect-square object-cover"
                    height={300}
                    src="/placeholder.svg"
                    width={300}
                  />
                </Link>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">
                    <Link href="#">Leather Wallet</Link>
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                    A high-quality leather wallet that will last for years.
                  </p>
                  <Button className="w-full" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
                <Link className="block" href="#">
                  <Image
                    alt="Product Image"
                    className="w-full aspect-square object-cover"
                    height={300}
                    src="/placeholder.svg"
                    width={300}
                  />
                </Link>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">
                    <Link href="#">Sunglasses</Link>
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                    Stylish and durable sunglasses to protect your eyes.
                  </p>
                  <Button className="w-full" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
                <Link className="block" href="#">
                  <Image
                    alt="Product Image"
                    className="w-full aspect-square object-cover"
                    height={300}
                    src="/placeholder.svg"
                    width={300}
                  />
                </Link>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">
                    <Link href="#">Leather Belt</Link>
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                    A stylish and durable leather belt to complete any outfit.
                  </p>
                  <Button className="w-full" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Home Decor</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
                <Link className="block" href="#">
                  <Image
                    alt="Product Image"
                    className="w-full aspect-square object-cover"
                    height={300}
                    src="/placeholder.svg"
                    width={300}
                  />
                </Link>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">
                    <Link href="#">Decorative Vase</Link>
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                    A beautiful and functional vase to add to your home.
                  </p>
                  <Button className="w-full" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
                <Link className="block" href="#">
                  <Image
                    alt="Product Image"
                    className="w-full aspect-square object-cover"
                    height={300}
                    src="/placeholder.svg"
                    width={300}
                  />
                </Link>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">
                    <Link href="#">Throw Pillow</Link>
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                    A cozy and stylish throw pillow to add to your living room.
                  </p>
                  <Button className="w-full" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
                <Link className="block" href="#">
                  <Image
                    alt="Product Image"
                    className="w-full aspect-square object-cover"
                    height={300}
                    src="/placeholder.svg"
                    width={300}
                  />
                </Link>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">
                    <Link href="#">Decorative Candle</Link>
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                    A beautifully scented candle to create a cozy ambiance.
                  </p>
                  <Button className="w-full" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Cart</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Image
              alt="Product Image"
              className="rounded-lg"
              height={80}
              src="/placeholder.svg"
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width={80}
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Cozy Hoodie</h3>
              <p className="text-gray-500 dark:text-gray-400">$49.99</p>
            </div>
            <Button
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              size="icon"
              variant="ghost"
            >
              <XIcon className="w-5 h-5" />
              <span className="sr-only">Remove from cart</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Image
              alt="Product Image"
              className="rounded-lg"
              height={80}
              src="/placeholder.svg"
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width={80}
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Leather Wallet</h3>
              <p className="text-gray-500 dark:text-gray-400">$29.99</p>
            </div>
            <Button
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              size="icon"
              variant="ghost"
            >
              <XIcon className="w-5 h-5" />
              <span className="sr-only">Remove from cart</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Image
              alt="Product Image"
              className="rounded-lg"
              height={80}
              src="/placeholder.svg"
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width={80}
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Sunglasses</h3>
              <p className="text-gray-500 dark:text-gray-400">$19.99</p>
            </div>
            <Button
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              size="icon"
              variant="ghost"
            >
              <XIcon className="w-5 h-5" />
              <span className="sr-only">Remove from cart</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Image
              alt="Product Image"
              className="rounded-lg"
              height={80}
              src="/placeholder.svg"
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width={80}
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Decorative Vase</h3>
              <p className="text-gray-500 dark:text-gray-400">$39.99</p>
            </div>
            <Button
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              size="icon"
              variant="ghost"
            >
              <XIcon className="w-5 h-5" />
              <span className="sr-only">Remove from cart</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Image
              alt="Product Image"
              className="rounded-lg"
              height={80}
              src="/placeholder.svg"
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width={80}
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Throw Pillow</h3>
              <p className="text-gray-500 dark:text-gray-400">$24.99</p>
            </div>
            <Button
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              size="icon"
              variant="ghost"
            >
              <XIcon className="w-5 h-5" />
              <span className="sr-only">Remove from cart</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Image
              alt="Product Image"
              className="rounded-lg"
              height={80}
              src="/placeholder.svg"
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width={80}
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Decorative Candle</h3>
              <p className="text-gray-500 dark:text-gray-400">$14.99</p>
            </div>
            <Button
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              size="icon"
              variant="ghost"
            >
              <XIcon className="w-5 h-5" />
              <span className="sr-only">Remove from cart</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Image
              alt="Product Image"
              className="rounded-lg"
              height={80}
              src="/placeholder.svg"
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width={80}
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Leather Belt</h3>
              <p className="text-gray-500 dark:text-gray-400">$29.99</p>
            </div>
            <Button
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              size="icon"
              variant="ghost"
            >
              <XIcon className="w-5 h-5" />
              <span className="sr-only">Remove from cart</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Image
              alt="Product Image"
              className="rounded-lg"
              height={80}
              src="/placeholder.svg"
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width={80}
            />
            <div className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

function XIcon(props:{className:string}) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}