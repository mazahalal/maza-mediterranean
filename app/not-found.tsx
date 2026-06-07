import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A1F1E] text-[#F5F1E8]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mb-8">
            <div className="text-8xl font-bold text-[#D3AB5E] mb-4">404</div>
            <h1 className="text-3xl font-semibold mb-4">Page Not Found</h1>
            <p className="text-[#F5F1E8]/70 mb-8">
              The page you&apos;re looking for has wandered off like a lost kebab. 
              Let&apos;s get you back to the good stuff.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/" 
              className="block w-full py-3 px-6 bg-[#D3AB5E] text-[#0A1F1E] font-medium rounded-lg hover:bg-[#C49A4D] transition-colors"
            >
              Return Home
            </Link>
            <Link 
              href="/menu" 
              className="block w-full py-3 px-6 border border-[#D3AB5E]/50 text-[#F5F1E8] rounded-lg hover:bg-[#D3AB5E]/10 transition-colors"
            >
              View the Menu
            </Link>
            <Link 
              href="/contact" 
              className="block w-full py-3 px-6 border border-[#D3AB5E]/50 text-[#F5F1E8] rounded-lg hover:bg-[#D3AB5E]/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
