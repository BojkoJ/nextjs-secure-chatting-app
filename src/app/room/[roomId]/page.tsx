"use client"

import { Check, Copy } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"

const formatTimeRemaining = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return `${mins}:${secs.toString().padStart(2, "0")}`
}

const Page = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)

  const params = useParams()

  const roomId = params.roomId as string

  const handleCopy = async () => {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 3000)
  }

  return (
    <main className="flex flex-col h-screen max-h-screen overflow-hidden">
      <header className="border-b border-zinc-800 p-4 flex items-center justify-between bg-zinc-900/30">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-zinx-500 uppercase">id místnosti:</span>

            <div className="flex items-center gap-2">
              <span className="font-bold text-green-500">{roomId}</span>
              <div className="relative group">
                <button onClick={handleCopy} className="mt-1 cursor-pointer text-[10px] bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded text-zinc-400 hover:text-zinc-200 transition-colors">
                  <Copy className={`h-3.5 w-3.5 my-0.5 transition-all ${isCopied ? "hidden" : ""}`} />
                  <Check className={`h-3.5 w-3.5 my-0.5 transition-all ${isCopied ? "" : "hidden"}`} />
                </button>
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  kopírovat
                </span>
              </div>
            </div>
          </div>

          <div className="h-8 w-px bg-zinc-800" />

          <div className="flex flex-col">
            <div className="text-sm text-zinc-500 uppercase">místnost zanikne za:</div>
            <div className={`text-sm font-bold flex items-center gap-2 ${timeRemaining !== null && timeRemaining < 60 ? "text-red-500" : "text-amber-500"}`}>
              {timeRemaining !== null ? formatTimeRemaining(timeRemaining) : "--:--"}
            </div>
          </div>
        </div>

        <button className="cursor-pointer text-sm bg-zinc-800 hover:bg-red-600 px-3 py-1.5 rounded text-zinc-400 hover:text-gray-50 font-bold transition-all group flex items-center gap-2 disabled:opacity-50">
          <div className="group-hover:animate-pulse">💣</div>
          SMAZAT MÍSTNOST
        </button>
      </header>
    </main>
  )
}

export default Page