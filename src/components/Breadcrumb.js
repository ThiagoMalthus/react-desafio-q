import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function Breadcrumb(props) {
  return (
    <nav className="breadcrumb">
      <FontAwesomeIcon icon={faChevronLeft}/> {props.page}
    </nav>
  );
}

export default Breadcrumb;