import { motion } from "framer-motion"
import Image from "next/image"

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-black bg-opacity-75 backdrop-blur-lg z-50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center ">
        <Image src={"/icon.png"} width={60} height={60}/>
        <div className="text-white text-2xl font-bold ml-2">Kozu</div>

      </div>
    </motion.nav>
  )
}
