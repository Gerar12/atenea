import Image from 'next/image'

export default function Footer() {
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-40 pointer-events-none">
      <a
        href="https://salex.sv"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity pointer-events-auto"
      >
        <span className="text-sm text-marfil/40">Powered by</span>
        <Image
          src="/s.png"
          alt="Salex"
          width={50}
          height={20}
          className="h-5 w-auto opacity-70"
        />
      </a>
    </div>
  )
}