
import BlogForm from './Components/BlogForm/BlogForm';
import Header from './Components/Header/Header';
import style from "./app.module.css"
// add here all components composition 

function App() {
     return (
          <div className={style.mainAppDiv}>
               <Header></Header>
               <BlogForm></BlogForm>         
          </div>

     );
}

export default App;
