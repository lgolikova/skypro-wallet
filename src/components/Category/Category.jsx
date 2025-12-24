import { useContext } from "react";
import { SWrapper, SContent, SIcon, STitle } from "./Category.styled";
import { SpendsContext } from "../../context/SpendsContext";


export const Category = ({ onClick, name, icon, iconActive}) => {
  const {
    isCategorySelected,
    handleCategoryClick,
  } = useContext(SpendsContext);

  const isSelected = isCategorySelected === name;
  // console.log("isSelected", isSelected);

  const currentIcon = isSelected && iconActive ? iconActive : icon

  return (
    <SWrapper
      $newSpendCategory={isSelected}
      onClick={(e) => {
        e.stopPropagation();// заблокировать всплытие
        handleCategoryClick(name)
        onClick();
      }}
    >
      <SContent>
        <SIcon src={currentIcon} alt={name} />
        <STitle $isCategorySelected={isSelected}>{name}</STitle>
      </SContent>
    </SWrapper>
  )
}
