import { useState, useEffect, useRef } from "react";
import { STableWrapper, STableHeaderWrapper, STableTopWrapper, STableTitle, SActionsWrapper, SActionWrapper, SColumnNamesWrapper, SColumnName, STableContent, SFilterTitle, SSortTitle, SFlag, SActionIcon, SDropdownListWrapper } from "./MainTable.styled";
import { MainTableRow } from "../MainTableRow/MainTableRow";
import actionIcon from "../../assets/icons/actions.svg";
import { DropdownListFilter, DropdownListSort } from "../DropdownList/DropdownList";


export const MainTable = ({ transactions, isSpendSelected, onclick }) => {
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isSortActive, setIsSortActive] = useState(false);
  const popRef = useRef(null);

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


  const handleOutsideFilterClick = (event) => {
    if (popRef.current && !popRef.current.contains(event.target)) {
      setIsFilterActive(false); // закрыть выпадающий список фильтрации, если клик вне его
    }
  };

  useEffect(() => {
    // добавить обработчик клика вне выпадающего списка фильтрации
    document.addEventListener('mousedown', handleOutsideFilterClick);
    return () => {
      // удалить обработчик клика вне выпадающего списка фильтрации при размонтировании компонента
      document.removeEventListener('mousedown', handleOutsideFilterClick);
    };
  }, []);


  const handleOutsideSortClick = (event) => {
    if (popRef.current && !popRef.current.contains(event.target)) {
      setIsSortActive(false); // закрыть выпадающий список сортировки, если клик вне его
    }
  };

  useEffect(() => {
    // добавить обработчик клика вне выпадающего списка сортировки
    document.addEventListener('mousedown', handleOutsideSortClick);
    return () => {
      // удалить обработчик клика вне выпадающего списка сортировки при размонтировании компонента
      document.removeEventListener('mousedown', handleOutsideSortClick);
    };
  }, []);


  return (
    <STableWrapper>
      <STableHeaderWrapper>
        <STableTopWrapper>
          <STableTitle>Таблица расходов</STableTitle>
          <SActionsWrapper>

            <SActionWrapper onClick={handleOpenFilter}>
              {isFilterActive &&
                <SDropdownListWrapper ref={popRef}><DropdownListFilter onClick={handleCloseFilter} /></SDropdownListWrapper>
              }
              <SFilterTitle >Фильтровать по категории <SFlag>еда</SFlag></SFilterTitle>
              <SActionIcon src={actionIcon} alt="фильтр" $isActive={isFilterActive} />
            </SActionWrapper>

            <SActionWrapper onClick={handleClickSort}>
              {isSortActive &&
                <SDropdownListWrapper ref={popRef}><DropdownListSort onClick={handleCloseSort} /></SDropdownListWrapper>
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
        {transactions.map((transaction) =>
          <MainTableRow key={transaction._id} transaction={transaction} isSpendSelected={isSpendSelected} onClick={onclick} />
        )}
      </STableContent>
    </STableWrapper>
  )
}