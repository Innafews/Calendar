// ────────────────  修改这里来添加/修改纪念日和颜色 ────────────────
// 格式： { date: "YYYY-MM-DD", color: "#颜色值", label: "可选提示文字" }
// color 支持： #hex、rgb()、hsl()、颜色英文名 等
const specialDates = [
    { date: "2025-03-24", color: "#f472b6", label: "测试1" },
    { date: "2026-03-24", color: "#34d399", label: "允许高潮" },
    { date: "2026-05-24", color: "#34d399", label: "允许高潮" },
    { date: "2026-05-25", color: "#fbbf24", label: "测试5" },
    
    // 你可以继续添加，例如：
    // { date: "2026-08-15", color: "#ef4444", label: "暑假特别日" },
    // { date: "2027-01-01", color: "#8b5cf6", label: "新年快乐" },
];

const months = [
    "一月", "二月", "三月", "四月", "五月", "六月",
    "七月", "八月", "九月", "十月", "十一月", "十二月"
];

const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

let currentYear = new Date().getFullYear(); // 默认显示今年

const yearDisplay = document.getElementById("current-year");
const prevBtn = document.getElementById("prev-year");
const nextBtn = document.getElementById("next-year");
const calendarEl = document.getElementById("calendar");

// 更新标题年份
function updateYearDisplay() {
    yearDisplay.textContent = currentYear;
}

// 生成单个月份的DOM
function renderMonth(year, monthIndex) {
    const monthDiv = document.createElement("div");
    monthDiv.className = "month";

    const title = document.createElement("div");
    title.className = "month-title";
    title.textContent = months[monthIndex];
    monthDiv.appendChild(title);

    const daysGrid = document.createElement("div");
    daysGrid.className = "days";

    // 星期标题
    weekdays.forEach(w => {
        const wd = document.createElement("div");
        wd.className = "weekday";
        wd.textContent = w;
        daysGrid.appendChild(wd);
    });

    const firstDay = new Date(year, monthIndex, 1);
    const firstWeekday = firstDay.getDay(); // 0=周日

    // 空白格
    for (let i = 0; i < firstWeekday; i++) {
        const empty = document.createElement("div");
        empty.className = "day empty";
        daysGrid.appendChild(empty);
    }

    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const today = new Date();
    const isThisYear = today.getFullYear() === year;
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    // 为了快速查找，把 specialDates 转成 Map（日期 → 信息）
    const specialMap = new Map();
    specialDates.forEach(item => {
        specialMap.set(item.date, item);
    });

    for (let d = 1; d <= daysInMonth; d++) {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.textContent = d;

        const mm = String(monthIndex + 1).padStart(2, "0");
        const dd = String(d).padStart(2, "0");
        const dateKey = `${year}-${mm}-${dd}`;

        // 特殊纪念日（精确到年份 + 可自定义颜色）
        if (specialMap.has(dateKey)) {
            const info = specialMap.get(dateKey);
            dayDiv.classList.add("special");
            dayDiv.style.backgroundColor = info.color;
            dayDiv.style.color = "white";
            dayDiv.style.fontWeight = "600";
            dayDiv.style.boxShadow = `0 3px 10px ${info.color}88`; // 半透明阴影
            if (info.label) {
                dayDiv.dataset.label = info.label;   // 使用 data-label
            }
        }

        // 今天（只在当前年份显示）
        if (isThisYear && monthIndex === todayMonth && d === todayDate) {
            dayDiv.classList.add("today");
            // 如果今天也是特殊日，会被上面的颜色覆盖（优先级更高）
        }

        daysGrid.appendChild(dayDiv);
    }

    monthDiv.appendChild(daysGrid);
    return monthDiv;
}

// 渲染整年日历
function renderCalendar(year) {
    calendarEl.innerHTML = "";
    for (let m = 0; m < 12; m++) {
        const monthEl = renderMonth(year, m);
        calendarEl.appendChild(monthEl);
    }
}

// 初始化
updateYearDisplay();
renderCalendar(currentYear);

// 切换年份
prevBtn.addEventListener("click", () => {
    currentYear--;
    updateYearDisplay();
    renderCalendar(currentYear);
});

nextBtn.addEventListener("click", () => {
    currentYear++;
    updateYearDisplay();
    renderCalendar(currentYear);
});