import { useContext } from "react";
import AuthContext from "../context/AuthContext";

//nueva version de expportacion de next js
// const useAuth = () => useContext(AuthContext);
// export default useAuth;
const useAuth = () => useContext(AuthContext);

export default useAuth;
