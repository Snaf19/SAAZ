document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const comment = this.querySelector('textarea').value;
    if (comment) {
        alert('Thank you for your comment! We appreciate your feedback.');
        this.reset();
    }
});