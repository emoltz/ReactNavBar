import './App.css';
import {ReactComponent as BellIcon} from "./icons/bell.svg";
import {ReactComponent as MessengerIcon} from "./icons/messenger.svg";
import {ReactComponent as CaretIcon} from "./icons/caret.svg";
import {ReactComponent as PlusIcon} from "./icons/plus.svg";
import {ReactComponent as CogIcon} from "./icons/cog.svg";
import {ReactComponent as BoltIcon} from "./icons/bolt.svg";
import {ReactComponent as ArrowIcon} from "./icons/arrow.svg";


import React, {useState, useEffect, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';


function App() {
    return (
        <Navbar>
            <NavItem icon={<PlusIcon/>}/>
            <NavItem icon={<BellIcon/>}/>
            <NavItem icon={<MessengerIcon/>}/>
            <NavItem icon={<CaretIcon/>}>
                <DropDownMenu/>
            </NavItem>
        </Navbar>
    );
}

function Navbar(props) {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                {props.children}
            </ul>
        </nav>

    );
}

function DropDownMenu() {
    const [activeMenu, setActiveMenu] = useState(`main`);
    const [menuHeight, setMenuHeight] = useState(null);


    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropDownItem(props) {
        return (
            <a href={"#"}
               className={"menu-item"}
               onClick={
                   () => props.goToMenu && setActiveMenu(props.goToMenu)
               }
            >
              <span className="icon-button">
                  {props.leftIcon}
              </span>
                {props.children}

                <span className="icon-right">
                  {props.rightIcon}
              </span>

            </a>
        );
    }

    return (

        <div className="dropdown"
             style={{height: menuHeight}}>
            <CSSTransition
                in={activeMenu === 'main'}
                unmountOnExit
                timeout={500}
                classNames="menu-primary"
                onEnter={calcHeight}
            >
                <div className={"menu"}>
                    <DropDownItem>My Profile</DropDownItem>
                    <DropDownItem
                        leftIcon={<CogIcon/>}
                        rightIcon={<CogIcon/>}
                        goToMenu="settings"
                    >
                        Settings
                    </DropDownItem>
                </div>

            </CSSTransition>

            <CSSTransition
                in={activeMenu === 'settings'}
                unmountOnExit
                timeout={500}
                classNames="menu-secondary"
            >
                <div className={"menu"}>
                    <DropDownItem
                        leftIcon={<ArrowIcon/>}
                        goToMenu={"main"}/>
                    <DropDownItem>Settings</DropDownItem>


                </div>

            </CSSTransition>
        </div>
    );
}

function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
        <li className={"nav-item"}>
            <a href="#" className={"icon-button"} onClick={
                () => setOpen(!open)
            }>
                {props.icon}
            </a>
            {open && props.children}
        </li>
    );
}

export default App;
