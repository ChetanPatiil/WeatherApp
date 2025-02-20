
export const greetingMessage=()=>{
    const now = new Date();
    const hours = now.getHours();
    let greeting = '';
    
    if (hours < 12) {
      return greeting = 'Good Morning';
    } else if (hours < 18) {
      return greeting = 'Good Afternoon';
    } else {
     return greeting = 'Good Evening';
    }
}
