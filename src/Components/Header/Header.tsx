
import styles from "./Header.module.css";

function Header() {
     return (
          <header className={styles.header}>
               <h1>TypeScript + ReactJS comments project
               <img src={require('./chat.png')}  alt="Logo" />
               </h1>
          </header>
     );
}

export default Header;

