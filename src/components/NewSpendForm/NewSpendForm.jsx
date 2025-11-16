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
        <BaseInput placeholder="Введите описание" />
      </SBlockWrapper>

      <SBlockWrapper style={{ height: "141px" }}>
        <SBlockTitle>Категория</SBlockTitle>
        <SCategoriesWrapper>
          {categories.map((category) => category.icon ? <Category key={category.value} name={category.label} icon={category.icon} /> : null)}
        </SCategoriesWrapper>
      </SBlockWrapper>

      <SBlockWrapper>
        <SBlockTitle>Дата</SBlockTitle>
        <BaseInput placeholder="Введите дату" />
      </SBlockWrapper>

      <SBlockWrapper>
        <SBlockTitle>Сумма</SBlockTitle>
        <BaseInput placeholder="Введите сумму" />
      </SBlockWrapper>

      <BaseButton onClick={() => { console.log("Нажали кнопку 'Добавить новый расход'"); }} text="Добавить новый расход" active="true" />
    </SFormWrapper>
  )
}
