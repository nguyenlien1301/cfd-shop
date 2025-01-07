import { MODAL_TYPES } from "@/constants/general";
import { PATHS } from "@/constants/paths";
import { handleLogout, handleShowModal } from "@/store/reducer/authReducer";
import tokenMethod from "@/utils/token";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const HeaderTop = () => {
  // const { handleShowModal, handleLogout, profile } = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { firstName, email, whiteList } = profile || {};
  const _onShowAuthModal = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    // handleShowModal?.(MODAL_TYPES.login);
    dispatch(handleShowModal(MODAL_TYPES.login));
  };
  const _onSignOut = (e) => {
    e.preventDefault();
    // handleLogout();
    dispatch(handleLogout());
    navigate(PATHS.HOME);
  };

  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:0989596912">
            <i className="icon-phone" /> Hotline: 098 9596 912{" "}
          </a>
        </div>
        <div className="header-right">
          {!!!tokenMethod.get() ? (
            <>
              {/* Not LogIn */}
              <ul className="top-menu top-link-menu">
                <li>
                  <a
                    href="#signin-modal"
                    // data-toggle="modal"
                    className="top-menu-login"
                    onClick={_onShowAuthModal}
                  >
                    <i className="icon-user"></i>Login | Resgister{" "}
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <>
              {/* Logged In */}
              <ul className="top-menu">
                <li>
                  <div className="top-link-menu">
                    <i className="icon-user" />
                    {firstName || email || "Guest"}{" "}
                  </div>
                  <ul>
                    <li>
                      <ul>
                        <li>
                          <Link to={PATHS.PROFILE.INDEX}>Account Details</Link>
                        </li>
                        <li>
                          <Link to={PATHS.PROFILE.PROFILE_ORDER}>
                            Your Orders
                          </Link>
                        </li>
                        <li>
                          <Link to={PATHS.PROFILE.PROFILE_WISHLIST}>
                            Wishlist <span> ({whiteList?.length || 0})</span>
                          </Link>
                        </li>
                        <li>
                          <a to="#" onClick={_onSignOut}>
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
