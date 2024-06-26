import { useUsernameContext } from "@/components/context/usernameContext";
import { syncEmailDatabase } from "@/firestore/Data";
import { userDataAccount } from "@/pages/myaccount";
import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

type MenuAccountInfoProps = {
  userDataAccount: userDataAccount;
};
const MenuAccountInfo = ({ userDataAccount }: MenuAccountInfoProps) => {
  // INPUTMAIL REF
  const { username } = useUsernameContext();
  const [isVisibleAccountInfo, setIsVisibleAccountInfo] = useState(false);
  const [isModifyingEmail, setIsModifyingEmail] = useState(false);
  const [mail, setMail] = useState(userDataAccount.email);
  function handleClickValidateButton() {
    console.log("test");
    console.log(username);
    syncEmailDatabase(mail, username);
    setIsModifyingEmail(false);
  }
  return (
    <div className="account-info-container">
      <div
        className="titledropdown account-info"
        onClick={() => {
          setIsVisibleAccountInfo(!isVisibleAccountInfo);
        }}
      >
        {isVisibleAccountInfo ? <FaArrowUp /> : <FaArrowDown />}
        <h2>Mes informations</h2>
      </div>
      {isVisibleAccountInfo && (
        <ul>
          <li>
            <h4>Date de création du compte :</h4>
            <span>{userDataAccount.accountCreatedAt}</span>
          </li>
          <li>
            <h4>Mon e-mail :</h4>
            {!isModifyingEmail ? (
              <div>
                <span>{mail}</span>
                <button
                  onClick={() => {
                    setIsModifyingEmail(true);
                    // inputEmailRef.current.focus();
                  }}
                >
                  Modifier
                </button>
              </div>
            ) : (
              <form onSubmit={handleClickValidateButton}>
                <input
                  type="email"
                  onChange={(e) => setMail(e.target.value)}
                  value={mail}
                  required
                  // ref={inputEmailRef}
                />
                <button>Valider</button>
              </form>
            )}
          </li>
          <li>
            <h4>Mon pseudo :</h4>
            <span>{username}</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default MenuAccountInfo;
