import { BaseInput } from "../ui/Input";
import { BaseButton } from "../ui/Button";
import { Category } from "../category/Category";
import { SFormWrapper, SFormTitle, SBlockWrapper, SBlockTitle, SCategoriesWrapper } from "./SpendForm.styled";
import { categories } from "../../utils/categories";
import { parse, format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { SpendsContext } from "../../context/SpendsContext";
import { useParams, useNavigate } from "react-router-dom";


export const SpendForm = () => {
  const navigate = useNavigate();

  const {
    spends,
    isSpendSelected, setIsSpendSelected,
    addSpend,
    newSpendDescription, setNewSpendDescription,
    newSpendCategory, setNewSpendCategory,
    newSpendDate, setNewSpendDate,
    newSpendSum, setNewSpendSum,
    // isCategorySelected,
    editSpend
  } = useContext(SpendsContext);

  const [isCategorySelected, setIsCategorySelected] = useState("");
  const initialErrorsState = {
    description: false,
    category: false,
    date: false,
    sum: false,
  }

  const [errors, setErrors] = useState(initialErrorsState);

  const handleCategoryClick = (categoryName) => {
    // console.log(`кликнули по категории ${categoryName}`);
    setIsCategorySelected(categoryName);
  };


  const { id } = useParams();
  const selectedSpend = spends.find((spend) => spend._id === id);
  // console.log("selectedSpend: ", selectedSpend);


  useEffect(() => {
    if (id && selectedSpend) {
      setNewSpendDescription(selectedSpend.description);
      setNewSpendCategory(selectedSpend.category);
      setIsCategorySelected(selectedSpend.category);
      setNewSpendSum(selectedSpend.sum.toString());
      setNewSpendDate(format(new Date(selectedSpend.date), "dd.MM.yyyy"));
    } else {
      setNewSpendDescription("");
      setNewSpendCategory("");
      setIsCategorySelected("");
      setNewSpendSum("");
      setNewSpendDate("");
    }
  }, [id, selectedSpend]);


  const onSubmit = async (event) => {
    event.preventDefault();

    // проверка даты
    const dateRegex = /^\d{2}\.\d{2}\.\d{2,4}$/;
    const isDateFormallyValid = dateRegex.test(newSpendDate);

    let isActualDate = false;
    if (isDateFormallyValid) {
      const [day, month, year] = newSpendDate.split(".");
      const fullYear = year.length === 2 ? `20${year}` : year;
      const parsedDate = parse(`${day}.${month}.${fullYear}`, 'dd.MM.yyyy', new Date());
      isActualDate = !isNaN(parsedDate.getTime());
    }


    const newErrors = {
      description: !newSpendDescription.trim() || newSpendDescription.trim().length < 4,
      category: !isCategorySelected,
      // date: !newSpendDate.trim(),
      date: !isDateFormallyValid || !isActualDate,
      sum: !newSpendSum.toString().trim() || isNaN(Number(newSpendSum.toString().replace(/\s/g, '').replace(',', '.'))) || Number(newSpendSum.toString().replace(/\s/g, '').replace(',', '.')) < 0,
    };


    setErrors(newErrors);
    console.log("Результат проверки перед отправкой:", newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      console.log("данные невалидные: ", newErrors);
      return;
    }


    // отформатировать дату для записи LS
    const [day, month, year] = newSpendDate.split(".");
    // const fullYear = year.length === 2 ? (parseInt(year, 10) >= 50 ? `19${year}` : `20${year}`) : year;
    const fullYear = year.length === 2 ? `20${year}` : year;

    const parsedDate = parse(`${day}.${month}.${fullYear}`, 'dd.MM.yyyy', new Date());
    // const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    const formattedDate = format(parsedDate, "M-d-yyyy");

    // отформатировать сумму для записи LS
    // const formattedSum = parseFloat(newSpendSum.replace(/\s/g, '').replace(',', '.')).toLocaleString('ru-RU');
    // console.log("formattedSum: ", formattedSum);
    // console.log("formattedSum: ", typeof(formattedSum));
    const formattedSum = Number(newSpendSum.replace(/\s/g, '').replace(',', '.'));


    if (id) {
      await editSpend(id, {
        description: newSpendDescription,
        category: newSpendCategory,
        date: formattedDate,
        sum: formattedSum,
      });

      setNewSpendDescription("");
      setNewSpendCategory("");
      setIsCategorySelected("");
      setNewSpendSum("");
      setNewSpendDate("");

      setIsSpendSelected("");
      navigate("/");
    } else {
      try {
        await addSpend({
          description: newSpendDescription,
          category: newSpendCategory,
          date: formattedDate,
          sum: formattedSum,
        });

        setNewSpendDescription("");
        setNewSpendCategory("");
        setIsCategorySelected("");
        setNewSpendSum("");
        setNewSpendDate("");

        navigate("/");
      } catch (err) {
        console.error("Ошибка при сохранении расхода: ", err);
      }
    }
  };


  return (
    <form onSubmit={onSubmit}>
      <SFormWrapper>
        <SFormTitle>{!isSpendSelected ? "Новый расход" : "Редактирование"}</SFormTitle>

        <SBlockWrapper>
          <SBlockTitle>
            Описание {errors.description && <span style={{ color: "red", fontWeight: "400", }}>*</span>}
          </SBlockTitle>
          <BaseInput
            // label="Описание"
            value={newSpendDescription}
            onChange={(event) => {
              setNewSpendDescription(event.target.value);
              setErrors(prev => ({ ...prev, description: false }));
            }}
            error={errors.description}
            valid={!errors.description && newSpendDescription}
            placeholder="Введите описание"
          />
        </SBlockWrapper>

        <SBlockWrapper style={{ height: "141px" }}>
          <SBlockTitle>
            Категория {errors.category && <span style={{ color: "red", fontWeight: "400", }}>*</span>}
          </SBlockTitle>
          <SCategoriesWrapper>
            {categories.map(
              (category) => category.icon ?
                <Category
                  key={category.value}
                  name={category.label}
                  icon={category.icon}
                  iconActive={category.iconActive}
                  // icon={!!isCategorySelected ?
                  //   category.iconActive
                  //   :
                  //   category.icon
                  // }

                  isSelected={isCategorySelected === category.value}

                  onClick={() => {
                    setIsCategorySelected(category.value)
                    setNewSpendCategory(category.value);
                    // handleCategoryClick(category.value);
                  }}
                  isCategorySelected={isCategorySelected === category.value}
                  handleCategoryClick={handleCategoryClick}
                />
                : null
            )}
          </SCategoriesWrapper>
        </SBlockWrapper>

        <SBlockWrapper>
          <SBlockTitle>
            Дата {errors.date && <span style={{ color: "red", fontWeight: "400", }}>*</span>}
          </SBlockTitle>
          <BaseInput
            // label="Дата"
            value={newSpendDate}
            onChange={(event) => {
              setNewSpendDate(event.target.value);
              setErrors(prev => ({ ...prev, date: false }));
            }}
            error={errors.date}
            valid={!errors.date && newSpendDate}
            placeholder="Введите дату"
          />
        </SBlockWrapper>

        <SBlockWrapper>
          <SBlockTitle>
            Сумма {errors.sum && <span style={{ color: "red", fontWeight: "400", }}>*</span>}
          </SBlockTitle>
          <BaseInput
            // label="Сумма"
            value={newSpendSum}
            onChange={(event) => {
              setNewSpendSum(event.target.value);
              setErrors(prev => ({ ...prev, sum: false }));
            }}
            error={errors.sum}
            valid={!errors.sum && newSpendSum}
            placeholder="Введите сумму"
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
