"use client"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { assets, BagIcon, CartIcon } from "@/assets/assets"
import Link from "next/link"
import { useAppContext } from "@/context/AppContext"
import Image from "next/image"
import { useClerk, UserButton } from "@clerk/nextjs"
import { BoxIcon, ChevronDown, HomeIcon } from "lucide-react"

// Product categories data - moved outside component to reduce re-renders
const productCategories = [
  { href: "/products/notebooks", label: "ຫຼຸມປີມ" },
  { href: "/products/accounting", label: "ຫຼຸມບັນຊີ" },
  { href: "/products/usage", label: "ຫຼຸມເຂົ້າໃຊ້" },
  { href: "/products/usage-1", label: "ຫຼຸມເຂົ້າໃຊ້ ທໍາງານ 1" },
  { href: "/products/usage-2", label: "ຫຼຸມເຂົ້າໃຊ້ ທໍາງານ 2" },
  { href: "/products/usage-3", label: "ຫຼຸມເຂົ້າໃຊ້ ທໍາງານ 3" },
  { href: "/products/color", label: "ຫຼຸມສີ" },
  { href: "/products/register", label: "ຫຼຸມເຂົ້າຮຽນ" },
]


// Main navigation items
const navItems = [
  { href: "/", label: "ຫນ້າຫຼັກ" },
  { href: "/all-products", label: "ຮ້ານ" },
  { href: "/about", label: "ກ່ຽວກັບພວກເຮົາ" },
  { href: "/contact", label: "ຕິດຕໍ່ພວກເຮົາ" },
]

const Navbar = () => {
  const { isSeller, router, user } = useAppContext()
  const { openSignIn } = useClerk()
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const navRef = useRef(null)
  const pathname = usePathname()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsProductsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Check if a path is active (current page)
  const isActive = (path) => {
    if (path === "/") {
      return pathname === path
    }
    // For product categories, check if the current path starts with the category path
    if (path.startsWith("/products/")) {
      return pathname === path
    }
    // For other paths, check if the current path starts with the path
    return pathname.startsWith(path)
  }

  // Check if any product category is active
  const isProductsActive = pathname.startsWith("/products/")

  return (
    <nav
      className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700"
      ref={navRef}
    >
      <Image
        className="cursor-pointer w-15 md:w-22"
        onClick={() => router.push("/")}
        src="/LogoORCA_2.png"
        width={70}
        height={50}
        alt="logo"
      />

      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        {/* Main menu items with underline only when active */}
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`hover:text-gray-900 transition relative ${
              isActive(item.href)
                ? "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-gray-900"
                : ""
            }`}
            onClick={() => setIsProductsOpen(false)}
          >
            {item.label}
          </Link>
        ))}

        {/* Products dropdown - with active state */}
        <div className="relative">
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className={`flex items-center hover:text-gray-900 transition relative ${
              isProductsActive
                ? "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-gray-900"
                : ""
            }`}
          >
            ສິນຄ້າ
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>

          {isProductsOpen && (
            <div className="absolute left-0 mt-2 w-56 origin-top-left bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="py-1">
                {productCategories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                      isActive(category.href) ? "bg-gray-100 font-medium" : ""
                    }`}
                    onClick={() => setIsProductsOpen(false)}
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {isSeller && (
          <button
            onClick={() => {
              setIsProductsOpen(false)
              router.push("/seller")
            }}
            className={`text-xs border px-4 py-1.5 rounded-full hover:bg-gray-100 transition ${
              pathname.startsWith("/seller") ? "bg-gray-100 font-medium" : ""
            }`}
          >
            Seller Dashboard
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4">
        <Image className="w-4 h-4" src={assets.search_icon || "/placeholder.svg"} alt="search icon" />
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={()=>router.push('/cart')}/>
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={()=>router.push('/my-orders')} />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={() => {
              setIsProductsOpen(false)
              openSignIn()
            }}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon || "/placeholder.svg"} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => {
              setIsProductsOpen(false)
              router.push("/seller")
            }}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller
          </button>
        )}
        <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={()=>router.push('/')}/>
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action  label="Product" labelIcon={<BoxIcon/>} onClick={()=>router.push('/all-products')} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={()=>router.push('/my-orders')} />
            </UserButton.MenuItems>
          </UserButton>
       
      </div>
    </nav>
  )
}

export default Navbar
