import { BaseInput } from "../ui/Input";
import { BaseButton } from "../ui/Button";
import { Category } from "../category/Category";
import { SFormWrapper, SFormTitle, SBlockWrapper, SBlockTitle, SCategoriesWrapper } from "./NewSpendForm.styled";
import { categories } from "../../utils/categories";


export const NewSpendForm = () => {


  return (
    <SFormWrapper>
      <SFormTitle>Новый расход</SFormTitle>

      <SBlockWrapper>
        <SBlockTitle>Описание</SBlockTitle>
        <BaseInput placeholder="Введите описание"/>
      </SBlockWrapper>

      <SBlockWrapper style={{height: "141px"}}>
        <SBlockTitle>Категория</SBlockTitle>
        <SCategoriesWrapper>
          <Category name="Еда"></Category>
        </SCategoriesWrapper>
      </SBlockWrapper>

      <SBlockWrapper>
        <SBlockTitle>Дата</SBlockTitle>
        <BaseInput placeholder="Введите дату"/>
      </SBlockWrapper>

      <SBlockWrapper>
        <SBlockTitle>Сумма</SBlockTitle>
        <BaseInput placeholder="Введите сумму"/>
      </SBlockWrapper>

      <BaseButton text="Добавить новый расход" active="true" />
    </SFormWrapper>
  )
}

// src="../../src/assets/icons/logo.svg"
//                             alt="logo"