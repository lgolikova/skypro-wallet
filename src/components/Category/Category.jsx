import { SWrapper, SContent, SIcon, STitle } from "./Category.styled";


export const Category = ({ onClick, name, icon }) => {
  return (
    <SWrapper>
      <SContent
        onClick={(e) => {
          e.stopPropagation();// заблокировать всплытие
          onClick();
        }}
      >
        <SIcon src={icon} alt={name} />
        <STitle>{name}</STitle>
      </SContent>
    </SWrapper>
  )
}
