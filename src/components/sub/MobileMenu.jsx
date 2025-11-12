import React from 'react';
import '../../assets/styles/MobileMenu.css';
import { Link } from 'react-router-dom';
import Accounticon from '../../assets/images/Accounts  2.png';
import Chaticon from '../../assets/images/Chatwithstore19201.png';
import Carticon from '../../assets/images/addtocartnotadded-black.png';

const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const MobileMenu = ({
  isOpen,
  closeMobileMenu,
  categories,
  user,
  userDropdownOpen,
  setUserDropdownOpen,
  setSignInOpen,
  handleSignOut,
  handleCategoryHover,
  closeUserDropdown
}) => {
  return (
    <div
      className={`mobile-menu-unique__overlay ${isOpen ? 'mobile-menu-unique__overlay--open' : ''}`}
      onClick={closeMobileMenu}
      aria-hidden={!isOpen}
    >
      <nav
        className="mobile-menu-unique__content"
        onClick={(e) => e.stopPropagation()}
        aria-label="Mobile Navigation Menu"
      >
        {/* Close Button */}
        <button
          className="mobile-menu-unique__close-btn"
          onClick={closeMobileMenu}
          aria-label="Close Menu"
          type="button"
        >
          &times;
        </button>

        <ul className="mobile-menu-unique__list" role="menu">
          <li className="mobile-menu-unique__item" role="none">
            <a
              href="#"
              role="menuitem"
              onClick={closeMobileMenu}
              className="mobile-menu-unique__link"
            >
              Best Rated
            </a>
          </li>
          <li className="mobile-menu-unique__item" role="none">
            <a
              href="#"
              role="menuitem"
              onClick={closeMobileMenu}
              className="mobile-menu-unique__link"
            >
              5-Star Rated
            </a>
          </li>
          <li className="mobile-menu-unique__categories-title" aria-hidden="true">
            Categories
          </li>

          {Array.isArray(categories) &&
            categories.map((cat) => (
              <li
                key={cat.id}
                className="mobile-menu-unique__item mobile-menu-unique__category-item"
                role="menuitem"
                tabIndex={0}
                onClick={() => {
                  handleCategoryHover(cat.id);
                  closeMobileMenu();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCategoryHover(cat.id);
                    closeMobileMenu();
                  }
                }}
              >
                {decodeHtml(cat.name)}
              </li>
            ))}
        </ul>

        <div className="mobile-menu-unique__bottom-section">
          {user ? (
            <div
              className="mobile-menu-unique__account-logged-in-footer"
              title={`Hi, ${user?.name || 'User'}`}
            >
              <button
                className="mobile-menu-unique__account-logged-in-footer-trigger"
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                aria-expanded={userDropdownOpen}
                aria-controls="mobile-user-dropdown-footer"
                aria-haspopup="true"
              >
                <div className="mobile-menu-unique__avatar">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user?.name || 'User'}
                      className="mobile-menu-unique__avatar-img"
                    />
                  ) : (
                    <div className="mobile-menu-unique__avatar-fallback">
                      {(user?.name?.charAt(0)?.toUpperCase()) || 'U'}
                    </div>
                  )}
                </div>
                <span className="mobile-menu-unique__account-logged-in-text">
                  Hi, {user?.name || 'User'}
                </span>
                <span
                  className={`mobile-menu-unique__dropdown-arrow ${
                    userDropdownOpen ? 'open' : ''
                  }`}
                >
                  ▾
                </span>
              </button>

              {userDropdownOpen && (
                <ul
                  id="mobile-user-dropdown-footer"
                  className="mobile-menu-unique__user-dropdown-footer"
                  role="menu"
                >
                  <li role="none">
                    <a
                      href="/orders"
                      role="menuitem"
                      onClick={() => {
                        closeUserDropdown();
                        closeMobileMenu();
                      }}
                    >
                      Your Orders
                    </a>
                  </li>
                  <li role="none">
                    <a
                      href="/reviews"
                      role="menuitem"
                      onClick={() => {
                        closeUserDropdown();
                        closeMobileMenu();
                      }}
                    >
                      Your Reviews
                    </a>
                  </li>
                  <li role="none">
                    <a
                      href="/profile"
                      role="menuitem"
                      onClick={() => {
                        closeUserDropdown();
                        closeMobileMenu();
                      }}
                    >
                      Your Profile
                    </a>
                  </li>
                  <li role="none">
                    <a
                      href="/coupons"
                      role="menuitem"
                      onClick={() => {
                        closeUserDropdown();
                        closeMobileMenu();
                      }}
                    >
                      Coupons & Offers
                    </a>
                  </li>
                  <li role="none">
                    <a
                      href="/notifications"
                      role="menuitem"
                      onClick={() => {
                        closeUserDropdown();
                        closeMobileMenu();
                      }}
                    >
                      Notifications
                    </a>
                  </li>
                  <li role="none">
                    <a
                      href="/history"
                      role="menuitem"
                      onClick={() => {
                        closeUserDropdown();
                        closeMobileMenu();
                      }}
                    >
                      Browse History
                    </a>
                  </li>
                  <li role="none">
                    <button
                      onClick={() => {
                        handleSignOut();
                        closeUserDropdown();
                        closeMobileMenu();
                      }}
                      className="mobile-menu-unique__signout-btn-footer"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <button
              className="mobile-menu-unique__account-footer"
              onClick={() => {
                setSignInOpen(true);
                closeMobileMenu();
              }}
              aria-label="Open Sign In/Register"
            >
              <img
                src={Accounticon}
                alt="Profile Icon"
                className="mobile-menu-unique__icon-small"
              />
              <div className="mobile-menu-unique__account-text-footer">
                <div className="mobile-menu-unique__account-main-footer">
                  Sign In / Register
                </div>
                <div className="mobile-menu-unique__account-sub-footer">
                  Account & Orders
                </div>
              </div>
            </button>
          )}

          <div
            className="mobile-menu-unique__support-cart-footer"
            role="group"
            aria-label="Support and Cart"
          >
            <Link
              to="/support"
              className="mobile-menu-unique__support-footer"
              aria-label="Support"
            >
              <img
                src={Chaticon}
                alt="Support Icon"
                className="mobile-menu-unique__icon-small"
              />
              <span>Support</span>
            </Link>

            <Link
              to="/cart"
              className="mobile-menu-unique__cart-footer"
              aria-label="Cart"
            >
              <img
                src={Carticon}
                alt="Cart Icon"
                className="mobile-menu-unique__icon-cart"
              />
              <span>Cart</span>
            </Link>
          </div>

          <div className="mobile-menu-unique__bottom-links">
            <a
              href="/terms"
              className="mobile-menu-unique__bottom-link"
              tabIndex={isOpen ? 0 : -1}
            >
              Terms & Conditions
            </a>
            <a
              href="/privacy"
              className="mobile-menu-unique__bottom-link"
              tabIndex={isOpen ? 0 : -1}
            >
              Privacy Policy
            </a>
            <a
              href="/help"
              className="mobile-menu-unique__bottom-link"
              tabIndex={isOpen ? 0 : -1}
            >
              Help
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
