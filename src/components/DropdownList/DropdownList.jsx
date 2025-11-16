import { SDropdownListWrapper, SContent, SIcon, STitle } from "./DropdownList.styled";
import { Category } from "../category/Category";
import { categories } from "../../utils/categories";


export const DropdownListFilter = () => {
  return (
    <SDropdownListWrapper >
      {categories.map((category) => category.icon ? <Category key={category.value} name={category.label} icon={category.icon} /> : null)}
    </SDropdownListWrapper>
  )
}

export const DropdownListSort = () => {
  return (
    <SDropdownListWrapper>
      <SContent>
        <STitle>Дате</STitle>
      </SContent>
      <SContent>
        <STitle>Сумме</STitle>
      </SContent>
    </SDropdownListWrapper>
  )
}
