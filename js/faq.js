document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqCategories = document.querySelectorAll('.faq-categories li');
    const faqItems = document.querySelectorAll('.faq-item');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const symbol = question.querySelector('.faq-symbol');
            const openAnswer = document.querySelector('.faq-answer[style="max-height: 200px;"]');
            const activeQuestion = document.querySelector('.faq-question.active');

            if (openAnswer && openAnswer !== answer) {
                openAnswer.style.maxHeight = '0';
                const openSymbol = openAnswer.previousElementSibling.querySelector('.faq-symbol');
                openSymbol.textContent = '+';
                activeQuestion.classList.remove('active');
            }

            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                symbol.textContent = '+';
                question.classList.remove('active');
            } else {
                answer.style.maxHeight = '200px';
                symbol.textContent = '−';
                question.classList.add('active');
            }
        });
    });

    faqCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories
            faqCategories.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked category
            category.classList.add('active');

            // Get the category name from the clicked category
            const selectedCategory = category.getAttribute('data-category');

            // Show only FAQ items that match the selected category
            faqItems.forEach(item => {
                if (item.getAttribute('data-category') === selectedCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Trigger click on the active category to show its FAQs by default
    document.querySelector('.faq-categories li.active').click();
});
