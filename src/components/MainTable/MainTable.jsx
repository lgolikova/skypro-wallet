import { STableWrapper, STableHeaderWrapper, STableTopWrapper, STableTitle, SActionsWrapper, SActionWrapper, SColumnNamesWrapper, SColumnName, STableContent, SFilterTitle, SSortTitle, SFlag, SActionIcon } from "./MainTable.styled";
import { MainTableRow } from "../MainTableRow/MainTableRow";
import actionIcon from "../../assets/icons/actions.svg";
import { DropdownListFilter, DropdownListSort } from "../DropdownList/DropdownList";


export const MainTable = () => {
  return (
    <STableWrapper>
      <STableHeaderWrapper>
        <STableTopWrapper>
          <STableTitle>Таблица расходов</STableTitle>
          <SActionsWrapper>
            <SActionWrapper>
              <SFilterTitle>Фильтровать по категории <SFlag>еда</SFlag></SFilterTitle>
              <DropdownListFilter />
              <SActionIcon src={actionIcon} alt="фильтр" />
            </SActionWrapper>

            <SActionWrapper>
              <SSortTitle>Сортировать по <SFlag>дате</SFlag></SSortTitle>
              <DropdownListSort />
              <SActionIcon src={actionIcon} alt="сортировка" />
            </SActionWrapper>
          </SActionsWrapper>
        </STableTopWrapper>

        <SColumnNamesWrapper>
          <SColumnName>Описание</SColumnName>
          <SColumnName>Категория</SColumnName>
          <SColumnName>Дата</SColumnName>
          <SColumnName>Сумма</SColumnName>
        </SColumnNamesWrapper>
      </STableHeaderWrapper>

      <STableContent>
        <MainTableRow />
      </STableContent>
    </STableWrapper>
  )
}