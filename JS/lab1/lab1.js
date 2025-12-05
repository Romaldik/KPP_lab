const userName = prompt("Введите ваше имя:");

const userAge = Number(prompt("Введите ваш возраст:"));

if (userAge < 18) {
    alert("You are not allowed to visit this website");

} else if (userAge >= 18 && userAge <= 22) {
    const isConfirmed = confirm("Are you sure you want to continue?");

    if (isConfirmed) {
        alert(`Welcome, ${userName}`); 
    } else {
        alert("You are not allowed to visit this website");
    }

} else {
    alert(`Welcome, ${userName}`);
    
}