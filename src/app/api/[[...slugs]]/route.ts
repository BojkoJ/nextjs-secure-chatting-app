import { redis } from '@/lib/redis'
import { Elysia } from 'elysia'
import { nanoid } from 'nanoid'

// Elysia je jako hono.js nebo express.js, ale mnohem rychlejší.
// Aby to bylo ale end-to-end typesafe - tzn. i na frontendu, je třeba ještě EDEN, což je obdoba tRPC, ale více lightweight

const ROOM_TTL_SECONDS = 60 * 15 // 15 min

const rooms = new Elysia({prefix: "/room"})
    .post("/create", async () => {
        const roomId = nanoid()

        // po vygenerování roomId se chceme napojit na Redis (hostovaný na Upstash)

        // hset - jako "set hash", meta protože ukládáme roomId jako metadata
        await redis.hset(`meta:${roomId}`, {
            connected: [], // kteří useři jsou aktuálně připojení do chatRoomky
            createdAt: Date.now()
        })

        //self-destruction místnosti:
        // redis expiruje, `meta:${roomId}` slouží jako klíč pro redis, který říká, která data mají expiraci
        await redis.expire(`meta:${roomId}`, ROOM_TTL_SECONDS)

        return { roomId }
    })

export const app = new Elysia({ prefix: '/api' }).use(rooms)

export type App = typeof app

export const GET = app.fetch 
export const POST = app.fetch 