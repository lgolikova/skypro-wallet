import foodIcon from "../assets/icons/food.svg";
import transportIcon from "../assets/icons/transport.svg";
import housingIcon from "../assets/icons/housing.svg";
import joyIcon from "../assets/icons/joy.svg";
import educationIcon from "../assets/icons/education.svg";
import othersIcon from "../assets/icons/others.svg";
import foodIconActive from "../assets/icons/food_active.svg";
import transportIconActive from "../assets/icons/transport_active.svg";
import housingIconActive from "../assets/icons/housing_active.svg";
import joyIconActive from "../assets/icons/joy_active.svg";
import educationIconActive from "../assets/icons/education_active.svg";
import othersIconActive from "../assets/icons/others_active.svg";


export const categories = [
    { value: "", label: "Все", icon: null, iconActive: null },
    { value: "food", label: "Еда", icon: foodIcon, iconActive: foodIconActive },
    { value: "transport", label: "Транспорт", icon: transportIcon, iconActive: transportIconActive },
    { value: "housing", label: "Жилье", icon: housingIcon, iconActive: housingIconActive },
    { value: "joy", label: "Развлечения", icon: joyIcon, iconActive: joyIconActive },
    { value: "education", label: "Образование", icon: educationIcon, iconActive: educationIconActive },
    { value: "others", label: "Другое", icon: othersIcon, iconActive: othersIconActive },
];
