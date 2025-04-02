type CalendarEvent = {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
};

export const useGoogleCalendar = () => {
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const addToGoogleCalendar = (event: CalendarEvent) => {
    const { title, description, location, startDate, endDate } = event;
    
    // Format dates for Google Calendar URL
    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate);
    
    // Create Google Calendar URL
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&dates=${startDateFormatted}/${endDateFormatted}`;
    
    // Open in new tab
    window.open(googleCalendarUrl, '_blank');
  };

  return {
    addToGoogleCalendar
  };
};
