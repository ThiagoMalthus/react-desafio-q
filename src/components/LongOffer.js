import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faComments, faEnvelope, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle,faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function LongOffer() {
  return (
    <article className="longOffer">
      <div>
        <img src="https://www.tryimg.com/u/2019/04/16/unicsul.png"/>
        <h3>
          CRUZEIRO DO SUL
        </h3>
        <h4>
          Arquitetura e Urbanismo
        </h4>
        <p className="rateBox">
          <span className="rateText">3.8</span> [estrelas]
        </p>
      </div>
      <div>
        <h3>
          Presencial . Noite
        </h3>
        <p>
          Início das aulas em: 01/08/2019
        </p>
      </div>
      <div>
        <h5>
          Mensalidade com o Quero Bolsa:
        </h5>
        <p className='fullPrice'>
          R$ 1.487,31
        </p>
        <p>
          <span className="priceWithDiscount">
            R$ 453,63
          </span>/mês
        </p>
      </div>
      <div className="buttonBox">
        <button>
          <span>
            Excluir
          </span>
        </button>
        <button className="mainButton">
          <span>
            Ver oferta
          </span>
        </button>
      </div>
    </article>
  );
}

export default LongOffer;