import { useContext } from "react";
import { SWrapper, SContent, SIcon, STitle } from "./Category.styled";
import { SpendsContext } from "../../context/SpendsContext";


export const Category = ({ onClick, name, icon}) => {
  const {
    isCategorySelected,
    handleCategoryClick,
    newSpendCategory,
  } = useContext(SpendsContext);

  const isSelected = isCategorySelected === name;
  console.log("isSelected", isSelected);

  return (
    <SWrapper
      // $newSpendCategory={newSpendCategory}
      $newSpendCategory={isSelected}
      onClick={(e) => {
        e.stopPropagation();// заблокировать всплытие
        handleCategoryClick(name)
        onClick();
      }}
    >
      <SContent>
        <SIcon src={icon} alt={name} />
        {/* <STitle $isCategorySelected={isCategorySelected}>{name}</STitle> */}
        <STitle $isCategorySelected={isSelected}>{name}</STitle>
      </SContent>
    </SWrapper>
  )
}
