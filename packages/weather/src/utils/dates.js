export function getDayName(timestamp) {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    }

    if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
    }
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

export function getFiveDayForecast (data) {
    const dailyData = data.list.filter(item => {
        const date = new Date(item.dt * 1000);
        return date.getHours() === 12;
    })

    return dailyData.slice(0, 5).map(item => ({
    day: getDayName(item.dt),
    temp: Math.round(item.main.temp),
    icon: item.weather[0].icon
  }));
}