// src/features/auth/types.ts
export interface AuthFormData {
    email: string;
    password: string;
    name?: string; 
  }
  
  export type AuthMode = 'login' | 'register';