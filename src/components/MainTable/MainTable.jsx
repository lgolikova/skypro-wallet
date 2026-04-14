import { useState, useEffect, useRef, useContext } from "react";
import { STableWrapper, STableHeaderWrapper, STableTopWrapper, STableTitle, SActionsWrapper, SActionWrapper, SColumnNamesWrapper, SColumnName, STableContent, SFilterTitle, SSortTitle, SFlag, SActionIcon, SDropdownListWrapper, SLinkTo } from "./MainTable.styled";
import { MainTableRow } from "../MainTableRow/MainTableRow";
import actionIcon from "../../assets/icons/actions.svg";
import { DropdownListFilter, DropdownListSort } from "../DropdownList/DropdownList";
import { SpendsContext } from "../../context/SpendsContext";
import { categories } from "../../utils/categories";


export const MainTable = () => {
  const {
    spends,
    isSpendSelected,
    filterCategories,
    setFilterCategories,
    sortType,
    setSortType,
  } = useContext(SpendsContext);


  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isSortActive, setIsSortActive] = useState(false);
  const popRef = useRef(null);

  const handleOpenFilter = () => {
    setIsFilterActive(true);
  };

  const handleCloseFilter = (categoryName) => {
    setIsFilterActive(false);

    setFilterCategories(prev => {
      if (categoryName === "") return [];
      if (prev.includes(categoryName)) {
        return prev.filter(category => category !== categoryName);
      }
      return [...prev, categoryName]
    });
  };

  const handleClickSort = () => {
    setIsSortActive(true);
  };

  const handleCloseSort = (type) => {
    setIsSortActive(false);
    setSortType(type);
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


  const categoryLabelsMap = categories.reduce((acc, cat) => {
    acc[cat.value] = cat.label;
    return acc;
  }, {});

  const selectedLabels = filterCategories.map(value => categoryLabelsMap[value]).filter(Boolean);


  return (
    <STableWrapper>
      <STableHeaderWrapper>
        <STableTopWrapper>
          <STableTitle>Таблица расходов</STableTitle>
          <SActionsWrapper>

            <SActionWrapper onClick={handleOpenFilter}>
              {isFilterActive &&
                <SDropdownListWrapper ref={popRef}>
                  <DropdownListFilter
                    onCategorySelectInDropdownList={handleCloseFilter}
                  />
                </SDropdownListWrapper>
              }
              <SFilterTitle >Фильтровать по категории <SFlag>
                {selectedLabels.length > 0 ? selectedLabels.join(", ") : "все"}
              </SFlag>
              </SFilterTitle>
              <SActionIcon src={actionIcon} alt="фильтр" $isActive={isFilterActive} />
            </SActionWrapper>

            <SActionWrapper onClick={handleClickSort}>
              {isSortActive &&
                <SDropdownListWrapper ref={popRef}><DropdownListSort onClick={handleCloseSort} /></SDropdownListWrapper>
              }
              <SSortTitle>Сортировать по <SFlag>{sortType === "date" ? "дате" : "сумме"}</SFlag></SSortTitle>
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
        {spends.map((spend) =>
          <MainTableRow
            key={spend._id}
            spend={spend}
            isSpendSelected={isSpendSelected}
          />
        )}
      </STableContent>
    </STableWrapper>
  )
}