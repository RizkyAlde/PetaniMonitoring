import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import MyNavbarMenu from "./MyNavbarMenu";
import MyNavbarItems from "./MyNavbarItems";
import useNavbarMenu from "@/hooks/useNavbarMenu";
import { inter } from "@/app/fonsts";
import Image from "next/image";

const MyNavbar = ({ activeIndex }) => {
  const { isToggleActive, handleToggle } = useNavbarMenu();
  
  return (
    <>
      <Navbar
        className="navbar shadow-large"
        isMenuOpen={isToggleActive}
        onMenuOpenChange={handleToggle}
      >
        <NavbarContent className="lg:hidden" justify="start">
          <NavbarMenuToggle
            icon={
              <FontAwesomeIcon
                icon={isToggleActive ? faX : faBars}
                color="#ffffff"
                size="xl"
              />
            }
          />
        </NavbarContent>
        <MyNavbarMenu activeIndex={activeIndex} />
        <NavbarContent
          className="hidden lg:flex gap-4 text-[#D0D0D0]"
          justify="center"
        >
          <MyNavbarItems activeIndex={activeIndex} />
        </NavbarContent>
        <NavbarContent className="lg:hidden" justify="center">
          <NavbarItem>
            <NavbarBrand
              className={`${inter.className} text-[12px] gap-2 text-white bg-black rounded-lg px-[36px] py-1`}
            >
              <div className="w-[35px] h-[35px] relative">
                <Image
                  src="/assets/icons/logo-replon.png"
                  fill
                  sizes="35px"
                  alt="EEPIS MOBILE REPLON"
                />
              </div>
              <p>EEPIS MOBILE REPLON</p>
            </NavbarBrand>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <span className="rounded-lg">
              <FontAwesomeIcon icon={faBell} color="#ffffff" size="xl" />
            </span>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default MyNavbar;
