import {useState} from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


export default function Auth(props) {
    const {onCloseModal,setTitleModal}=props;
    const [ShowLogin, setShowLogin] = useState(true);

    const showLoginForm=()=>{
      setTitleModal("Acceder")
      setShowLogin(true);
    };
    const showRegisterForm=()=>{
      setTitleModal("Registrate"),
      setShowLogin(false);
    };

  return ShowLogin ? <LoginForm showRegisterForm={showRegisterForm} onCloseModal={onCloseModal}/>:<RegisterForm showLoginForm={showLoginForm}/>;
}
