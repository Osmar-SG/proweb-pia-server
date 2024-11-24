document.addEventListener('DOMContentLoaded', function() {
    const modals = ['pizza', 'bebidas', 'combos', 'extras'];

    modals.forEach(modalType => {
        const button = document.getElementById(`${modalType}Button`);
        const modal = document.getElementById(`${modalType}Modal`);
        const closeButton = modal.querySelector('.close-btn');
        const itemList = document.getElementById(`${modalType}List`);

        async function cargarItems() {
            try {
               
                itemList.innerHTML = ''; 
                
            } catch (error) {
                console.error(`Error loading ${modalType}:`, error);
            }
        }

        button.addEventListener('click', () => {
            modal.style.display = 'block';
            cargarItems();
        });

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});