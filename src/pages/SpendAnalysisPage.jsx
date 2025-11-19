import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import SContainer from "../components/Container.styled";
import SGlobalWrapper from "../components/GlobalWrapper.styled";
import { BaseButton } from "../components/ui/Button";

// Регистрируем компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Стилизованные компоненты (остаются без изменений)
const SPageContainer = styled.div`
  padding: 32px 0;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const STitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #000;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

const SMobilePageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin-bottom: 24px;
`;

const SMobilePeriodTitle = styled.h2`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  text-align: left;
  vertical-align: middle;
  color: #000;
  margin-bottom: 20px;
  padding: 0 16px;
`;

const SContent = styled.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const SCalendarContainer = styled.div`
  width: 379px;
  height: 540px;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px #00000021;
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: 504px;
    border-radius: 16px;
    padding: 16px;
    box-sizing: border-box;
  }
`;

const SCalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SCalendarTitle = styled.h3`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  text-align: center;
  vertical-align: middle;
  color: #000;
`;

const SMobileCalendarTitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #000;
  margin-bottom: 16px;
`;

const SCalendarContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SWeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  padding-bottom: 10px;
`;

const SWeekDay = styled.div`
  text-align: center;
  font-size: 12px;
  color: #666;
  padding: 8px 0;
`;

const SCalendarScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 5px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 2px;
  }
`;

const SCalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`;

const SCalendarDay = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 60px;
  background: ${(props) => (props.selected ? "#DBFFE9" : "#F4F5F6")};
  color: ${(props) => (props.selected ? "#1fa46c" : "#000000")};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${(props) => (props.selected ? "600" : "normal")};
  position: relative;

  &:hover {
    background: ${(props) => (props.selected ? "#DBFFE9" : "#e0e0e0")};
  }
`;

const SMonthSection = styled.div`
  margin-bottom: 20px;
`;

const SMonthTitle = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #000;
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  background: white;
  padding: 10px 0;
  z-index: 1;
`;

const SYearSection = styled.div`
  margin-bottom: 20px;
`;

const SYearTitle = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #000;
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  background: white;
  padding: 10px 0;
  z-index: 1;
`;

const SMonthsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
`;

const SMonthButton = styled.div`
  width: 101px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background: ${(props) => (props.selected ? "#DBFFE9" : "#F4F5F6")};
  color: ${(props) => (props.selected ? "#1fa46c" : "#000000")};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${(props) => (props.selected ? "600" : "normal")};
  padding: 6px 0;
  gap: 6px;

  &:hover {
    background: ${(props) => (props.selected ? "#DBFFE9" : "#e0e0e0")};
  }
`;

const SChartContainer = styled.div`
  flex: 1;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px #00000021;
  padding: 24px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-radius: 16px;
    padding: 16px;
    box-sizing: border-box;
  }
`;

const STotalAmount = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SPeriodText = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
`;

const SChartWrapper = styled.div`
  width: 100%;
  height: 387px;
  margin-top: 32px;
  position: relative;

  @media (max-width: 768px) {
    height: 300px;
    margin-top: 24px;
  }
`;

const SButtonWrapper = styled.div`
  width: 100%;
  margin-top: 24px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const SConfirmButtonWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const SBackButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: #f4f5f6;
  border: none;
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 6px;
  padding: 0;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const SBackIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const SHeaderRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const SPeriodSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SPeriodSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SPeriodButton = styled.button.attrs((props) => ({
  "data-active": props.$active ? "true" : "false",
}))`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: Montserrat;
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  vertical-align: middle;

  ${(props) =>
    !props.$active &&
    `
    font-weight: 400;
    color: #000;
    text-decoration: none;
  `}

  ${(props) =>
    props.$active &&
    `
    font-weight: 600;
    color: #1fa46c;
    text-decoration: underline;
  `}
  
  &:hover {
    font-weight: 600;
    color: #1fa46c;
    text-decoration: none;
  }

  transition: all 0.3s ease;
`;

// Компонент переключения периода для десктопа
const DesktopPeriodSwitcher = ({ activePeriod, onPeriodChange }) => {
  return (
    <SPeriodSwitcher>
      <SPeriodButton
        $active={activePeriod === "month"}
        onClick={() => onPeriodChange("month")}
      >
        Месяц
      </SPeriodButton>
      <SPeriodButton
        $active={activePeriod === "year"}
        onClick={() => onPeriodChange("year")}
      >
        Год
      </SPeriodButton>
    </SPeriodSwitcher>
  );
};

