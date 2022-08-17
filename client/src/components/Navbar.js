import { NavLink, useHistory } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../context/user";

function Navbar(){
  const history = useHistory();
  const { user, setUser } = useContext(UserContext)

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE'
    })
    .then((res) => {
      if (res.ok) {
        setUser(null);
        history.push('/');
      }
    });
  };

  return (
    <div>
      <nav>
         
            <div>

              { user ? 
                <>
                  <NavLink to={user.admin ? `/professors/${user.id}/courses` : `/students/${user.id}/courses`}>
                    <p><span>My Courses</span></p>
                  </NavLink>

                  <NavLink to='/logout' onClick={ handleLogout }>
                    <p><span>Logout</span></p>
                  </NavLink>

                  {user.first_name}
                </>
                    :
                ""
              }

            </div> 

        </nav>
    </div>
  );
};

export default Navbar;