import { AuthContextValue } from '@customTypes/auth';
import { createContext } from 'react';

export const AuthContext = createContext<AuthContextValue | null>(null);
