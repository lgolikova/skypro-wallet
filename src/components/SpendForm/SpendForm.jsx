import { BaseInput } from "../ui/Input";
import { BaseButton } from "../ui/Button";
import { Category } from "../category/Category";
import { SFormWrapper, SFormTitle, SBlockWrapper, SBlockTitle, SCategoriesWrapper, SWrapper, SLinkTo, SDeleteLink } from "./SpendForm.styled";
import { categories } from "../../utils/categories";
import { parse, format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { SpendsContext } from "../../context/SpendsContext";
import { useParams, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import arrowIcon from "../../assets/icons/arrow-left.svg";


export const SpendForm = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 375px)" });

  const {
    spends,
    isSpendSelected, setIsSpendSelected,
    addSpend,
    newSpendDescription, setNewSpendDescription,
    newSpendCategory, setNewSpendCategory,
    newSpendDate, setNewSpendDate,
    newSpendSum, setNewSpendSum,
    editSpend,
    removeSpend
  } = useContext(SpendsContext);

  const [isCategorySelected, setIsCategorySelected] = useState("");
  const initialErrorsState = {
    description: false,
    category: false,
    date: false,
    sum: false,
  }

  const [errors, setErrors] = useState(initialErrorsState);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const handleCategoryClick = (categoryName) => {
    setIsCategorySelected(categoryName);
  };


  const { id } = useParams();
  const selectedSpend = spends.find((spend) => spend._id === id);


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
      date: !isDateFormallyValid || !isActualDate,
      sum: !newSpendSum.toString().trim() || isNaN(Number(newSpendSum.toString().replace(/\s/g, '').replace(',', '.'))) || Number(newSpendSum.toString().replace(/\s/g, '').replace(',', '.')) < 0,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setWasSubmitted(true);
      return;
    }


    // отформатировать дату
    const [day, month, year] = newSpendDate.split(".");
    // const fullYear = year.length === 2 ? (parseInt(year, 10) >= 50 ? `19${year}` : `20${year}`) : year;
    const fullYear = year.length === 2 ? `20${year}` : year;

    const parsedDate = parse(`${day}.${month}.${fullYear}`, 'dd.MM.yyyy', new Date());
    // const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    const formattedDate = format(parsedDate, "M-d-yyyy");

    // отформатировать сумму
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

  const handleDelete = async (e) => {
    e.preventDefault();
    await removeSpend(id);
    navigate("/");
  };


  return (
    <form onSubmit={onSubmit}>
      <SFormWrapper>
        <SWrapper>
          <SLinkTo>
            {isMobile && (
              <SLinkTo onClick={() => navigate("/")}>
                <img src={arrowIcon} alt="назад" />
                <span>Мои расходы</span>
              </SLinkTo>
            )}
          </SLinkTo>
          <SFormTitle>{!isSpendSelected ? "Новый расход" : "Редактирование"}</SFormTitle>
        </SWrapper>

        <SBlockWrapper>
          <SBlockTitle>
            Описание {errors.description && <span style={{ color: "red", fontWeight: "400", }}>*</span>}
          </SBlockTitle>
          <BaseInput
            value={newSpendDescription}
            onChange={(event) => {
              setNewSpendDescription(event.target.value);
              setErrors(prev => ({ ...prev, description: false }));
              setWasSubmitted(false);
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
                  isSelected={isCategorySelected === category.value}
                  onClick={() => {
                    setIsCategorySelected(category.value)
                    setNewSpendCategory(category.value);
                    setErrors(prev => ({ ...prev, category: false }));
                    setWasSubmitted(false);
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
            value={newSpendDate}
            onChange={(event) => {
              setNewSpendDate(event.target.value);
              setErrors(prev => ({ ...prev, date: false }));
              setWasSubmitted(false);
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
            value={newSpendSum}
            onChange={(event) => {
              setNewSpendSum(event.target.value);
              setErrors(prev => ({ ...prev, sum: false }));
              setWasSubmitted(false);
            }}
            error={errors.sum}
            valid={!errors.sum && newSpendSum}
            placeholder="Введите сумму"
          />
        </SBlockWrapper>

        <BaseButton
          type="submit"
          active={!wasSubmitted}
          text={!isSpendSelected ? "Добавить новый расход" : "Сохранить редактирование"}
        />

        {id && isMobile && (
          <SDeleteLink to="#" onClick={handleDelete}>
            Удалить расход
          </SDeleteLink>
        )}
      </SFormWrapper>
    </form>
  )
}
