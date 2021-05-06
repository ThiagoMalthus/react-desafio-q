import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faComments, faEnvelope, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle,faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function Breadcrumb(props) {
  return (
    <nav className="breadcrumb">
      <FontAwesomeIcon icon={faChevronLeft}/> {props.page}
    </nav>
  );
}

export default Breadcrumb;