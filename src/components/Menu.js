import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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