import TopBar from "./TopBar"//immportacion del topbar
import Menu from "./Menu";
export default function Header() {
  return (
    <div className="header">
      <TopBar/>
      <Menu/> 
    </div>
  )
}