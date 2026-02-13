// import { useContext } from "react";
import { SWrapper, SContent, SIcon, STitle } from "./Category.styled";
// import { SpendsContext } from "../../context/SpendsContext";


export const Category = ({ name, icon, iconActive, isCategorySelected, handleCategoryClick}) => {
  // console.log("isCategorySelected: ", isCategorySelected);
  // console.log("name: ", name);
  
  const isSelected = isCategorySelected === name;
  // console.log("isSelected: ", isSelected);

  const currentIcon = isSelected && iconActive ? iconActive : icon

  return (
    <SWrapper
      $newSpendCategory={isSelected}
      // onClick={(e) => {
      //   e.stopPropagation();// заблокировать всплытие
      //   handleCategoryClick(name)
      //   onClick();
      // }}
      onClick={(e) => {
        handleCategoryClick(name)
      }}
    >
      <SContent>
        <SIcon src={currentIcon} alt={name} />
        <STitle $isCategorySelected={isSelected}>{name}</STitle>
      </SContent>
    </SWrapper>
  )
}
