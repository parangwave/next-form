import { PrismaClient } from "@prisma/client";

// client 사용을 위해 초기화
const db = new PrismaClient();

export default db;
