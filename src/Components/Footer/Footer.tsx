import styles from "./Footer.module.css";


function Footer() {
     return (  
          <div className={styles.footer}>
               <p>
                    &copy; webpage created by Nikola Balkov <span>&#9978;</span>
               </p>
          </div>
     );
}

export default Footer;