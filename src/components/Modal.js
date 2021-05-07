import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';

class Modal extends Component {

  constructor(props) {
    super(props);
    let offers = this.getOffers();
    let favorites = this.getFavorites();
    let favoriteOffers = this.getFavOffers(offers,favorites);
    this.state = {
      offers: offers,
      favorites: favorites,
      favoriteOffers: favoriteOffers,
    };
  }
  
  getOffers(){
    let base = require('../db.json');
    console.log(base);
    let offers = [];
    let n = 1;
    let arr = [];
    base.forEach(offer=>{
      arr=offer;
      arr.id=n;
      n=n+1;
      offers.push(arr);
    });
    return offers;
  }

  getFavorites(){
    let favorites = JSON.parse(window.localStorage.getItem('favorites'));
    return favorites;
  }

  getFavOffers(offers,favorites){
    let favoriteOffers = [];
    offers.forEach(offer => {
      let arr =[];
      arr=offer;
      if (favorites.find((element => element === offer.id))) {
        arr.favorited=1;
      }else{
        arr.favorited="";
      }
      favoriteOffers.push(arr);
    });
    return favoriteOffers;
  }

  addFavtoStorage(favorites){
    window.localStorage.setItem('favorites',JSON.stringify(favorites));
  }


  changeFavored(id) {
    var teste = this.state.favoriteOffers.find(element => element.id===id)
    if (teste.favorited===1) {
      teste.favorited="";
    } else {
      teste.favorited=1;
    }
    this.setState({favoriteOffers: this.state.favoriteOffers});
  }

  saveFavored() {
    let favorites = [];
    this.state.favoriteOffers.forEach(offer=>{
      if (offer.favorited === 1) {
        favorites.push(offer.id);
      }
    })
    this.setState({favorites: favorites});
    this.addFavtoStorage(favorites);
    this.closeModal();
  }

  closeModal(){
    document.getElementById("modalOverlay").classList.add("inactive");
  }
  

render() {

  return (
    <section id="modalOverlay" className="inactive" >
      <div className="modal">
        <div className="closeIcon" onClick={() => this.closeModal()}>
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
                  <select name="select" defaultValue="valor2">
                    <option value="valor1">Valor 1</option>
                    <option value="valor2">Valor 2</option>
                    <option value="valor3">Valor 3</option>
                  </select>
                </div>
              </label>
              <label>
                <h5>SELECIONE O CURSO DE SUA PREFERÊNCIA</h5>
                <div className="formField">
                  <select name="select" defaultValue="valor2">
                    <option value="valor1">Valor 1</option>
                    <option value="valor2">Valor 2</option>
                    <option value="valor3">Valor 3</option>
                  </select>
                </div>
              </label>
              <label>
                <h5>COMO VOCÊ QUER ESTUDAR?</h5>
                <label>
                  <input
                  name="isGoing"
                  type="checkbox"/> Presencial
                </label>
                <label>
                  <input
                  name="isGoing"
                  type="checkbox"/> Distancia
                </label>
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
              {this.state.favoriteOffers.map(offer => (
                <article className="shortOffer" key={offer.id} onClick={() => this.changeFavored(offer.id)}>
                <div>
                  <input
                  id={"f"+offer.id}
                  name="favorited"
                  type="checkbox"
                  checked={offer.favorited}
                  //onChange={this.handleInputChange}
                  />
                  <img src={offer.university.logo_url} alt="logoInstituição"/>
                </div>
                <div>
                  <div>
                    <h2>
                      {offer.course.name}
                    </h2>
                    <h6>
                      {offer.course.level}
                    </h6>
                  </div>
                  <div>
                    <div>
                      <span>Bolsa de</span> <em>{offer.discount_percentage}%</em>
                    </div>
                    <em>R$ {offer.price_with_discount}/mês</em>
                  </div>
                </div>
              </article>
              ))}
              <div className="buttonBox">
              <button onClick={() => this.closeModal()}>
                <span>
                  Cancelar
                </span>
              </button>
              <button className="mainButton" onClick={() => this.saveFavored()}>
                <span>
                  Adicionar bolsa(s)
                </span>
              </button>
            </div>
            </section>
          </section>
        </div>
          
      </div>
        
    </section>
  );
}}

export default Modal;