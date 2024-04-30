function startGradient(color) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Установка переменных CSS в зависимости от выбранного цвета
    switch(color) {
        case 'blue':
            document.documentElement.style.setProperty('--start-color', 'blue');
            document.documentElement.style.setProperty('--end-color', 'lightblue');
            break;
        case 'red':
            document.documentElement.style.setProperty('--start-color', 'red');
            document.documentElement.style.setProperty('--end-color', 'pink');
            break;
        case 'purple':
            document.documentElement.style.setProperty('--start-color', 'purple');
            document.documentElement.style.setProperty('--end-color', 'lavender');
            break;
        default:
            break;
    }
}
