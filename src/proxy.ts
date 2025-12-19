import { NextRequest, NextResponse } from "next/server"
import { redis } from "./lib/redis"
import { nanoid } from "nanoid"

export const proxy = async (req: NextRequest) => {
  const pathName = req.nextUrl.pathname
  const roomMatch = pathName.match(/^\/room\/([^/]+)$/)

  if (!roomMatch) return NextResponse.redirect(new URL("/?error=invalid-room-id", req.url))

  const roomId = roomMatch[1]

  const meta = await redis.hgetall<{connected: string[], createdAt: number}>(`meta:${roomId}`)

  if (!meta) return NextResponse.redirect(new URL("/?error=room-not-found", req.url))

  const existingToken = req.cookies.get("x-auth-token")?.value

  // 2 scénáře s existujícím tokenem:
  // uživateli je povolen vstup do místnosti (třeba už tam byl, jen refreshnul browser)
  if (existingToken && meta.connected.includes(existingToken)) {
    return NextResponse.next() // .next() - povolí userovi vykonat akci kterou požaduje
  }

  // uživatel nemá povoleno vstoupit (třeba už tam 2 lidi jsou)
  if (meta.connected.length >= 2) {
    // místnost je plná (2 lidi max)
    return NextResponse.redirect(new URL("/?error=room-full", req.url))
  }

  const response = NextResponse.next()
  const token = nanoid()
  response.cookies.set("x-auth-token", token, {
    path: "/", // pro každý request z celého webu bude tenhle token poslán serveru
    httpOnly: true, // ochrana před xss attackem
    secure: process.env.NODE_ENV === "production", // secure jen jestli jsme na produkci
    sameSite: "strict" // jen na tomto webu
  })

  await redis.hset(`meta:${roomId}`, {
    connected: [...meta.connected, token] // přidáme userův token do connected 
  })

  return response
}

export const config = {
  matcher: "/room/:path*" // proxy se bude dít jen na /room/*cokoliv*
}