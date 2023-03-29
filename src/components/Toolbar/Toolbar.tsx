import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { NavLink } from "react-router-dom";
import { getLeftToolbar } from "../../Helper";

const Toolbar = () => {
  //pretpostavka je da isAuthenticated i prevlacim iz authState, ovde mi je najznacajninja rola
  //a za sad cu ih rucno napraviti
  let isAuthenticated = true; //ovo ce biti ako je token razlicit od null koji cu sacuvati u redux
  let userType = "client"; //a uzimacu ga iz reducera

  //const authState = useSelector((state: state) => state.auth);

  let leftToolbar: ReactJSXElement = getLeftToolbar(userType);

  return (
    <nav className="Toolbar">
      <div className="Toolbar_left">{leftToolbar}</div>
      <div className="Toolbar_right">
        <ul>
          {/* OVO OSTAJE OVAKO SAMO PRILAGODII PRAVIM INFORMACIJAMA  jeidno sto ne znam moze li 
          autentifikacija uopste tj ne treba jer ona ni ne moze ako nije autentifikovan*/}
          {/* <li>
            {authState["token"] === null ? (
              null
            ) : (
              <button onClick={handleClickAccount}>
                {authState["user"]["first_name"] +
                  " " +
                  authState["user"]["last_name"]}
                <img
                  src={avatar}
                  alt=""
                  style={{
                    verticalAlign: "text-top",
                    width: "20px",
                    marginLeft: "5px",
                    borderRadius: "50%",
                  }}
                />
              </button>
            )}
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
