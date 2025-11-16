import { transactions } from "../../data";
import { categories } from "../../utils/categories";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { SRowWrapper, SItem, SIconsWrapper, SIcon } from "./MainTableRow.styled";
import { format } from "date-fns";


export const MainTableRow = () => {
  const categoryMap = categories.reduce((acc, category) => {
    acc[category.value] = category.label;
    return acc;
  }, {});

  return (
    <>
      {transactions.map((transaction) =>
        <SRowWrapper key={transaction.description}>
          <SItem>{transaction.description}</SItem>
          <SItem>{categoryMap[transaction.category]}</SItem>
          <SItem style={{ width: "142px" }}>{format(new Date(transaction.date), "dd.MM.yyyy")}</SItem>
          <SItem style={{ width: "134px" }}>{transaction.sum.toLocaleString('ru-RU')} &#8381;</SItem>
          <SIconsWrapper>
            <SIcon src={editIcon} alt="редактировать" />
            <SIcon src={deleteIcon} alt="удалить" />
          </SIconsWrapper>
        </SRowWrapper>
      )}
    </>
  )
}
