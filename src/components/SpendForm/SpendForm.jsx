import { BaseInput } from "../ui/Input";
import { BaseButton } from "../ui/Button";
import { Category } from "../category/Category";
import { SFormWrapper, SFormTitle, SBlockWrapper, SBlockTitle, SCategoriesWrapper } from "./SpendForm.styled";
import { categories } from "../../utils/categories";
import { parse, format } from "date-fns";


export const SpendForm = ({ isSpendSelected, addSpend, newSpendDescription, setNewSpendDescription, newSpendCategory, setNewSpendCategory, newSpendDate, setNewSpendDate, newSpendSum, setNewSpendSum }) => {
  const isNewSpend = true;

  // console.log("isSpendSelected в SpendForm: ", isSpendSelected)

  const onSubmit = (event) => {
    event.preventDefault();

    // отформатировать дату
    const [day, month, year] = newSpendDate.split(".");
    // const fullYear = year.length === 2 ? (parseInt(year, 10) >= 50 ? `19${year}` : `20${year}`) : year;
    const fullYear = year.length === 2 ? `20${year}` : year;

    const parsedDate = parse(`${day}.${month}.${fullYear}`, 'dd.MM.yyyy', new Date());
    const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    // отформатировать сумму
    const formattedSum = parseFloat(newSpendSum.replace(/\s/g, '').replace(',', '.')).toLocaleString('ru-RU');

    addSpend({
      description: newSpendDescription,
      category: newSpendCategory,
      date: formattedDate,
      sum: formattedSum,
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <SFormWrapper>
        <SFormTitle>{isNewSpend ? "Новый расход" : "Редактирование"}</SFormTitle>

        <SBlockWrapper>
          <SBlockTitle>Описание</SBlockTitle>
          <BaseInput
            // label
            value={newSpendDescription}
            onInput={(event) => setNewSpendDescription(event.target.value)}
            // onChange
            // error
            // valid
            // mode
            placeholder="Введите описание"
          // type
          />
        </SBlockWrapper>

        <SBlockWrapper style={{ height: "141px" }}>
          <SBlockTitle>Категория</SBlockTitle>
          <SCategoriesWrapper>
            {categories.map(
              (category) => category.icon
                ? <Category
                  key={category.value}
                  name={category.label}
                  icon={category.icon}
                  newSpendCategory={newSpendCategory}
                  onClick={() => setNewSpendCategory(category.value)} />
                : null
            )}
          </SCategoriesWrapper>
        </SBlockWrapper>

        <SBlockWrapper>
          <SBlockTitle>Дата</SBlockTitle>
          <BaseInput
            // label
            value={newSpendDate}
            onInput={(event) => setNewSpendDate(event.target.value)}
            // onChange
            // error
            // valid
            // mode
            placeholder="Введите дату"
          // type
          />
        </SBlockWrapper>

        <SBlockWrapper>
          <SBlockTitle>Сумма</SBlockTitle>
          <BaseInput
            // label
            value={newSpendSum}
            onInput={(event) => setNewSpendSum(event.target.value)}
            // onChange
            // error
            // valid
            // mode
            placeholder="Введите сумму"
          // type
          />
        </SBlockWrapper>

        <BaseButton
          type="submit"
          // active={active}
          // active="true"
          // disabled={!active}
          // onClick={onClick}
          text={!isSpendSelected ? "Добавить новый расход" : "Сохранить редактирование"}
        />
      </SFormWrapper>
    </form>
  )
}