// Компонент переключения периода для мобильной версии
const MobilePeriodSwitcher = ({ activePeriod, onPeriodChange }) => {
  return (
    <SPeriodSwitcher style={{ marginBottom: "16px", padding: "0 16px" }}>
      <SPeriodButton
        $active={activePeriod === "month"}
        onClick={() => onPeriodChange("month")}
      >
        Месяц
      </SPeriodButton>
      <SPeriodButton
        $active={activePeriod === "year"}
        onClick={() => onPeriodChange("year")}
      >
        Год
      </SPeriodButton>
    </SPeriodSwitcher>
  );
};

// Компонент годового календаря
const YearCalendar = ({ selectedDates, onDateSelect }) => {
  const years = [2024, 2025];
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const isMonthSelected = (year, monthIndex) => {
    return selectedDates.some(
      (date) => date.getFullYear() === year && date.getMonth() === monthIndex
    );
  };

  const handleMonthClick = (year, monthIndex) => {
    const date = new Date(year, monthIndex, 1);
    onDateSelect(date);
  };

  return (
    <SCalendarScrollArea>
      {years.map((year) => (
        <SYearSection key={year}>
          <SYearTitle>{year}</SYearTitle>
          <SMonthsGrid>
            {months.map((month, index) => {
              const isSelected = isMonthSelected(year, index);
              return (
                <SMonthButton
                  key={`${year}-${index}`}
                  selected={isSelected}
                  onClick={() => handleMonthClick(year, index)}
                >
                  {month}
                </SMonthButton>
              );
            })}
          </SMonthsGrid>
        </SYearSection>
      ))}
    </SCalendarScrollArea>
  );
};

// Компонент месячного календаря
const MonthCalendar = ({ selectedDates, onDateSelect }) => {
  const months = [
    { year: 2024, month: 6, name: "Июль 2024" },
    { year: 2024, month: 7, name: "Август 2024" },
    { year: 2024, month: 8, name: "Сентябрь 2024" },
    { year: 2024, month: 9, name: "Октябрь 2024" },
    { year: 2024, month: 10, name: "Ноябрь 2024" },
    { year: 2024, month: 11, name: "Декабрь 2024" },
  ];

  const weekDays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const isDateSelected = (date) => {
    return selectedDates.some(
      (selected) =>
        selected.getDate() === date.getDate() &&
        selected.getMonth() === date.getMonth() &&
        selected.getFullYear() === date.getFullYear()
    );
  };

  const handleDateClick = (date) => {
    onDateSelect(date);
  };

  const renderMonth = (monthData) => {
    const { year, month, name } = monthData;
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = isDateSelected(date);

      days.push(
        <SCalendarDay
          key={day}
          selected={isSelected}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </SCalendarDay>
      );
    }

    return (
      <SMonthSection key={`${year}-${month}`}>
        <SMonthTitle>{name}</SMonthTitle>
        <SCalendarGrid>{days}</SCalendarGrid>
      </SMonthSection>
    );
  };

  return (
    <>
      <SWeekDays>
        {weekDays.map((day) => (
          <SWeekDay key={day}>{day}</SWeekDay>
        ))}
      </SWeekDays>
      <SCalendarScrollArea>{months.map(renderMonth)}</SCalendarScrollArea>
    </>
  );
};

// Компонент календаря для мобильной версии
const MobileCalendar = ({ selectedDates, onDateSelect }) => {
  const [activePeriod, setActivePeriod] = useState("month");

  return (
    <>
      <MobilePeriodSwitcher
        activePeriod={activePeriod}
        onPeriodChange={setActivePeriod}
      />
      <SCalendarContainer>
        <SCalendarContent>
          {activePeriod === "month" ? (
            <MonthCalendar
              selectedDates={selectedDates}
              onDateSelect={onDateSelect}
            />
          ) : (
            <YearCalendar
              selectedDates={selectedDates}
              onDateSelect={onDateSelect}
            />
          )}
        </SCalendarContent>
      </SCalendarContainer>
    </>
  );
};

