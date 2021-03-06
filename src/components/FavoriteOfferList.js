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
      favoriteOffersFiltred: favoriteOffers,
    };
    this.onChangeFilter = this.onChangeFilter.bind(this);
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
    let favorites = [];
    if (JSON.parse(window.localStorage.getItem('favorites'))===null) {
      this.addFavtoStorage(favorites);
    } else {
      favorites = JSON.parse(window.localStorage.getItem('favorites'));
    }
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
    var element = document.getElementById("LO"+value);
    element.classList.add("fadeout")
    setTimeout(() => {  
      if (this.state.favorites.indexOf(value) !== -1) {
        let arr = this.state.favorites.splice(this.state.favorites.indexOf(value),1);
        arr = this.getFavOffers(this.state.offers,this.state.favorites);
        this.setState({favoriteOffers: arr});
        this.addFavtoStorage(this.state.favorites);
        window.location.reload();
      }
    }, 300);
  }
  
  chooseButton(enabled){
    let button;
    if (enabled === true) {
      button = <button className="mainButton"><span>Ver oferta</span></button>;
    } else {
      button = <button className="inactiveButton"><span>Indispon??vel</span></button>;
    }
    return button;
  }

  addFavtoStorage(favorites){
    window.localStorage.setItem('favorites',JSON.stringify(favorites));
  }
















  onChangeFilter(e){
    let options = document.getElementsByClassName("semesterOptions");
    let filtered = [];
    Array.from(options).forEach((el) => {
      el.classList.remove("active");
    });
    document.getElementById(e.target.id).classList.add("active");

    if (document.getElementById(e.target.id).value === "todos"){
      filtered = this.state.favoriteOffers;
    } else {
      filtered = this.state.favoriteOffers.filter(o => o.enrollment_semester === document.getElementById(e.target.id).value)
    }
    this.setState({ favoriteOffersFiltred: filtered})
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
          Adicione bolsas de cursos e faculdades do seu interesse e receba atualiza????es com as melhores ofertas dispon??veis.
        </p>
        
        <div className="periodFilter">
          <button id="stodos" className="semesterOptions active" value="todos" onClick={this.onChangeFilter}>
            Todos os Semestres
          </button>
          {this.state.semesters.map(semester=>(
              <button id={"s"+semester} className="semesterOptions" key={semester} value={semester} onClick={this.onChangeFilter}>
                {semester.slice(5,7)}?? semestre de {semester.slice(0,4)}
               </button>
          ))}
        </div>

        <div className="boxContent" onClick={openModal}>
          <FontAwesomeIcon icon={faPlusCircle} className='icon'/>
          <h2>Adicionar bolsa</h2>
          <p>Clique para adicionar bolsas de <br/>cursos do seu interesse</p>
        </div>

        <div className="longOfferList">
          {this.state.favoriteOffersFiltred.map(offer=>(
            <article className="longOffer" key={offer.id} id={"LO"+offer.id}>
            <div>
              <div className="img">
                <img src={offer.university.logo_url} alt={offer.university.name}/>
              </div>
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
                In??cio das aulas em: {offer.start_date}
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
                </span>/m??s
              </p>
            </div>
            <div className="buttonBox">
              <button onClick={() => this.removeUniqueFav(offer.id)}>
                <span>
                  Excluir
                </span>
              </button>
              {this.chooseButton(offer.enabled)}
            </div>
          </article>
        ))}
        </div>

      </section>
    </main>
  );
}}

export default FavoriteOfferList;