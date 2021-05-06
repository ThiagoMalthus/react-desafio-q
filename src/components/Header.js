import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header >
        <div className='iconBox'>
            <FontAwesomeIcon icon={faInfoCircle} className='icon'/>
            <p>Ajuda</p>
        </div>
        <div className='logo'>
            <img src='/logo-querobolsa.svg'/>
        </div>
        <div className='iconBox'>
            <div>
              <FontAwesomeIcon icon={faUserCircle}/>
            </div>
            <p>Conta</p>
        </div>
    </header>
  );
}

export default Header;