import { STableWrapper, STableHeaderWrapper, STableTopWrapper, STableTitle, SActionsWrapper, SFilterWrapper, SSortWrapper, SColumnNamesWrapper, SColumnName } from "./MainTable.styled";


export const MainTable = () => {
  return (
    <STableWrapper>
      <STableHeaderWrapper>
        <STableTopWrapper>
          <STableTitle>Таблица расходов</STableTitle>
          <SActionsWrapper>
            <SFilterWrapper>фильтрация</SFilterWrapper>
            <SSortWrapper>сортировка</SSortWrapper>
          </SActionsWrapper>
        </STableTopWrapper>
        <SColumnNamesWrapper>
          <SColumnName>Описание</SColumnName>
          <SColumnName>Категория</SColumnName>
          <SColumnName>Дата</SColumnName>
          <SColumnName>Сумма</SColumnName>
        </SColumnNamesWrapper>
      </STableHeaderWrapper>
    </STableWrapper>
  )
}