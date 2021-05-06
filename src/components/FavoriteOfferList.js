import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faComments, faEnvelope, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle,faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import LongOffer from './LongOffer'

function FavoriteOfferList() {
  return (
    <main>
      <section>
        <h1>
          Bolsas Favoritas
        </h1>
        <p>
          Adicione bolsas de cursos e faculdades do seu interesse e receba atualizações com as melhores ofertas disponíveis.
        </p>
        
        <div className="periodFilter">
          <button className="active">
            Todos os Semestres
          </button>
          <button>
            [semestre]º semestre de [ano]
          </button>
          <button>
            [semestre]º semestre de [ano]
          </button>
        </div>

        <div class="boxContent">
          <FontAwesomeIcon icon={faPlusCircle} className='icon'/>
          <h2>Adicionar bolsa</h2>
          <p>Clique para adicionar bolsas de <br/>cursos do seu interesse</p>
        </div>

        <div className="longOfferList">
          <LongOffer/>
        </div>

      </section>
    </main>
  );
}

export default FavoriteOfferList;