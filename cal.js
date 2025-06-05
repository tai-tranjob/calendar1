let toDay = new Date();
const header = document.getElementById("calendar-today");
const dateHeader = document.getElementById("date-today");
const dayWeek = document.getElementById("week-today");
const tableCalendar = document.getElementById("calendar-table");
const dayCard = document.getElementById("day-card");
const lastYear = document.getElementById("last-year");
const lastMonth = document.getElementById("last-month");
const nextYear = document.getElementById("next-year");
const nextMonth = document.getElementById("next-month");
const backToday = document.getElementById("back-today");
const selectDay = document.getElementById("selectDay");
const selectMonth = document.getElementById("selectMonth");
const dateValue = document.getElementById("selectDay")
const monthValue = document.getElementById("selectMonth");
const yearValue = document.getElementById("year");
const confirmButton = document.getElementById("work");
let checkErrorDate = {date: 5 ,month:5 ,year:2025};

function getDaysInMonth(month, year) {
  let date = new Date(year, month, 1);
  let days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
function getDaysAmountInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getDayInWeek(number) {
  const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  return days[number] || "";
}

function isValidDate(date) {
  return (
    date.date <= getDaysAmountInMonth(date.month, date.year) &&
    date.date > 0 &&
    date.year > 1900
  );
}

backToday.addEventListener("click", () => {
  const newDate = { date: toDay.getDate(), month: toDay.getMonth(), year: toDay.getFullYear() };
  changeDate(newDate);
  changeTableCalendar(newDate.month, newDate.year);
});

function changeDate(newDate) {
  if (newDate) {
    checkErrorDate = newDate;
    const d = new Date(newDate.year, newDate.month, newDate.date);
    header.innerHTML = `Tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`;
    dateHeader.innerHTML = d.getDate();
    dayWeek.innerHTML = getDayInWeek(d.getDay());
  }
}

function clearDate() {
  header.innerHTML = "";
  dateHeader.innerHTML = "";
  dayWeek.innerHTML = "";
}

function changeTableCalendar(month, year) {
  tableCalendar.innerHTML = "";
  const daysInMonth = getDaysInMonth(month, year);
  const firstDayInMonth = daysInMonth[0];
  let daysBefore = firstDayInMonth.getDay();

  for (let i = 0; i < daysBefore; i++) {
    const clone = dayCard.cloneNode(true); //dùng để sao chép kiểu css của daycard , lấy tất cả
    clone.querySelector("#date").textContent = "";
    tableCalendar.appendChild(clone);
  }

  daysInMonth.forEach((e) => {
    const clone = dayCard.cloneNode(true); //lại tạo thẻ giống như trên để add vào
    clone.addEventListener("click", () => {
      const d = { date: e.getDate(), month: e.getMonth(), year: e.getFullYear() };
      changeDate(d);
      changeTableCalendar(d.month, d.year);
    });

    if (e.getDate() === checkErrorDate.date &&
        e.getMonth() === checkErrorDate.month &&
        e.getFullYear() === checkErrorDate.year) {
      clone.style.backgroundColor = "yellowgreen";
    }

    clone.querySelector("#date").textContent = e.getDate();
    tableCalendar.appendChild(clone);
  });
}

function BackOneYear(date) {
  const newDate = { date: date.date, month: date.month, year: date.year - 1 };
  if (isValidDate(newDate)) {
    changeDate(newDate);
  } else {
    checkErrorDate = newDate;
    clearDate();
  }
  changeTableCalendar(newDate.month, newDate.year);
}

function AddOneYear(date) {
  const newDate = { date: date.date, month: date.month, year: date.year + 1 };
  if (isValidDate(newDate)) {
    changeDate(newDate);
  } else {
    checkErrorDate = newDate;
    clearDate();
  }
  changeTableCalendar(newDate.month, newDate.year);
}

function AddOneMonth(date) {
  let newDate;
  if (date.month === 11) {
    newDate = { date: date.date, month: 0, year: date.year + 1 };
  } else {
    newDate = { date: date.date, month: date.month + 1, year: date.year };
  }
  if (isValidDate(newDate)) {
    changeDate(newDate);
  } else {
    checkErrorDate = newDate;
    clearDate();
  }
  changeTableCalendar(newDate.month, newDate.year);
}

function BackOneMonth(date) {
  let newDate;
  if (date.month === 0) {
    newDate = { date: date.date, month: 11, year: date.year - 1 };
  } else {
    newDate = { date: date.date, month: date.month - 1, year: date.year };
  }
  if (isValidDate(newDate)) {
    changeDate(newDate);
  } else {
    checkErrorDate = newDate;
    clearDate();
  }
  changeTableCalendar(newDate.month, newDate.year);
}

// tạo sự kiện click cho chức năng 
lastYear.addEventListener("click", () => BackOneYear(checkErrorDate));
lastMonth.addEventListener("click", () => BackOneMonth(checkErrorDate));
nextMonth.addEventListener("click", () => AddOneMonth(checkErrorDate));
nextYear.addEventListener("click", () => AddOneYear(checkErrorDate));

confirmButton.addEventListener("click", () => {
  const newDate = {
    date: Number(dateValue.value),
    month: Number(monthValue.value),
    year: Number(yearValue.value)
  };
  if (isValidDate(newDate)) {
    changeDate(newDate);
    changeTableCalendar(newDate.month, newDate.year);
  } else {
    alert("Ngày này không tồn tại !!!");
  }
});

//  Tạo danh sách cho người dùng chọn ngày và tháng
for (let i = 1; i <= 31; i++) {
  let dateOption = document.createElement("option");
  dateOption.textContent = i;
  selectDay.appendChild(dateOption);
}

for (let i = 1; i <= 12; i++) {
  let monthOption = document.createElement("option");
  monthOption.value = i - 1;
  monthOption.textContent = i;
  selectMonth.appendChild(monthOption);
}

//  Khởi tạo lịch theo thiết lập sẵn
changeDate(checkErrorDate);
changeTableCalendar(checkErrorDate.month, checkErrorDate.year);
