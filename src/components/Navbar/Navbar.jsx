export default function Navbar() {
  return (
    <div className="flex h-16 px-6 items-center justify-end border-b bg-white border-sidebar w-full sticky top-0 z-10">
  <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center overflow-hidden">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iARzQJENq3SRA2FjSbOSrreAv4qo0J.png" 
            alt="Christopher Miller"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-900">Christopher Miller</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>
      </div>    </div>
  );
}
