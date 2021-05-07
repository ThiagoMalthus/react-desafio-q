import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';

class FavoriteOfferList extends Component { 
  
  constructor(props) {
    super(props);
    let offers = this.getOffers();
    let favorites = this.getFavorites();
    let favoriteOffers = this.getFavOffers(offers,favorites);
    let semesters = this.getSemesters(offers);
    this.state = {
      offers: offers,
      favorites: favorites,
      semesters: semesters,
      favoriteOffers: favoriteOffers,
    };
  }
  
  getOffers(){
    let base = require('../db.json');
    
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

  getSemesters(offers){
    let semesters = [];
    offers.forEach(offer => {
      if (semesters.indexOf(offer.enrollment_semester) === -1) {
        semesters.push(offer.enrollment_semester);
      }
    });
    return semesters
  }

  getFavorites(){
    let favorites = JSON.parse(window.localStorage.getItem('favorites'));
    return favorites;
  }

  getFavOffers(offers,favorites){
    let favoriteOffers =[];
    favorites.forEach(value => {
      favoriteOffers.push(offers.find(element => element.id === value));
    });
    return favoriteOffers;
  }

  
  removeUniqueFav(value){
    if (this.state.favorites.indexOf(value) !== -1) {
      let arr = this.state.favorites.splice(this.state.favorites.indexOf(value),1);
      arr = this.getFavOffers(this.state.offers,this.state.favorites);
      this.setState({favoriteOffers: arr});
      console.log(this.state.favorites);
      this.addFavtoStorage(this.state.favorites);
    }
  }
  
  

  addFavtoStorage(favorites){
    window.localStorage.setItem('favorites',JSON.stringify(favorites));
  }

render() {
  //Abre Modal
  function openModal(){
    document.getElementById("modalOverlay").classList.remove("inactive");
  }
  
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
          {this.state.semesters.map(semester=>(
              <button key={semester}>
                {semester.slice(5,7)}º semestre de {semester.slice(0,4)}
               </button>
          ))}
        </div>

        <div className="boxContent" onClick={openModal}>
          <FontAwesomeIcon icon={faPlusCircle} className='icon'/>
          <h2>Adicionar bolsa</h2>
          <p>Clique para adicionar bolsas de <br/>cursos do seu interesse</p>
        </div>

        <div className="longOfferList">
          {this.state.favoriteOffers.map(offer=>(
            <article className="longOffer" key={offer.id}>
            <div>
              <img src={offer.university.logo_url} alt={offer.university.name}/>
              <h3>
                {offer.university.name}
              </h3>
              <h4>
                {offer.course.name}
              </h4>
              <p className="rateBox">
                <span className="rateText">{offer.university.score}</span> [estrelas]
              </p>
            </div>
            <div>
              <h3>
              {offer.course.kind} . {offer.course.shift}
              </h3>
              <p>
                Início das aulas em: {offer.start_date}
              </p>
            </div>
            <div>
              <h5>
                Mensalidade com o Quero Bolsa:
              </h5>
              <p className='fullPrice'>
                R$ {offer.full_price}
              </p>
              <p>
                <span className="priceWithDiscount">
                  R$ {offer.price_with_discount}
                </span>/mês
              </p>
            </div>
            <div className="buttonBox">
              <button onClick={() => this.removeUniqueFav(offer.id)}>
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
        ))}
        </div>

      </section>
      
      
    </main>
  );
}}

export default FavoriteOfferList;