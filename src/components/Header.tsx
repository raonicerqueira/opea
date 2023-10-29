import "../styles/components/header.scss";

import LogoOpea from "../img/logo-opea.svg";
import IconUser from "../img/icon-user.svg";

export default function Header() {
  return (
    <header>
      <div>
        <img id="opea-logo" src={LogoOpea} alt="Opea Logo" />
        <div id="user-area">
          <p>Nome do Usuário</p>
          <img id="user-icon" src={IconUser} alt="Ícone do Usuário" />
        </div>
      </div>
    </header>
  );
}
