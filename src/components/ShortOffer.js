import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle,faChevronDown } from '@fortawesome/free-solid-svg-icons';

function ShortOffer(props) {
  return (
  <article className="shortOffer">
    <div>
      <input
      name="isGoing"
      type="checkbox"/>
      <img src="https://www.tryimg.com/u/2019/04/16/unicsul.png"/>
    </div>
    <div>
      <div>
        <h2>
          Administração
        </h2>
        <h6>
          Bacharelado
        </h6>
      </div>
      <div>
        <div>
          <span>Bolsa de</span> <em>50%</em>
        </div>
        <em>R$ 374/mês</em>
      </div>
    </div>
    </article>
  );
}

export default ShortOffer;