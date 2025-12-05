function createNewUser() {
    // 1. Запитуємо дані у користувача
    const firstName = prompt("Введіть ваше ім'я");
    const lastName = prompt("Введіть ваше прізвище:");

    const newUser = {
        firstName: firstName,
        lastName: lastName,

        getLogin: function() {
            if (!this.firstName || !this.lastName) {
                console.error("Помилка: Ім'я або прізвище не були введені.");
                return undefined;
            }

            const firstLetter = this.firstName.charAt(0).toLowerCase();
            
            const lowerLastName = this.lastName.toLowerCase();

            return firstLetter + lowerLastName;
        }
    };

    return newUser;
}

const user = createNewUser();

if (user.firstName && user.lastName) {
    console.log("Користувача створено:", user);
    console.log("Результат виконання getLogin():", user.getLogin());
} else {
    console.log("Користувач скасував введення даних.");
}