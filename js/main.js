document.addEventListener('DOMContentLoaded', () => {
    const accountBtn = document.querySelector('.account-btn');
    const dropdown = document.querySelector('.dropdown-content');

    // Toggle dropdown
    accountBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.account-dropdown')) {
            dropdown.style.display = 'none';
        }
    });

    // Close dropdown on scroll
    window.addEventListener('scroll', () => {
        dropdown.style.display = 'none';
    });
});