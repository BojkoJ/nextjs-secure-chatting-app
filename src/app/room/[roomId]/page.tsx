"use client"

import { Check, Copy, Send } from "lucide-react"
import { useParams } from "next/navigation"
import { useRef, useState } from "react"

const formatTimeRemaining = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return `${mins}:${secs.toString().padStart(2, "0")}`
}

const Page = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [input, setInput] = useState<string>("")

  const inputRef = useRef<HTMLInputElement>(null)

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

      {/* space for messages to live */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">

      </div>

      {/* message input bar*/}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
        <div className="flex gap-4">
          <div className="flex-1 relative group">
            <span className="absolute left-4 top-1/2 font-black -translate-y-1/2 text-green-500">{">"}</span>
            <input value={input}
              className="w-full bg-black border-zinc-800 focus:border-zinc-700 focus:outline-none transition-colors text-zinc-100 placeholder:text-zinc-700 py-3 pl-9 pr-4 text-sm"
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  // TODO: SEND MESSAGE

                  inputRef.current?.focus()
                }
              }}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              placeholder="Vaše zpráva..."
            />
          </div>

          <button className="bg-zinc-800 text-zinc-400 px-6 text-sm font-bold hover:text-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </main>
  )
}

export default Page