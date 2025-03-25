export const formattedDate = (created_at) =>{
    const date = new Date(created_at);
const options = { day: "numeric", month: "long", year: "numeric" };
 return  date.toLocaleDateString("en-GB", options); 
}