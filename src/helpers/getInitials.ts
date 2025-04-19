export const getInitials = (firstName: string, lastName: string) => {
  if(!firstName || !lastName)
    {
      return 'N/A'
    }    
    
    return `${firstName[0]}${lastName[0]}`?.toUpperCase();
  };