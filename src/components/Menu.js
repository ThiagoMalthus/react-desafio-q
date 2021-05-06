import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle,faChevronDown } from '@fortawesome/free-solid-svg-icons';

function Menu(props) {
  return (
    <nav className="menu">
       <ul>
           <li>
               {props.page}
           </li>
           <li>
               Menu <FontAwesomeIcon icon={faChevronDown} className='icon'/>
           </li>
       </ul>
    </nav>
  );
}

export default Menu;