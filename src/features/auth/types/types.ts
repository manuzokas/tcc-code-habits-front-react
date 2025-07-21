// src/features/auth/types.ts
export interface AuthFormData {
    email: string;
    password: string;
    name?: string; // Opcional para registro
  }
  
  export type AuthMode = 'login' | 'register';