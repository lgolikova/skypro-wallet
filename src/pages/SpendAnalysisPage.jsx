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

// Сервис для работы с API транзакций
const API_BASE_URL = "https://wedev-api.sky.pro/api/transactions";

const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Получить транзакции за период
const getTransactionsByPeriod = async (startDate, endDate) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No auth token found");
    }

    const formatDateForAPI = (date) => {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    };

    const response = await fetch(`${API_BASE_URL}/period`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        start: formatDateForAPI(startDate),
        end: formatDateForAPI(endDate),
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching transactions by period:", error);
    throw error;
  }
};

// Маппинг категорий API на русские названия
const categoryMapping = {
  food: "Еда",
  transport: "Транспорт",
  housing: "Жилье",
  joy: "Развлечения",
  education: "Образование",
  others: "Другое",
};

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

const SLoadingText = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 16px;
`;

const SErrorText = styled.div`
  text-align: center;
  padding: 20px;
  color: #ff4444;
  font-size: 16px;
`;

const SRetryButton = styled.button`
  background: #1fa46c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #188c5c;
  }
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
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  // Функция для загрузки транзакций за выбранный период
  const fetchTransactionsForPeriod = async (dates) => {
    if (dates.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const datesToCalculate = getSelectedDays(dates);
      if (datesToCalculate.length === 0) return;

      // Находим минимальную и максимальную дату
      const sortedDates = [...datesToCalculate].sort((a, b) => a - b);
      const startDate = sortedDates[0];
      const endDate = sortedDates[sortedDates.length - 1];

      const transactionsData = await getTransactionsByPeriod(
        startDate,
        endDate
      );
      setTransactions(transactionsData);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setError("Ошибка при загрузке транзакций. Проверьте авторизацию.");
    } finally {
      setLoading(false);
    }
  };

  // Функция для получения всех дней месяца
  const getDaysInMonth = (year, month) => {
    const days = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  // Функция для определения режима выбора
  const detectSelectionMode = (dates) => {
    if (dates.length === 0) return "days";

    // Если все даты - это первые числа месяцев, значит это выбор месяцев
    const allAreFirstDays = dates.every((date) => date.getDate() === 1);
    return allAreFirstDays ? "months" : "days";
  };

  // Функция для получения дней для расчета
  const getSelectedDays = (dates = selectedDates) => {
    if (dates.length === 0) {
      // Период по умолчанию: 29 июля - 4 августа 2024
      return [
        new Date(2024, 6, 29),
        new Date(2024, 6, 30),
        new Date(2024, 6, 31),
        new Date(2024, 7, 1),
        new Date(2024, 7, 2),
        new Date(2024, 7, 3),
        new Date(2024, 7, 4),
      ];
    }

    const currentMode = detectSelectionMode(dates);

    if (currentMode === "months") {
      // Режим выбора месяцев - берем все дни выбранных месяцев
      const monthsMap = new Map();

      dates.forEach((date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const key = `${year}-${month}`;

        if (!monthsMap.has(key)) {
          monthsMap.set(key, { year, month });
        }
      });

      const allDays = [];
      monthsMap.forEach(({ year, month }) => {
        const daysInMonth = getDaysInMonth(year, month);
        allDays.push(...daysInMonth);
      });

      return allDays;
    } else {
      // Режим выбора дней - берем только выбранные дни
      return [...dates].sort((a, b) => a - b);
    }
  };

  // Расчет данных для графика на основе реальных транзакций
  const calculateChartData = () => {
    const categorySums = {
      food: 0,
      transport: 0,
      housing: 0,
      joy: 0,
      education: 0,
      others: 0,
    };

    // Группируем транзакции по категориям
    transactions.forEach((transaction) => {
      const category = transaction.category;
      if (categorySums.hasOwnProperty(category)) {
        categorySums[category] += transaction.sum;
      }
    });

    return {
      labels: [
        categoryMapping.food,
        categoryMapping.transport,
        categoryMapping.housing,
        categoryMapping.joy,
        categoryMapping.education,
        categoryMapping.others,
      ],
      datasets: [
        {
          label: "Расходы",
          data: [
            categorySums.food,
            categorySums.transport,
            categorySums.housing,
            categorySums.joy,
            categorySums.education,
            categorySums.others,
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

  // Расчет общей суммы на основе реальных транзакций
  const calculateTotalAmount = () => {
    return transactions.reduce(
      (total, transaction) => total + transaction.sum,
      0
    );
  };

  // Цвета для категорий
  const backgroundColors = [
    "#D9B6FF", // Еда
    "#FFB53D", // Транспорт
    "#6EE4FE", // Жилье
    "#B0AEFF", // Развлечения
    "#BCEC30", // Образование
    "#FFB9B8", // Другое
  ];

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

  // Эффект для загрузки данных при изменении выбранных дат
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Пожалуйста, войдите в систему для просмотра анализа расходов");
      setLoading(false);
      return;
    }

    if (selectedDates.length > 0) {
      fetchTransactionsForPeriod(selectedDates);
    } else {
      // Установка дат по умолчанию при первом рендере
      const defaultDates = [
        new Date(2024, 6, 29),
        new Date(2024, 6, 30),
        new Date(2024, 6, 31),
        new Date(2024, 7, 1),
        new Date(2024, 7, 2),
        new Date(2024, 7, 3),
        new Date(2024, 7, 4),
      ];
      setSelectedDates(defaultDates);
    }
  }, [selectedDates]);

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
        const newDates = prev.filter((d) => d.getTime() !== date.getTime());
        return newDates;
      } else {
        return [...prev, date];
      }
    });
  };

  const handleRetry = () => {
    fetchTransactionsForPeriod(selectedDates);
  };

  const getSelectedPeriodText = () => {
    if (selectedDates.length === 0) {
      return "Расходы за 29 июля 2024 — 4 августа 2024";
    }

    const currentMode = detectSelectionMode(selectedDates);
    const sortedDates = [...selectedDates].sort((a, b) => a - b);

    const formatDate = (date) => {
      return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    if (currentMode === "months") {
      // Режим месяцев - показываем периоды с 1 по последнее число
      const monthsMap = new Map();

      sortedDates.forEach((date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const key = `${year}-${month}`;
        if (!monthsMap.has(key)) {
          monthsMap.set(key, { year, month });
        }
      });

      const months = Array.from(monthsMap.values()).sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return a.month - b.month;
      });

      if (months.length === 1) {
        const { year, month } = months[0];
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        return `Расходы за ${formatDate(firstDay)} — ${formatDate(lastDay)}`;
      } else {
        const firstMonth = months[0];
        const lastMonth = months[months.length - 1];
        const startDate = new Date(firstMonth.year, firstMonth.month, 1);
        const endDate = new Date(lastMonth.year, lastMonth.month + 1, 0);
        return `Расходы за ${formatDate(startDate)} — ${formatDate(endDate)}`;
      }
    } else {
      // Режим дней - показываем точные выбранные даты
      if (sortedDates.length === 1) {
        return `Расходы за ${formatDate(sortedDates[0])}`;
      } else {
        const start = sortedDates[0];
        const end = sortedDates[sortedDates.length - 1];
        return `Расходы за ${formatDate(start)} — ${formatDate(end)}`;
      }
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
                  $active={true}
                />
              </SConfirmButtonWrapper>
            </SPageContainer>
          </SContainer>
        </SGlobalWrapper>
      </>
    );
  }

  // Компоненты для состояний загрузки и ошибки
  if (loading) {
    return (
      <>
        <Header />
        <SGlobalWrapper>
          <SContainer>
            <SPageContainer>
              <STitle>Анализ расходов</STitle>
              <SLoadingText>Загрузка данных...</SLoadingText>
            </SPageContainer>
          </SContainer>
        </SGlobalWrapper>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <SGlobalWrapper>
          <SContainer>
            <SPageContainer>
              <STitle>Анализ расходов</STitle>
              <SErrorText>{error}</SErrorText>
              <div style={{ textAlign: "center", marginTop: "16px" }}>
                <SRetryButton onClick={handleRetry}>
                  Повторить попытку
                </SRetryButton>
              </div>
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
                  $active={true}
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
