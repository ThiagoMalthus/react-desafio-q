
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';
import FavoriteOfferList from './components/FavoriteOfferList';
import Modal from './components/Modal';

function App() {
  var page="Minha Conta";
  return (
    <section>
      <Header/>
      <Menu page={page}/>
      <Breadcrumb page={page}/>
      <FavoriteOfferList/>
      <Footer/>
      <Modal/>
    </section>
  );
}

export default App;
