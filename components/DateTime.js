const date = new Date();

export const FullDateTimeFormat=()=>{
  return date.toLocaleString();;
}
console.log(FullDateTimeFormat());
