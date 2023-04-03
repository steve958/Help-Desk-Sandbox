import { getLeftToolbar } from "../../helpers/Helper";
import { useSelector } from "react-redux";
import { state } from "../../main";
import { ToolbarProps } from "../../interfaces";

const Toolbar: React.FC<ToolbarProps> = ({ handleClickAccount }) => {
  const authState = useSelector((state: state) => state.auth);

  let leftToolbar: JSX.Element = getLeftToolbar(
    // authState["user"]["userType"]["userTypeName"]
    "Client"
  );

  return (
    <nav className="Toolbar">
      <div className="Toolbar_left">{leftToolbar}</div>
      <div className="Toolbar_right">
        <ul>
          <li>
            {authState["token"] === null ? null : (
              <button onClick={handleClickAccount}>
                {authState["user"]["firstName"] +
                  " " +
                  authState["user"]["lastName"]}
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
