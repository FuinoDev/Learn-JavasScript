import type { Role } from "../generated/prisma/client.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string | null;
        role: Role;
        emailVerified: boolean;
        isActive: boolean;
        createdAt: Date;
      };
      sessionToken?: string;
    }
  }
}

export {};
