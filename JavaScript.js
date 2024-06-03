document.addEventListener("DOMContentLoaded", function() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewList = document.getElementById('reviewList');

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        clearErrors();

        const movieInput = document.getElementById('movie');
        const scoreInput = document.getElementById('score');
        const commentInput = document.getElementById('comment');

        let valid = true;

        if (!movieInput.value.trim()) {
            showError('movieError', 'Por favor ingresa el nombre de la película.');
            valid = false;
        }

        if (!scoreInput.value.trim()) {
            showError('scoreError', 'Por favor selecciona una puntuación.');
            valid = false;
        }

        if (commentInput.value.trim().length < 10 && commentInput.value.trim().length > 0) {
            showError('commentError', 'El comentario debe tener al menos 10 caracteres.');
            valid = false;
        }

        if (commentInput.value.trim().length > 200) {
            showError('commentError', 'El comentario no puede tener más de 200 caracteres.');
            valid = false;
        }

        if (valid) {
            const review = {
                movie: movieInput.value.trim(),
                score: scoreInput.value.trim(),
                comment: commentInput.value.trim()
            };

            displayReview(review);
            clearForm();
        }
    });

    function showError(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.innerText = message;

        const field = document.getElementById(id.replace('Error', ''));
        field.classList.add('error-field');
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.innerText = '');

        const fields = document.querySelectorAll('.error-field');
        fields.forEach(field => field.classList.remove('error-field'));
    }

    function displayReview(review) {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `
            <h3>${review.movie}</h3>
            <p><strong>Puntuación:</strong> ${review.score}</p>
            ${review.comment ? `<p><strong>Comentario:</strong> ${review.comment}</p>` : ''}
        `;
        reviewList.appendChild(reviewItem);
    }

    function clearForm() {
        reviewForm.reset();
    }
});
