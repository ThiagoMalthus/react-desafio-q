import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ShortOffer from './ShortOffer'

function Modal() {
  return (
    <section id="modalOverlay">
      <div className="modal">
        
        <div className="closeIcon">
          <section className="content">
            <FontAwesomeIcon icon={faTimes} className='icon'/>
          </section>
        </div>
        <div className="modalBox">
          <section className="content">
            <h1>
              Adicionar Bolsa
            </h1>
            <p>
              Filtre e adicione as bolsas de seu interesse.
            </p>
            <form>
              <label>
                <h5>SELECIONE SUA CIDADE</h5>
                <div className="formField">
                  <select name="select">
                    <option value="valor1">Valor 1</option>
                    <option value="valor2" selected>Valor 2</option>
                    <option value="valor3">Valor 3</option>
                  </select>
                </div>
              </label>
              <label>
                <h5>SELECIONE O CURSO DE SUA PREFERÊNCIA</h5>
                <div className="formField">
                  <select name="select">
                    <option value="valor1">Valor 1</option>
                    <option value="valor2" selected>Valor 2</option>
                    <option value="valor3">Valor 3</option>
                  </select>
                </div>
              </label>
              <label>
                <h5>COMO VOCÊ QUER ESTUDAR?</h5>
                <input
                  name="isGoing"
                  type="checkbox"/> Presencial
                <input
                  name="isGoing"
                  type="checkbox"/> Distancia
              </label>
              <label>
                <h5>ATÉ QUANTO PODE PAGAR?</h5>
                <span>R$ 10.000</span>
                <input type="range" min="1" max="10000" className="slider" id="myRange"></input>
              </label>
            </form>
            <div className="orderLabel">
              <div>
                <h6>
                  Resultado:
                </h6>
              </div>
              <div>
                <h6>
                  Ordenar por
                </h6>
              </div>
            </div>
            <div className="orderLabel">
              <div>
                <h2>
                  Nome da Faculdade <FontAwesomeIcon icon={faChevronDown}/>
                </h2>
              </div>
            </div>
            <section className="offerList">
              <ShortOffer/>
              <ShortOffer/>
            </section>
          </section>
        </div>
          
      </div>
        
    </section>
  );
}

export default Modal;