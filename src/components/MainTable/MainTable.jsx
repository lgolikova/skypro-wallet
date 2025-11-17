import { useState } from "react";
import { STableWrapper, STableHeaderWrapper, STableTopWrapper, STableTitle, SActionsWrapper, SActionWrapper, SColumnNamesWrapper, SColumnName, STableContent, SFilterTitle, SSortTitle, SFlag, SActionIcon } from "./MainTable.styled";
import { MainTableRow } from "../MainTableRow/MainTableRow";
import actionIcon from "../../assets/icons/actions.svg";
import { DropdownListFilter, DropdownListSort } from "../DropdownList/DropdownList";


export const MainTable = () => {
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isSortActive, setIsSortActive] = useState(false);

  const handleOpenFilter = () => {
    setIsFilterActive(true);
  };

  const handleCloseFilter = () => {
    setIsFilterActive(false);
  };

  const handleClickSort = () => {
    setIsSortActive(true);
  };

  const handleCloseSort = () => {
    setIsSortActive(false);
  };


  return (
    <STableWrapper>
      <STableHeaderWrapper>
        <STableTopWrapper>
          <STableTitle>Таблица расходов</STableTitle>
          <SActionsWrapper>

            <SActionWrapper onClick={handleOpenFilter}>
              {isFilterActive &&
                <DropdownListFilter onClick={handleCloseFilter} />
              }
              <SFilterTitle >Фильтровать по категории <SFlag>еда</SFlag></SFilterTitle>
              <SActionIcon src={actionIcon} alt="фильтр" $isActive={isFilterActive} />
            </SActionWrapper>

            <SActionWrapper onClick={handleClickSort}>
              {isSortActive &&
                <DropdownListSort onClick={handleCloseSort} />
              }
              <SSortTitle>Сортировать по <SFlag>дате</SFlag></SSortTitle>
              <SActionIcon src={actionIcon} alt="сортировка" $isActive={isSortActive} />
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