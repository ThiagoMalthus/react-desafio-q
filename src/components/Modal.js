import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';

class Modal extends Component {

  constructor(props) {
    super(props);
    let offers = this.getOffers();
    let favorites = this.getFavorites();
    let favoriteOffers = this.getFavOffers(offers,favorites);
    let cities = this.getCities(favoriteOffers);
    let courses = this.getCourses(favoriteOffers);
    let maxPay = this.getMaxPayment(offers);
    this.state = {
      offers: offers,
      favorites: favorites,
      favoriteOffers: favoriteOffers,
      cities: cities,
      courses: courses,
      maxPayment: maxPay[0],
      minPayment: maxPay[1],
      filteredOffers: favoriteOffers,
      city: "vazio",
      course: "vazio",
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

  getCities(offers){
    let cities = [];
    offers.forEach(offer => {
      if (cities.indexOf(offer.campus.city) === -1) {
        cities.push(offer.campus.city);
      }
    });
    cities.sort();
    return cities
  }

  getMaxPayment(offers){
    let maxPay = [];
    offers.forEach(offer => {
      if (maxPay.indexOf(offer.price_with_discount) === -1) {
        maxPay.push(offer.price_with_discount);
      }
    });
    let max = 0;
    let min = 100000;
    maxPay.forEach((pay)=>{
      if (pay>max) {
        max = pay;
      }
      if (pay<min) {
        min = pay;
      }
    })
    max=max+10;
    min=min-10;
    return [max,min];
  }

  getCourses(offers){
    let courses = [];
    offers.forEach(offer => {
      if (courses.indexOf(offer.course.name) === -1) {
        courses.push(offer.course.name);
      }
    });
    courses.sort();
    return courses
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
    this.smoothscroll();
    document.getElementById("modalOverlay").classList.add("fadeout");
    setTimeout(() => {  
      window.location.reload();
    }, 1000);

  }

  closeModal(){
    document.getElementById("modalOverlay").classList.add("inactive");
  }

  smoothscroll(){
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  onChangeFilter(e){
    this.setState({ [e.target.name]: e.target.value})
    this.offerFilter(e.target.name,e.target.value);
      
  }

  offerFilter(name,value){
    let city = document.getElementById("cityFilter").value;
    let course = document.getElementById("courseFilter").value;
    let maxPayment = document.getElementById("maxPaymentFilter").value;
    let presential = document.getElementById("presential").checked;
    let distant = document.getElementById("distant").checked;

    let filtered = [];
    if (city==="vazio") {
      filtered = this.state.favoriteOffers
    }else{
      filtered = this.state.favoriteOffers.filter(o => o.campus.city === city)
    }
    console.log(this.state.favoriteOffers);
    if (course !== "vazio") {
      filtered = filtered.filter(o => o.course.name === course)
    }
    if (maxPayment !== "vazio") {
      filtered = filtered.filter(o => o.price_with_discount <= maxPayment)
    }
    if (presential === true && distant === false){
      filtered = filtered.filter(o => o.course.kind === "Presencial")
    }
    if (presential === false && distant === true){
      filtered = filtered.filter(o => o.course.kind === "EaD")
    }
    
    this.setState({ filteredOffers: filtered})
  }
    
  

render() {

  var max = this.getMaxPayment(this.state.offers);

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
                  <select id="cityFilter" name="city" value={this.state.city} onChange={this.onChangeFilter}>
                    <option value="vazio"></option>
                    {this.state.cities.map(city => (
                      <option value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </label>
              <label>
                <h5>SELECIONE O CURSO DE SUA PREFERÊNCIA</h5>
                <div className="formField">
                  <select id="courseFilter" name="course" value={this.state.course} onChange={this.onChangeFilter}>
                      <option value="vazio"> </option>
                      {this.state.courses.map(course => (
                        <option value={course}>{course}</option>
                      ))}
                  </select>
                </div>
              </label>
              <label>
                <h5>COMO VOCÊ QUER ESTUDAR?</h5>
                <label>
                  <input
                  id="presential"
                  name="presential"
                  type="checkbox" onChange={this.onChangeFilter}/> Presencial
                </label>
                <label>
                  <input
                  id="distant"
                  name="distant"
                  type="checkbox" onChange={this.onChangeFilter}/> Distancia
                </label>
              </label>
              <label>
                <h5>ATÉ QUANTO PODE PAGAR?</h5>
                <span>R$ {this.state.maxPayment}</span>
                <input type="range" min={max[1]-1} max={max[0]+1} className="slider" id="maxPaymentFilter"  name="maxPayment" defaultValue={max[0]+10} onChange={this.onChangeFilter}/>
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
              {this.state.filteredOffers.map(offer => (
                <article className="shortOffer" key={offer.id} onClick={() => this.changeFavored(offer.id)}>
                <div>
                  <input
                  id={"f"+offer.id}
                  name="favorited"
                  type="checkbox"
                  checked={offer.favorited}
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