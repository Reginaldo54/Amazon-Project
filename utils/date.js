export default function isWednesday(date) 
{
  const weekday = date.toLocaleDateString('en-us', {weekday: 'long'})
 
  let addDays;

  if (weekday === 'Sunday') 
  {
    addDays = 1; 
  }
  else if (weekday === "Saturday")
  {
    addDays = 2;
  }
  else // retornar a data normal
  {
    return date;
  }
  
  date.setDate(date.getDate() + addDays)
  return date;

}

