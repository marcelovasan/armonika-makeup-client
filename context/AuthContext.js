import { createContext } from "react"; //para mantener estados del contexto no importa donde esta la pagina se mantiene

const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
  setReloadUser: () => null,
});

export default AuthContext;
