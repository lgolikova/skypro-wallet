import React, { useState, useEffect } from "react";
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

  // Новые цвета для столбцов
  const backgroundColors = [
    "#D9B6FF", // Еда
    "#FFB53D", // Транспорт
    "#6EE4FE", // Жилье
    "#B0AEFF", // Развлечения
    "#BCEC30", // Образование
    "#FFB9B8", // Другое
  ];

  // Данные для графика
  const chartData = {
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
        data: [21990, 19106, 13050, 11046, 8500, 4300],
        backgroundColor: backgroundColors,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

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
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
        },
        ticks: {
          callback: function (value) {
            return value.toLocaleString() + " ₽";
          },
          font: {
            size: isMobile ? 10 : 12,
          },
        },
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
    // Настройки для отображения значений над столбцами
    animation: {
      duration: 1000,
      onComplete: function () {
        const ctx = this.ctx;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.font = isMobile ? "10px Montserrat" : "16px Montserrat";
        ctx.fillStyle = "#000";

        this.data.datasets.forEach((dataset, i) => {
          const meta = this.getDatasetMeta(i);
          meta.data.forEach((bar, index) => {
            const data = dataset.data[index];
            if (data > 0) {
              ctx.fillText(data.toLocaleString() + " ₽", bar.x, bar.y - 5);
            }
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
      return "Выберите период";
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

    return `${formatDate(start)} — ${formatDate(end)}`;
  };

  const totalAmount = selectedDates.length > 0 ? 65192 : 0;

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
                <SPeriodText>
                  Расходы за 29 июля 2024 — 4 августа 2024
                </SPeriodText>

                <SChartWrapper>
                  <Bar data={chartData} options={chartOptions} />
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

                <SChartWrapper>
                  <Bar data={chartData} options={chartOptions} />
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
