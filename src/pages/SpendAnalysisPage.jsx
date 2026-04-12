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
const API_BASE_URL = "https://wedev-api.sky.pro/api";

// ВАШ ТОКЕН (вставлен из ответа API)
const TEMP_TOKEN =
  "cwb8cscwd0csb8co74b8dcasc4cgc0b854b0ccc46gcwb8cscw5g5k5o5s5w6g39k3bo3d03d43co3bc3e43c43k3983co3cc3e83bw3co3bc3b43d43bo3cc3e8";

// Получить транзакции за период
const getTransactionsByPeriod = async (startDate, endDate) => {
  try {
    // Формат даты для API: M-D-YYYY (как в документации: "6-1-2025")
    const formatDateForAPI = (date) => {
      const month = String(date.getMonth() + 1); // Без ведущих нулей
      const day = String(date.getDate()); // Без ведущих нулей
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    };

    const requestData = {
      start: formatDateForAPI(startDate),
      end: formatDateForAPI(endDate),
    };

    console.log("📅 Запрос транзакций за период:", requestData);
    console.log("🔑 Используем токен:", TEMP_TOKEN.substring(0, 20) + "...");

    const response = await fetch(`${API_BASE_URL}/transactions/period`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TEMP_TOKEN}`,
        // ВАЖНО: для этого API НЕ добавляем Content-Type!
      },
      body: JSON.stringify(requestData),
    });

    console.log("📊 Статус ответа API:", response.status, response.statusText);

    if (response.status === 401) {
      console.error("❌ Ошибка 401: Токен невалиден или просрочен");
      return getMockTransactions(startDate, endDate);
    }

    if (!response.ok) {
      console.warn(
        `❌ API вернул ошибку ${response.status}, используем моковые данные`
      );
      return getMockTransactions(startDate, endDate);
    }

    const data = await response.json();
    console.log("✅ Получены транзакции от API:", data.length || 0, "записей");
    return data || [];
  } catch (error) {
    console.warn("❌ Ошибка сети, используем моковые данные:", error);
    return getMockTransactions(startDate, endDate);
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
  background: ${(props) =>
    props["data-selected"] === "true" ? "#DBFFE9" : "#F4F5F6"};
  color: ${(props) =>
    props["data-selected"] === "true" ? "#1fa46c" : "#000000"};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${(props) =>
    props["data-selected"] === "true" ? "600" : "normal"};
  position: relative;

  &:hover {
    background: ${(props) =>
      props["data-selected"] === "true" ? "#DBFFE9" : "#e0e0e0"};
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
  background: ${(props) =>
    props["data-selected"] === "true" ? "#DBFFE9" : "#F4F5F6"};
  color: ${(props) =>
    props["data-selected"] === "true" ? "#1fa46c" : "#000000"};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${(props) =>
    props["data-selected"] === "true" ? "600" : "normal"};
  padding: 6px 0;
  gap: 6px;

  &:hover {
    background: ${(props) =>
      props["data-selected"] === "true" ? "#DBFFE9" : "#e0e0e0"};
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

const SPeriodSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SPeriodButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: Montserrat;
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  vertical-align: middle;
  font-weight: ${(props) => (props["data-active"] === "true" ? "600" : "400")};
  color: ${(props) => (props["data-active"] === "true" ? "#1fa46c" : "#000")};
  text-decoration: ${(props) =>
    props["data-active"] === "true" ? "underline" : "none"};

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

// Моковые данные для демонстрации
const getMockTransactions = (startDate, endDate) => {
  const categories = [
    "food",
    "transport",
    "housing",
    "joy",
    "education",
    "others",
  ];
  const baseSums = {
    food: 12500,
    transport: 8500,
    housing: 22000,
    joy: 6400,
    education: 3200,
    others: 4800,
  };

  const transactions = [];

  // Генерируем реалистичные данные
  const daysDiff =
    Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) || 30;

  categories.forEach((category) => {
    const numTransactions = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numTransactions; i++) {
      const randomDay = new Date(
        startDate.getTime() +
          Math.floor(Math.random() * daysDiff) * 24 * 60 * 60 * 1000
      );

      transactions.push({
        _id: `mock_${Date.now()}_${category}_${i}`,
        userId: "mock_user_id",
        description: `${categoryMapping[category]} ${i + 1}`,
        category: category,
        date: randomDay.toISOString(),
        sum: Math.floor(
          (baseSums[category] / numTransactions) * (0.7 + Math.random() * 0.6)
        ),
      });
    }
  });

  console.log("📊 Созданы моковые транзакции:", transactions.length);
  return transactions;
};

// Компонент переключения периода для десктопа
const DesktopPeriodSwitcher = ({ activePeriod, onPeriodChange }) => {
  return (
    <SPeriodSwitcher>
      <SPeriodButton
        data-active={activePeriod === "month" ? "true" : "false"}
        onClick={() => onPeriodChange("month")}
      >
        Месяц
      </SPeriodButton>
      <SPeriodButton
        data-active={activePeriod === "year" ? "true" : "false"}
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
        data-active={activePeriod === "month" ? "true" : "false"}
        onClick={() => onPeriodChange("month")}
      >
        Месяц
      </SPeriodButton>
      <SPeriodButton
        data-active={activePeriod === "year" ? "true" : "false"}
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

  const isMonthSelected = (year, monthIndex, selectedDates) => {
    if (!selectedDates || selectedDates.length === 0) return false;

    if (selectedDates.length === 2) {
      const [start, end] = selectedDates.sort((a, b) => a - b);
      const currentMonthStart = new Date(year, monthIndex, 1);
      const currentMonthEnd = new Date(year, monthIndex + 1, 0);

      return currentMonthStart >= start && currentMonthEnd <= end;
    }

    if (selectedDates.length === 1) {
      const date = selectedDates[0];
      return date.getFullYear() === year && date.getMonth() === monthIndex;
    }

    return false;
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
              const isSelected = isMonthSelected(year, index, selectedDates);
              return (
                <SMonthButton
                  key={`${year}-${index}`}
                  data-selected={isSelected ? "true" : "false"}
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

  const isDateSelected = (date, selectedDates) => {
    if (!selectedDates || selectedDates.length === 0) return false;

    if (selectedDates.length === 2) {
      const [start, end] = selectedDates.sort((a, b) => a - b);
      return date >= start && date <= end;
    }

    if (selectedDates.length === 1) {
      const selectedDate = selectedDates[0];
      return (
        selectedDate.getDate() === date.getDate() &&
        selectedDate.getMonth() === date.getMonth() &&
        selectedDate.getFullYear() === date.getFullYear()
      );
    }

    return false;
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
      const isSelected = isDateSelected(date, selectedDates);

      days.push(
        <SCalendarDay
          key={day}
          data-selected={isSelected ? "true" : "false"}
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
  const [selectionStart, setSelectionStart] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showCalendar, setShowCalendar] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  // Цвета для категорий (цветная шкала)
  const backgroundColors = [
    "#D9B6FF", // Еда
    "#FFB53D", // Транспорт
    "#6EE4FE", // Жилье
    "#B0AEFF", // Развлечения
    "#BCEC30", // Образование
    "#FFB9B8", // Другое
  ];

  // Функция для нормализации даты
  const normalizeDate = (date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

  // Функция для загрузки транзакций
  const fetchTransactionsForPeriod = async (startDate, endDate) => {
    setLoading(true);
    setError(null);

    try {
      console.log("🔄 Загрузка транзакций за период...");

      // Получаем транзакции через API
      const apiTransactions = await getTransactionsByPeriod(startDate, endDate);

      if (apiTransactions && Array.isArray(apiTransactions)) {
        console.log(`✅ Получено ${apiTransactions.length} транзакций от API`);
        setTransactions(apiTransactions);
      } else {
        console.log("⚠️  API вернул некорректные данные, используем моковые");
        const mockTransactions = getMockTransactions(startDate, endDate);
        setTransactions(mockTransactions);
      }
    } catch (error) {
      console.error("❌ Ошибка при получении данных:", error);
      setError(
        "Не удалось загрузить данные. Используем демонстрационные данные."
      );
      // В случае ошибки используем моковые данные
      const mockTransactions = getMockTransactions(startDate, endDate);
      setTransactions(mockTransactions);
    } finally {
      setLoading(false);
    }
  };

  // Расчет данных для графика
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
    if (Array.isArray(transactions) && transactions.length > 0) {
      transactions.forEach((transaction) => {
        const category = transaction.category;
        if (category && categorySums[category] !== undefined) {
          categorySums[category] += parseFloat(transaction.sum) || 0;
        }
      });
    }

    const data = [
      categorySums.food,
      categorySums.transport,
      categorySums.housing,
      categorySums.joy,
      categorySums.education,
      categorySums.others,
    ];

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
          data: data,
          backgroundColor: backgroundColors,
          borderRadius: 8,
          borderSkipped: false,
          barPercentage: 0.6,
          categoryPercentage: 0.8,
        },
      ],
    };
  };

  // Расчет общей суммы
  const calculateTotalAmount = () => {
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return 0;
    }
    return transactions.reduce(
      (total, transaction) => total + (parseFloat(transaction.sum) || 0),
      0
    );
  };

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
            // Полные числа без сокращений
            ctx.fillText(data.toLocaleString() + " ₽", bar.x, bar.y - 8);
          }
        });
      });

      ctx.restore();
    },
  };

  // Регистрируем кастомный плагин
  useEffect(() => {
    ChartJS.register(customDataLabelsPlugin);

    return () => {
      ChartJS.unregister(customDataLabelsPlugin);
    };
  }, [isMobile]);

  // Загружаем начальные данные при монтировании компонента
  useEffect(() => {
    const initializeData = async () => {
      const today = new Date();
      const monthAgo = new Date();
      monthAgo.setMonth(today.getMonth() - 1);

      // Загружаем данные за последний месяц
      fetchTransactionsForPeriod(monthAgo, today);
    };

    initializeData();
  }, []);

  // Эффект для обновления данных при изменении выбранных дат
  useEffect(() => {
    if (selectedDates.length === 2) {
      const [start, end] = selectedDates.sort((a, b) => a - b);
      fetchTransactionsForPeriod(start, end);
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

  // Функция выбора даты
  const handleDateSelect = (date) => {
    const normalizedDate = normalizeDate(date);

    // Если ничего не выбрано - начинаем выбор
    if (selectedDates.length === 0) {
      setSelectedDates([normalizedDate]);
      setSelectionStart(normalizedDate);
      return;
    }

    // Если выбрана только начальная дата
    if (selectedDates.length === 1 && selectionStart) {
      // Проверяем, кликнули ли на ту же дату
      if (normalizedDate.getTime() === selectionStart.getTime()) {
        // Сбрасываем выбор
        setSelectedDates([]);
        setSelectionStart(null);
        return;
      }

      // Завершаем выбор - устанавливаем конечную дату
      let start = selectionStart;
      let end = normalizedDate;

      // Сортируем даты
      if (end < start) {
        [start, end] = [end, start];
      }

      // Устанавливаем выбранные даты
      setSelectedDates([start, end]);
      setSelectionStart(null);
      return;
    }

    // Если период уже выбран (2 даты)
    if (selectedDates.length === 2) {
      // Проверяем, кликнули ли на одну из выбранных дат
      const isStartDate =
        selectedDates[0].getTime() === normalizedDate.getTime();
      const isEndDate = selectedDates[1].getTime() === normalizedDate.getTime();

      if (isStartDate || isEndDate) {
        // Сбрасываем выбор полностью
        setSelectedDates([]);
      } else {
        // Начинаем новый выбор с этой даты
        setSelectedDates([normalizedDate]);
        setSelectionStart(normalizedDate);
      }
      return;
    }
  };

  const handleRetry = () => {
    if (selectedDates.length === 2) {
      const [start, end] = selectedDates.sort((a, b) => a - b);
      fetchTransactionsForPeriod(start, end);
    } else {
      const today = new Date();
      const monthAgo = new Date();
      monthAgo.setMonth(today.getMonth() - 1);
      fetchTransactionsForPeriod(monthAgo, today);
    }
  };

  // Текст под общей суммой
  const getSelectedPeriodText = () => {
    if (selectedDates.length === 0) {
      return "Расходы за последний месяц";
    }

    if (selectedDates.length === 2) {
      const [start, end] = selectedDates.sort((a, b) => a - b);

      const formatDate = (date) => {
        return date.toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      };

      return `Расходы за ${formatDate(start)} — ${formatDate(end)}`;
    }

    if (selectionStart) {
      const formatDate = (date) => {
        return date.toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      };
      return `Выберите конечную дату (выбрано: ${formatDate(selectionStart)})`;
    }

    return "Расходы";
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
        display: false, // Боковая ось скрыта
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
                />
              </SConfirmButtonWrapper>
            </SPageContainer>
          </SContainer>
        </SGlobalWrapper>
      </>
    );
  }

  const chartData = calculateChartData();
  const totalAmount = calculateTotalAmount();

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
                  {loading ? (
                    <SLoadingText>Загрузка данных...</SLoadingText>
                  ) : error ? (
                    <div>
                      <SErrorText>{error}</SErrorText>
                      <SRetryButton onClick={handleRetry}>
                        Попробовать снова
                      </SRetryButton>
                    </div>
                  ) : (
                    <Bar
                      key={`mobile-${selectedDates.length}-${totalAmount}`}
                      ref={chartRef}
                      data={chartData}
                      options={chartOptions}
                    />
                  )}
                </SChartWrapper>
              </SChartContainer>

              <SButtonWrapper>
                <BaseButton
                  text="Выбрать другой период"
                  onClick={() => setShowCalendar(true)}
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
                  {loading ? (
                    <SLoadingText>Загрузка данных...</SLoadingText>
                  ) : error ? (
                    <div>
                      <SErrorText>{error}</SErrorText>
                      <SRetryButton onClick={handleRetry}>
                        Попробовать снова
                      </SRetryButton>
                    </div>
                  ) : (
                    <Bar
                      key={`desktop-${selectedDates.length}-${totalAmount}`}
                      ref={chartRef}
                      data={chartData}
                      options={chartOptions}
                    />
                  )}
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
