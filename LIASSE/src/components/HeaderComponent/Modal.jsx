import React, { useState } from "react";
import styles from "./Popup.module.scss";

const Modal = () => {

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      {open && (<form className={styles.modal}>
          <div onClick={toggleModal} className={styles.overlay_pop}></div>
          <div className={styles.modal_Cot}>
            <h2>Se connecter</h2>
            <div className={styles.upload_pop}>
                    <input
                        className={styles.input_pop}
                        type="Email"
                        placeholder="Email"
                        autoComplete="on"
                        maxLength={80}
                        id="email"
                    />
                    <input
                        className={styles.input_pop}
                        type="password"
                        placeholder="Mot de passe"
                        autoComplete="on"
                        maxLength={50}
                        id="password"  
                    />
                </div>
                <div className={styles.container_pop}>
                <button className={styles.btn_pop} type='submit'>Se connecter</button>
            </div>
            <button className={styles.close_icon} onClick={toggleModal}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="18" y1="6" x2="6" y2="18" />
  <line x1="6" y1="6" x2="18" y2="18" />
</svg>
            </button>
          </div>
    </form>)}
    </>
  );
};

export default Modal;