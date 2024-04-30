document.addEventListener('DOMContentLoaded', function () {
    const folders = document.querySelectorAll('.folder span');

    folders.forEach(function (folder) {
        folder.addEventListener('click', function () {
            const nestedList = folder.parentElement.querySelector('ul');
            const isGrafika = folder.closest('.folder').classList.contains('Grafika');
            const isOpen = folder.parentElement.classList.contains('open');

            if (isGrafika && !isOpen) {
                folder.parentElement.classList.add('open');
                nestedList.style.display = 'block';
            } else {
                folder.parentElement.classList.toggle('open');
                nestedList.style.display = nestedList.style.display === 'none' ? 'block' : 'none';
            }
        });
    });
});
