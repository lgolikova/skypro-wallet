import { categories } from "../../utils/categories";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import editIconActive from "../../assets/icons/edit_active.svg";
import deleteIconActive from "../../assets/icons/delete_active.svg";
import { SRowWrapper, STableRow, SItem, SIconsWrapper, SIcon } from "./MainTableRow.styled";
import { format } from "date-fns";
import { SpendsContext } from "../../context/SpendsContext";
import { useContext } from "react";


export const MainTableRow = ({ spend, isSpendSelected }) => {
  const isSelected = isSpendSelected === spend._id;
  const categoryMap = categories.reduce((acc, category) => {
    acc[category.value] = category.label;
    return acc;
  }, {});

  const {
    handleSendEditClick,
    removeSpend,
  } = useContext(SpendsContext);

  return (
    <>
      <SRowWrapper >
        <STableRow $isSpendSelected={isSelected}>
          <SItem $isSpendSelected={isSelected}>{spend.description}</SItem>
          <SItem $isSpendSelected={isSelected}>{categoryMap[spend.category]}</SItem>
          <SItem $isSpendSelected={isSelected} style={{ width: "142px" }}>{format(new Date(spend.date), "dd.MM.yyyy")}</SItem>
          <SItem $isSpendSelected={isSelected} style={{ width: "134px" }}>{spend.sum.toLocaleString('ru-RU')} &#8381;</SItem>
          <SIconsWrapper>
            <SIcon
              src={isSelected ? editIconActive : editIcon}
              alt="редактировать"
              onClick={() => handleSendEditClick(spend._id)}
            />
            <SIcon
            src={isSelected ? deleteIconActive : deleteIcon} 
            alt="удалить"
            onClick={() => removeSpend(spend._id)} />
          </SIconsWrapper>
        </STableRow>
      </SRowWrapper>
    </>
  )
}
