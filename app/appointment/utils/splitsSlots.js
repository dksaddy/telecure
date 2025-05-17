// utils/splitSlots.ts
export function splitIntoIntervals(start, end, interval = 20) {
    const toMinutes = (time) => {
      const [hourMin, period] = time.split(' ');
      let [hours, minutes] = hourMin.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };
  
    const toTimeStr = (minutes) => {
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      const period = h >= 12 ? 'PM' : 'AM';
      const hours12 = h % 12 === 0 ? 12 : h % 12;
      return `${hours12}:${m.toString().padStart(2, '0')} ${period}`;
    };
  
    const result = [];
    let current = toMinutes(start);
    const endMin = toMinutes(end);
  
    while (current + interval <= endMin) {
      result.push({
        start: toTimeStr(current),
        end: toTimeStr(current + interval),
      });
      current += interval;
    }
  
    return result;
  }
  