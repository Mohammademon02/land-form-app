import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Image src="/images/logo2.jpg" width={200} height={50} alt="logo" />
    </div>
  )
}
