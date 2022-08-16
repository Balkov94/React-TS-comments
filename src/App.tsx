
import BlogForm from './Components/MainForm/MainForm';
import Header from './Components/Header/Header';
import style from "./app.module.css"
import Footer from './Components/Footer/Footer';
// add here all components composition 

function App() {
     return (
          <div className={style.mainAppDiv}>
               <Header></Header>
               <BlogForm></BlogForm>  
               <Footer></Footer>       
          </div>

     );
}

export default App;



