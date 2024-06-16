"use client"

import { useState, ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function Component() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Cozy Blanket",
      price: 29.99,
      description: "Warm and Soft for Chilly Nights",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Autumn Mug",
      price: 12.99,
      description: "Enjoy Your Hot Beverages in Style",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Fall Fragrance Candle",
      price: 16.99,
      description: "Fill Your Space with a Cozy Scent",
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Autumn Leaves Wall Art",
      price: 39.99,
      description: "Decorate Your Space with Nature's Beauty",
      image: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Fall Harvest Wreath",
      price: 49.99,
      description: "Welcome the Season with a Beautiful Wreath",
      image: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Spiced Apple Cider Syrup",
      price: 12.99,
      description: "Enhance Your Drinks with Delicious Syrup",
      image: "/placeholder.svg",
    },
    {
      id: 7,
      name: "Fall Foliage Table Runner",
      price: 19.99,
      description: "Decorate Your Table with Autumn Leaves",
      image: "/placeholder.svg",
    },
    {
      id: 8,
      name: "Fall Fashion Hat",
      price: 24.99,
      description: "Complete Your Autumn Outfit with a Stylish Hat",
      image: "/placeholder.svg",
    },
  ])
  const [cart, setCart] = useState<Product[]>([])
  const [cartName, setCartName] = useState<string>("")

  const addToCart = (product: Product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (product: Product) => {
    setCart(cart.filter((item) => item.id !== product.id))
  }

  const totalPrice = cart.reduce((total, item) => total + item.price, 0)

  const saveCart = () => {
    console.log("Saved cart:", { name: cartName, items: cart })
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-6">Build Custom Cart</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Add Products</h2>
          <div className="mb-4">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products
              .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((product) => (
                <li key={product.id} className="bg-white rounded-lg shadow-sm">
                  <div className="p-4">
                    <img
                      src="/placeholder.svg"
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="mt-2">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-gray-500 text-sm">{product.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold">${product.price}</span>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="bg-primary-500 text-white hover:bg-primary-600"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Cart</h2>
          <div className="mb-4">
            <Label htmlFor="cart-name" className="block mb-1">
              Cart Name
            </Label>
            <Input
              id="cart-name"
              placeholder="Enter cart name"
              value={cartName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCartName(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <ul className="space-y-4">
              {cart.map((product) => (
                <li key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src="/placeholder.svg" alt={product.name} width={50} height={50} className="rounded-lg mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => removeFromCart(product)}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
            <Button size="lg" onClick={saveCart} className="mt-4 w-full bg-primary-500 text-white hover:bg-primary-600">
              Save Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
