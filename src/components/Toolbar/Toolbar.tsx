import { getLeftToolbar } from "../../helpers/toolbarProvider";
import { ToolbarProps, User } from "../../interfaces";
import { useAppSelector } from "../../app/hooks";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const Toolbar: React.FC<ToolbarProps> = ({ handleClickAccount }) => {

  const user: User | any = useAppSelector(state => state.user)

  function leftToolbar() {
    if (user.userData.userType) {
      return getLeftToolbar(user.userData.userType.userTypeName)
    } return ''
  }

  return (
    <nav className="Toolbar">
      <div className="Toolbar_left">{leftToolbar()}</div>
      <div className="Toolbar_right">
        <ul>
          <li>
            <button onClick={handleClickAccount}>
              <AssignmentIndIcon style={{ color: '#19467c' }} />
              {user.userData["firstName"] +
                " " +
                user.userData["lastName"]}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