// Компонент календаря для десктопной версии
const DesktopCalendar = ({ selectedDates, onDateSelect }) => {
  const [activePeriod, setActivePeriod] = useState("month");

  return (
    <SCalendarContainer>
      <SCalendarHeader>
        <SCalendarTitle>Период</SCalendarTitle>
        <DesktopPeriodSwitcher
          activePeriod={activePeriod}
          onPeriodChange={setActivePeriod}
        />
      </SCalendarHeader>
      <SCalendarContent>
        {activePeriod === "month" ? (
          <MonthCalendar
            selectedDates={selectedDates}
            onDateSelect={onDateSelect}
          />
        ) : (
          <YearCalendar
            selectedDates={selectedDates}
            onDateSelect={onDateSelect}
          />
        )}
      </SCalendarContent>
    </SCalendarContainer>
  );
};

// Основной компонент страницы анализа
const SpendAnalysisPage = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showCalendar, setShowCalendar] = useState(false);
  const chartRef = useRef(null);

  // ГЕНЕРИРУЕМ данные для ВСЕХ дней всех месяцев чтобы не было пропусков
  const generateExpensesData = () => {
    const data = {};
    const months = [
      { year: 2024, month: 6, name: "Июль" }, // Июль
      { year: 2024, month: 7, name: "Август" }, // Август
      { year: 2024, month: 8, name: "Сентябрь" }, // Сентябрь
      { year: 2024, month: 9, name: "Октябрь" }, // Октябрь
      { year: 2024, month: 10, name: "Ноябрь" }, // Ноябрь
      { year: 2024, month: 11, name: "Декабрь" }, // Декабрь
    ];

    // Базовые расходы по категориям для разных месяцев
    const baseExpenses = {
      6: {
        food: 12000,
        transport: 8000,
        housing: 12000,
        entertainment: 5000,
        education: 3500,
        other: 2500,
      }, // Июль
      7: {
        food: 11000,
        transport: 7500,
        housing: 12000,
        entertainment: 4500,
        education: 3200,
        other: 2200,
      }, // Август
      8: {
        food: 10000,
        transport: 7000,
        housing: 12000,
        entertainment: 4000,
        education: 3000,
        other: 2000,
      }, // Сентябрь
      9: {
        food: 13000,
        transport: 8500,
        housing: 12000,
        entertainment: 5500,
        education: 3800,
        other: 2800,
      }, // Октябрь
      10: {
        food: 9000,
        transport: 6000,
        housing: 12000,
        entertainment: 3500,
        education: 2800,
        other: 1800,
      }, // Ноябрь
      11: {
        food: 20000,
        transport: 12000,
        housing: 12000,
        entertainment: 9000,
        education: 6000,
        other: 4500,
      }, // Декабрь
    };

    months.forEach(({ year, month }) => {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const base = baseExpenses[month] || baseExpenses[6]; // fallback к июлю

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateKey = date.toISOString().split("T")[0];

        // Добавляем случайные вариации к базовым расходам (±20%)
        const variation = 0.8 + Math.random() * 0.4; // от 0.8 до 1.2

        data[dateKey] = {
          food: Math.round(base.food * variation),
          transport: Math.round(base.transport * variation),
          housing: Math.round(base.housing * variation), // жилье обычно постоянное
          entertainment: Math.round(base.entertainment * variation),
          education: Math.round(base.education * variation),
          other: Math.round(base.other * variation),
        };
      }
    });

    return data;
  };

  const expensesData = generateExpensesData();

  const backgroundColors = [
    "#D9B6FF", // Еда
    "#FFB53D", // Транспорт
    "#6EE4FE", // Жилье
    "#B0AEFF", // Развлечения
    "#BCEC30", // Образование
    "#FFB9B8", // Другое
  ];

  // Расчет данных для графика - ГАРАНТИРУЕМ что всегда есть данные
  const calculateChartData = () => {
    const categorySums = {
      food: 0,
      transport: 0,
      housing: 0,
      entertainment: 0,
      education: 0,
      other: 0,
    };

    // Если даты не выбраны, используем период 29 июля - 4 августа
    const datesToCalculate =
      selectedDates.length === 0
        ? [
            new Date(2024, 6, 29),
            new Date(2024, 6, 30),
            new Date(2024, 6, 31),
            new Date(2024, 7, 1),
            new Date(2024, 7, 2),
            new Date(2024, 7, 3),
            new Date(2024, 7, 4),
          ]
        : selectedDates;

    let hasValidData = false;

    datesToCalculate.forEach((date) => {
      const dateKey = date.toISOString().split("T")[0];
      const dayExpenses = expensesData[dateKey];

      if (dayExpenses) {
        hasValidData = true;
        categorySums.food += dayExpenses.food;
        categorySums.transport += dayExpenses.transport;
        categorySums.housing += dayExpenses.housing;
        categorySums.entertainment += dayExpenses.entertainment;
        categorySums.education += dayExpenses.education;
        categorySums.other += dayExpenses.other;
      }
    });

    // Если нет валидных данных, показываем нулевые значения вместо исчезновения
    if (!hasValidData && datesToCalculate.length > 0) {
      // Используем данные первого выбранного дня как fallback
      const firstDate = datesToCalculate[0];
      const dateKey = firstDate.toISOString().split("T")[0];
      const fallbackExpenses = expensesData[dateKey] || {
        food: 10000,
        transport: 7000,
        housing: 12000,
        entertainment: 4000,
        education: 3000,
        other: 2000,
      };

      categorySums.food = fallbackExpenses.food;
      categorySums.transport = fallbackExpenses.transport;
      categorySums.housing = fallbackExpenses.housing;
      categorySums.entertainment = fallbackExpenses.entertainment;
      categorySums.education = fallbackExpenses.education;
      categorySums.other = fallbackExpenses.other;
    }

    return {
      labels: [
        "Еда",
        "Транспорт",
        "Жилье",
        "Развлечения",
        "Образование",
        "Другое",
      ],
      datasets: [
        {
          label: "Расходы",
          data: [
            categorySums.food,
            categorySums.transport,
            categorySums.housing,
            categorySums.entertainment,
            categorySums.education,
            categorySums.other,
          ],
          backgroundColor: backgroundColors,
          borderRadius: 8,
          borderSkipped: false,
          barPercentage: 0.6,
          categoryPercentage: 0.8,
        },
      ],
    };
  };

  // Расчет общей суммы - ГАРАНТИРУЕМ что всегда есть сумма
  const calculateTotalAmount = () => {
    const datesToCalculate =
      selectedDates.length === 0
        ? [
            new Date(2024, 6, 29),
            new Date(2024, 6, 30),
            new Date(2024, 6, 31),
            new Date(2024, 7, 1),
            new Date(2024, 7, 2),
            new Date(2024, 7, 3),
            new Date(2024, 7, 4),
          ]
        : selectedDates;

    let total = 0;
    let hasValidData = false;

    datesToCalculate.forEach((date) => {
      const dateKey = date.toISOString().split("T")[0];
      const dayExpenses = expensesData[dateKey];

      if (dayExpenses) {
        hasValidData = true;
        total += Object.values(dayExpenses).reduce(
          (sum, expense) => sum + expense,
          0
        );
      }
    });

    // Fallback если нет данных
    if (!hasValidData && datesToCalculate.length > 0) {
      const firstDate = datesToCalculate[0];
      const dateKey = firstDate.toISOString().split("T")[0];
      const fallbackExpenses = expensesData[dateKey] || {
        food: 10000,
        transport: 7000,
        housing: 12000,
        entertainment: 4000,
        education: 3000,
        other: 2000,
      };
      total = Object.values(fallbackExpenses).reduce(
        (sum, expense) => sum + expense,
        0
      );
    }

    return total;
  };

  // ВАЖНО: Вызываем функции расчета на каждом рендере
  const chartData = calculateChartData();
  const totalAmount = calculateTotalAmount();

  // Кастомный плагин для отображения значений над столбцами
  const customDataLabelsPlugin = {
    id: "customDataLabels",
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.font = isMobile
        ? "600 10px Montserrat, sans-serif"
        : "600 16px Montserrat, sans-serif";
      ctx.fillStyle = "#000";

      chart.data.datasets.forEach((dataset, datasetIndex) => {
        const meta = chart.getDatasetMeta(datasetIndex);
        meta.data.forEach((bar, index) => {
          const data = dataset.data[index];
          if (data > 0) {
            ctx.fillText(data.toLocaleString() + " ₽", bar.x, bar.y - 8);
          }
        });
      });

      ctx.restore();
    },
  };

  // Настройки графика
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      y: {
        display: false,
        beginAtZero: true,
        // Гарантируем что всегда есть suggestedMax
        suggestedMax: Math.max(...chartData.datasets[0].data) * 1.2 || 50000,
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
    },
    layout: {
      padding: {
        top: 40,
      },
    },
    // Плавная анимация изменений
    animation: {
      duration: 500,
      easing: "easeOutQuart",
    },
    hover: {
      animationDuration: 0,
    },
    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
  };

  // Регистрируем кастомный плагин
  useEffect(() => {
    ChartJS.register(customDataLabelsPlugin);

    return () => {
      ChartJS.unregister(customDataLabelsPlugin);
    };
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowCalendar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDates((prev) => {
      const exists = prev.some((d) => d.getTime() === date.getTime());

      if (exists) {
        return prev.filter((d) => d.getTime() !== date.getTime());
      } else {
        return [...prev, date];
      }
    });
  };

  const getSelectedPeriodText = () => {
    if (selectedDates.length === 0) {
      return "Расходы за 29 июля 2024 — 4 августа 2024";
    }

    const sortedDates = [...selectedDates].sort((a, b) => a - b);
    const start = sortedDates[0];
    const end = sortedDates[sortedDates.length - 1];

    const formatDate = (date) => {
      return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    if (selectedDates.length === 1) {
      return `Расходы за ${formatDate(start)}`;
    } else {
      return `Расходы за ${formatDate(start)} — ${formatDate(end)}`;
    }
  };

  // Для мобильной версии - страница выбора периода
  if (isMobile && showCalendar) {
    return (
      <>
        <Header />
        <SGlobalWrapper>
          <SContainer>
            <SPageContainer>
              <SHeaderRow>
                <SBackButton onClick={() => setShowCalendar(false)}>
                  <SBackIcon src="arrow-left@2x.png" alt="Назад" />
                </SBackButton>
                <SMobileCalendarTitle>Анализ расходов</SMobileCalendarTitle>
              </SHeaderRow>
              <SMobilePeriodTitle>Выбор периода</SMobilePeriodTitle>
              <MobileCalendar
                selectedDates={selectedDates}
                onDateSelect={handleDateSelect}
              />
              <SConfirmButtonWrapper>
                <BaseButton
                  text="Выбрать период"
                  onClick={() => setShowCalendar(false)}
                  active={true}
                />
              </SConfirmButtonWrapper>
            </SPageContainer>
          </SContainer>
        </SGlobalWrapper>
      </>
    );
  }

  // Для мобильной версии - основная страница анализа
  if (isMobile) {
    return (
      <>
        <Header />
        <SGlobalWrapper>
          <SContainer>
            <SPageContainer>
              <SMobilePageTitle>Анализ расходов</SMobilePageTitle>

              <SChartContainer>
                <STotalAmount>{totalAmount.toLocaleString()} ₽</STotalAmount>
                <SPeriodText>{getSelectedPeriodText()}</SPeriodText>

                <SChartWrapper>
                  <Bar
                    key={`mobile-${selectedDates.length}-${totalAmount}`}
                    ref={chartRef}
                    data={chartData}
                    options={chartOptions}
                  />
                </SChartWrapper>
              </SChartContainer>

              <SButtonWrapper>
                <BaseButton
                  text="Выбрать другой период"
                  onClick={() => setShowCalendar(true)}
                  active={true}
                />
              </SButtonWrapper>
            </SPageContainer>
          </SContainer>
        </SGlobalWrapper>
      </>
    );
  }

  // Десктопная версия
  return (
    <>
      <Header />
      <SGlobalWrapper>
        <SContainer>
          <SPageContainer>
            <STitle>Анализ расходов</STitle>

            <SContent>
              <DesktopCalendar
                selectedDates={selectedDates}
                onDateSelect={handleDateSelect}
              />

              <SChartContainer>
                <STotalAmount>{totalAmount.toLocaleString()} ₽</STotalAmount>
                <SPeriodText>{getSelectedPeriodText()}</SPeriodText>

                <SChartWrapper>
                  <Bar
                    key={`desktop-${selectedDates.length}-${totalAmount}`}
                    ref={chartRef}
                    data={chartData}
                    options={chartOptions}
                  />
                </SChartWrapper>
              </SChartContainer>
            </SContent>
          </SPageContainer>
        </SContainer>
      </SGlobalWrapper>
    </>
  );
};

export default SpendAnalysisPage;
