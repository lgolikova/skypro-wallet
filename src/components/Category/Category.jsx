import { SWrapper, SContent, SIcon, STitle } from "./Category.styled";


export const Category = ({ name, icon }) => {
  return (
    <SWrapper>
      <SContent>
        <SIcon src={icon} alt={name} />
        <STitle>{name}</STitle>
      </SContent>
    </SWrapper>
  )
}
