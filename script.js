let favorites = [];

// Функция перевода слова
async function translateWord() {
    const word = document.getElementById("wordInput").value.trim();
    if (!word) {
        alert("Введите слово для перевода.");
        return;
    }

    try {
        // Используем функцию fakeTranslate для перевода
        const translation = await fakeTranslate(word);
        
        // Отображаем перевод на странице
        document.getElementById("translationResult").innerText = translation;
        
        // Включаем кнопку "Сохранить в избранное"
        document.getElementById("saveButton").disabled = false;
    } catch (error) {
        document.getElementById("translationResult").innerText = error;
        document.getElementById("saveButton").disabled = true;
        alert(error);
    }
}

// Функция для сохранения перевода в избранное
function saveTranslation() {
    const word = document.getElementById("wordInput").value.trim();
    const translation = document.getElementById("translationResult").innerText;

    favorites.push({ word, translation });
    updateFavorites();
    document.getElementById("saveButton").disabled = true;
    alert(Сохранено: ${word} - ${translation});
}

// Функция для обновления списка избранных переводов
function updateFavorites() {
    const favoritesList = document.getElementById("favoritesList");
    favoritesList.innerHTML = ""; // Очищаем список

    if (favorites.length === 0) {
        const message = document.createElement("li");
        message.innerText = "Нет избранных переводов.";
        favoritesList.appendChild(message);
    } else {
        favorites.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.innerText = ${item.word} - ${item.translation};

            // Кнопка для удаления перевода из избранного
            const removeButton = document.createElement("button");
            removeButton.innerText = "Удалить";
            removeButton.addEventListener("click", () => removeFavorite(index));

            listItem.appendChild(removeButton);
            favoritesList.appendChild(listItem);
        });
    }
}

// Функция для удаления перевода из избранного
function removeFavorite(index) {
    favorites.splice(index, 1);
    updateFavorites();
    alert("Перевод удален из избранного.");
}

// Подключаем обработчики событий
document.getElementById("translateButton").addEventListener("click", translateWord);
document.getElementById("saveButton").addEventListener("click", saveTranslation);