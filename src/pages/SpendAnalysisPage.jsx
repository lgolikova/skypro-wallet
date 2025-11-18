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

// Регистрируем компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Стилизованные компоненты
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
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin-bottom: 20px;
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
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 16px;
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
  background: ${(props) => (props.selected ? "#565eef" : "#F4F5F6")};
  color: ${(props) => (props.selected ? "#FFFFFF" : "#000000")};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.selected ? "#565eef" : "#e0e0e0")};
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

const SSelectPeriodButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #565eef;
  color: white;
  border: none;
  border-radius: 6px;
  margin-top: 24px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background-color: #4a52d4;
  }
`;

const SConfirmButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #565eef;
  color: white;
  border: none;
  border-radius: 6px;
  margin-top: 20px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background-color: #4a52d4;
  }
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

// Компонент календаря для мобильной версии
const MobileCalendar = ({ selectedDates, onDateSelect }) => {
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

    // Добавляем пустые ячейки для дней до первого дня месяца
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    // Добавляем дни месяца
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
    <SCalendarContainer>
      <SCalendarContent>
        <SWeekDays>
          {weekDays.map((day) => (
            <SWeekDay key={day}>{day}</SWeekDay>
          ))}
        </SWeekDays>
        <SCalendarScrollArea>{months.map(renderMonth)}</SCalendarScrollArea>
      </SCalendarContent>
    </SCalendarContainer>
  );
};

// Компонент календаря для десктопной версии
const DesktopCalendar = ({ selectedDates, onDateSelect }) => {
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

    // Добавляем пустые ячейки для дней до первого дня месяца
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    // Добавляем дни месяца
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
    <SCalendarContainer>
      <SCalendarHeader>
        <SCalendarTitle>Период</SCalendarTitle>
      </SCalendarHeader>
      <SCalendarContent>
        <SWeekDays>
          {weekDays.map((day) => (
            <SWeekDay key={day}>{day}</SWeekDay>
          ))}
        </SWeekDays>
        <SCalendarScrollArea>{months.map(renderMonth)}</SCalendarScrollArea>
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

  // Полные данные расходов по всем дням (имитация данных с API)
  const expensesData = {
    // Июль 2024
    "2024-07-29": {
      food: 21990,
      transport: 19106,
      housing: 13050,
      entertainment: 11046,
      education: 8500,
      other: 4300,
    },
    "2024-07-30": {
      food: 18500,
      transport: 15200,
      housing: 11500,
      entertainment: 9200,
      education: 6800,
      other: 3500,
    },
    "2024-07-31": {
      food: 24500,
      transport: 19800,
      housing: 14200,
      entertainment: 12500,
      education: 9200,
      other: 4800,
    },
    "2024-08-01": {
      food: 19800,
      transport: 16500,
      housing: 12100,
      entertainment: 9800,
      education: 7200,
      other: 3900,
    },
    "2024-08-02": {
      food: 23100,
      transport: 18700,
      housing: 13500,
      entertainment: 11800,
      education: 8900,
      other: 4600,
    },
    "2024-08-03": {
      food: 17200,
      transport: 14300,
      housing: 10800,
      entertainment: 8500,
      education: 6100,
      other: 3200,
    },
    "2024-08-04": {
      food: 25600,
      transport: 21000,
      housing: 14800,
      entertainment: 13200,
      education: 9800,
      other: 5200,
    },
  };

  // Новые цвета для столбцов
  const backgroundColors = [
    "#D9B6FF", // Еда
    "#FFB53D", // Транспорт
    "#6EE4FE", // Жилье
    "#B0AEFF", // Развлечения
    "#BCEC30", // Образование
    "#FFB9B8", // Другое
  ];

  // Расчет данных для графика на основе выбранных дат
  const calculateChartData = () => {
    // Суммируем расходы по категориям за выбранные даты
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

    datesToCalculate.forEach((date) => {
      const dateKey = date.toISOString().split("T")[0];
      const dayExpenses = expensesData[dateKey];

      if (dayExpenses) {
        categorySums.food += dayExpenses.food;
        categorySums.transport += dayExpenses.transport;
        categorySums.housing += dayExpenses.housing;
        categorySums.entertainment += dayExpenses.entertainment;
        categorySums.education += dayExpenses.education;
        categorySums.other += dayExpenses.other;
      }
    });

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
          // Настройки ширины столбцов
          barPercentage: 0.6,
          categoryPercentage: 0.8,
        },
      ],
    };
  };

  // Расчет общей суммы расходов
  const calculateTotalAmount = () => {
    // Если даты не выбраны, считаем за период 29 июля - 4 августа
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
    datesToCalculate.forEach((date) => {
      const dateKey = date.toISOString().split("T")[0];
      const dayExpenses = expensesData[dateKey];

      if (dayExpenses) {
        total += Object.values(dayExpenses).reduce(
          (sum, expense) => sum + expense,
          0
        );
      }
    });

    return total;
  };

  const chartData = calculateChartData();
  const totalAmount = calculateTotalAmount();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.parsed.y.toLocaleString() + " ₽";
          },
        },
      },
    },
    scales: {
      y: {
        display: false, // Убираем ось Y
        beginAtZero: true,
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
        top: 40, // Добавляем отступ сверху для цифр
      },
    },
    // Настройки для отображения значений над столбцами
    animation: {
      duration: 1000,
      onComplete: function () {
        const ctx = this.ctx;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        // Используем точные размеры из дизайна
        ctx.font = isMobile
          ? "600 10px Montserrat, sans-serif"
          : "600 16px Montserrat, sans-serif";
        ctx.fillStyle = "#000";

        this.data.datasets.forEach((dataset, i) => {
          const meta = this.getDatasetMeta(i);
          meta.data.forEach((bar, index) => {
            const data = dataset.data[index];
            // Всегда показываем суммы
            ctx.fillText(data.toLocaleString() + " ₽", bar.x, bar.y - 8);
          });
        });
      },
    },
  };

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

    return `Расходы за ${formatDate(start)} — ${formatDate(end)}`;
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
              <SConfirmButton onClick={() => setShowCalendar(false)}>
                Выбрать период
              </SConfirmButton>
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

                {/* График всегда отображается с суммами над столбцами */}
                <SChartWrapper>
                  <Bar ref={chartRef} data={chartData} options={chartOptions} />
                </SChartWrapper>
              </SChartContainer>

              <SSelectPeriodButton onClick={() => setShowCalendar(true)}>
                Выбрать другой период
              </SSelectPeriodButton>
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

                {/* График всегда отображается с суммами над столбцами */}
                <SChartWrapper>
                  <Bar ref={chartRef} data={chartData} options={chartOptions} />
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
