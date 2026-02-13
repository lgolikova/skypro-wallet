import { SDropdownListWrapper, SContent, SIcon, STitle } from "./DropdownList.styled";
import { Category } from "../category/Category";
import { categories } from "../../utils/categories";
// import { SpendsContext } from "../../context/SpendsContext";
import { useContext, useState } from "react";


// export const DropdownListFilter = ({ onCategorySelect, isCategorySelected }) => {
// export const DropdownListFilter = ({ onCategorySelectInDropdownList, isCategorySelectedInDropdownList }) => {
export const DropdownListFilter = ({ onCategorySelectInDropdownList }) => {
  // const { handleCategoryInDropdownListClick, isCategorySelectedInDropdownList } = useContext(SpendsContext);

  const [isCategorySelectedInDropdownList, setIsCategorySelectedInDropdownList] = useState("");
  // const [isCategorySelected, setIsCategorySelected] = useState("");

  const handleCategoryInDropdownListClick = (categoryName) => {
    console.log(`в выпадающем списке кликнули по категории ${categoryName}`);
    setIsCategorySelectedInDropdownList(categoryName);

    onCategorySelectInDropdownList(categoryName);
  }


  return (
    <>
      {/* <SDropdownListWrapper $newSpendCategory={isCategorySelected}> */}
      <SDropdownListWrapper $newSpendCategory={isCategorySelectedInDropdownList}>
        {categories
          .filter((category) => category.icon)
          .map((category) => (
            <Category
              key={category.value}
              onClick={() => {
                onCategorySelectInDropdownList(category.value);
                // handleCategoryInDropdownListClick(category.value);
              }}
              isCategorySelected={isCategorySelectedInDropdownList}
              handleCategoryClick={handleCategoryInDropdownListClick}
              name={category.label}
              icon={category.icon}
              iconActive={category.iconActive}
            // icon={!!isCategorySelected ?
            //   category.iconActive
            //   :
            //   category.icon
            // }
            />
          ))}
      </SDropdownListWrapper>
      {/* <SDropdownListWrapper >
        {categories.map((category) => category.icon ? <Category key={category.value} onClick={onClick} name={category.label} icon={category.icon} /> : null)}
      </SDropdownListWrapper> */}
    </>
  )
}

export const DropdownListSort = ({ onClick }) => {
  return (
    <SDropdownListWrapper>
      <SContent
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }} >
        <STitle>Дате</STitle>
      </SContent>
      <SContent
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }} >
        <STitle>Сумме</STitle>
      </SContent>
    </SDropdownListWrapper>
  )
}



// export const Category = ({ onClick, name, icon, iconActive }) => {
// const { isCategorySelected, handleCategoryClick, newSpendCategory } =
// useContext(SpendsContext);

// const isSelected = isCategorySelected === name;
// const currentIcon = isSelected && iconActive ? iconActive : icon;
// console.log('currentIcon', currentIcon);
