import { useState } from "react";

const useNavbarMenu = () => {
    const [isToggleActive, setIsToggleActive] = useState(false);
    const handleToggle = () => {
        setIsToggleActive(!isToggleActive);
    };
    return { isToggleActive, handleToggle };
};

export default useNavbarMenu;