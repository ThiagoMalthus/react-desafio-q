import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faComments, faEnvelope, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle,faChevronDown } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer>
        <div className="item">
          <div className="iconBox">
            <FontAwesomeIcon icon={faWhatsapp} className='icon'/>
          </div>
          <div className="textBox">
              0800 123 2222
            <span>
              Segunda a sexta de 8 às 22h
            </span>
          </div>
        </div>
        <div className="itemGroup">
          <div className="item">
            <div className="iconBox">
            <FontAwesomeIcon icon={faComments} className='icon'/>
            </div>
            <div className="textBox">
              Chat
            </div>
          </div>
          <div className="item">
            <div className="iconBox">
              <FontAwesomeIcon icon={faEnvelope} className='icon'/> 
            </div>
            <div className="textBox margem">
              E-mail
            </div>
          </div>
          <div className="item">
            <div className="iconBox">
              <FontAwesomeIcon icon={faInfoCircle} className='icon'/>
            </div>
            <div className="textBox">
              Ajuda
            </div>
          </div>
        </div>
       <div className='copyright'>Feito com <FontAwesomeIcon icon={faHeart}/> pela Quero Educação</div>
    </footer>
  );
}

export default Footer;