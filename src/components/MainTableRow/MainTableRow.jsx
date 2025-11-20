import { categories } from "../../utils/categories";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import editIconActive from "../../assets/icons/edit_active.svg";
import deleteIconActive from "../../assets/icons/delete_active.svg";
import { SRowWrapper, STableRow, SItem, SIconsWrapper, SIcon } from "./MainTableRow.styled";
import { format } from "date-fns";


export const MainTableRow = ({ transaction, isSpendSelected, onClick }) => {
  // const isActive = false;
  // console.log("transaction._id: ", transaction._id);
  const isSelected = isSpendSelected === transaction._id;
  // console.log("isSelected: ", isSelected);
  const categoryMap = categories.reduce((acc, category) => {
    acc[category.value] = category.label;
    return acc;
  }, {});

  return (
    <>
      <SRowWrapper onClick={() => onClick(transaction._id)} >
        <STableRow $isSpendSelected={isSelected}>
          <SItem $isSpendSelected={isSelected}>{transaction.description}</SItem>
          <SItem $isSpendSelected={isSelected}>{categoryMap[transaction.category]}</SItem>
          <SItem $isSpendSelected={isSelected} style={{ width: "142px" }}>{format(new Date(transaction.date), "dd.MM.yyyy")}</SItem>
          <SItem $isSpendSelected={isSelected} style={{ width: "134px" }}>{transaction.sum.toLocaleString('ru-RU')} &#8381;</SItem>
          <SIconsWrapper>
            <SIcon src={isSelected ? editIconActive : editIcon} alt="редактировать" />
            <SIcon src={isSelected ? deleteIconActive : deleteIcon} alt="удалить" />
          </SIconsWrapper>
        </STableRow>
      </SRowWrapper>
    </>
  )
}
