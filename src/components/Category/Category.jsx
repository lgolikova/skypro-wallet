import { SWrapper, SContent, SIcon, STitle } from "./Category.styled";


export const Category = ({ name, icon, iconActive, isSelected, onClick}) => {

  const currentIcon = isSelected && iconActive ? iconActive : icon

  return (
    <SWrapper
      $newSpendCategory={isSelected}
      onClick={onClick}
    >
      <SContent>
        <SIcon src={currentIcon} alt={name} />
        <STitle $isCategorySelected={isSelected}>{name}</STitle>
      </SContent>
    </SWrapper>
  )
}
