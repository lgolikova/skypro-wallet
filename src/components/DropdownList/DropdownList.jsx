import { SDropdownListWrapper, SContent, SIcon, STitle } from "./DropdownList.styled";
import { Category } from "../category/Category";
import { categories } from "../../utils/categories";


export const DropdownListFilter = ({ onClick }) => {
  return (
    <>
      <SDropdownListWrapper>
        {categories
          .filter((category) => category.icon)
          .map((category) => (
            <Category key={category.value}
              onClick={onClick}
              name={category.label} icon={category.icon} />
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
