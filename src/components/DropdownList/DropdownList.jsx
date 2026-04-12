import { SDropdownListWrapper, SContent, STitle } from "./DropdownList.styled";
import { Category } from "../category/Category";
import { categories } from "../../utils/categories";
import { useState } from "react";


export const DropdownListFilter = ({ onCategorySelectInDropdownList }) => {
  const [isCategorySelectedInDropdownList, setIsCategorySelectedInDropdownList] = useState("");

  const handleCategoryInDropdownListClick = (categoryName) => {
    // console.log(`в выпадающем списке кликнули по категории ${categoryName}`);
    setIsCategorySelectedInDropdownList(categoryName);

    onCategorySelectInDropdownList(categoryName);
  }


  return (
    <>
      <SDropdownListWrapper $newSpendCategory={isCategorySelectedInDropdownList}>
        {categories
          .filter((category) => category.icon)
          .map((category) => (
            <Category
              key={category.value}
              onClick={() => {
                onCategorySelectInDropdownList(category.value);
              }}
              isCategorySelected={isCategorySelectedInDropdownList}
              handleCategoryClick={handleCategoryInDropdownListClick}
              name={category.label}
              icon={category.icon}
              iconActive={category.iconActive}
            />
          ))}
      </SDropdownListWrapper>
    </>
  )
}

export const DropdownListSort = ({ onClick }) => {
  return (
    <SDropdownListWrapper>
      <SContent
        onClick={(e) => {
          e.stopPropagation();
          onClick("date");
        }} >
        <STitle>Дате</STitle>
      </SContent>
      <SContent
        onClick={(e) => {
          e.stopPropagation();
          onClick("sum");
        }} >
        <STitle>Сумме</STitle>
      </SContent>
    </SDropdownListWrapper>
  )
}
