import { useContext } from "react";
import { SWrapper, SContent, SIcon, STitle } from "./Category.styled";
import { SpendsContext } from "../../context/SpendsContext";


export const Category = ({ onClick, name, icon}) => {
  const {
    isCategorySelected,
    handleCategoryClick,
    newSpendCategory,
  } = useContext(SpendsContext);

  return (
    <SWrapper
      $newSpendCategory={newSpendCategory}
      onClick={(e) => {
        e.stopPropagation();// заблокировать всплытие
        handleCategoryClick(name)
        onClick();
      }}
    >
      <SContent>
        <SIcon src={icon} alt={name} />
        <STitle $isCategorySelected={isCategorySelected}>{name}</STitle>
      </SContent>
    </SWrapper>
  )
}
