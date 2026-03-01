import { useState, useEffect, useMemo } from 'react';

export function useDuration(startDate) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const duration = useMemo(() => {
    const zero = { years:0, months:0, days:0, hours:0, minutes:0, seconds:0 };
    if (!startDate) return zero;
    const s = new Date(startDate), n = currentTime;
    if (n < s) return zero;
    let [yr,mo,dy,hr,mi,se] = [
      n.getFullYear()-s.getFullYear(), n.getMonth()-s.getMonth(),
      n.getDate()-s.getDate(),         n.getHours()-s.getHours(),
      n.getMinutes()-s.getMinutes(),   n.getSeconds()-s.getSeconds(),
    ];
    if(se<0){se+=60;mi--;} if(mi<0){mi+=60;hr--;} if(hr<0){hr+=24;dy--;}
    if(dy<0){dy+=new Date(n.getFullYear(),n.getMonth(),0).getDate();mo--;}
    if(mo<0){mo+=12;yr--;}
    return { years:yr, months:mo, days:dy, hours:hr, minutes:mi, seconds:se };
  }, [startDate, currentTime]);

  return duration;
}
