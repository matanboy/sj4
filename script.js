document.addEventListener('DOMContentLoaded', () => {
    let currentQuestionIndex = 0;
    let questions = [];

    // Function to load questions from a JSON file
    async function loadQuestions() {
        try {
            const response = await fetch('sat_questions.json');
            questions = await response.json();
            displayQuestion(currentQuestionIndex);
        } catch (error) {
            console.error('Failed to load questions:', error);
        }
    }

    // Function to display a question
    function displayQuestion(index) {
        if (index >= questions.length || index < 0) {
            return;
        }

        const question = questions[index];
        document.getElementById('question-text').innerText = question.question;
        const answerOptionsDiv = document.getElementById('answer-options');
        answerOptionsDiv.innerHTML = '';
        
        question.answerOptions.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.onclick = () => checkAnswer(option.isCorrect, button);
            answerOptionsDiv.appendChild(button);
        });
    }

    // Function to check the selected answer
    function checkAnswer(isCorrect, button) {
        const resultMessage = document.getElementById('result-message');
        if (isCorrect) {
            resultMessage.innerText = 'Correct!';
            button.classList.add('correct');
        } else {
            resultMessage.innerText = 'Incorrect.';
            button.classList.add('incorrect');
        }
    }

    // Navigation logic
    document.getElementById('next-button').onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion(currentQuestionIndex);
            document.getElementById('result-message').innerText = '';
        } else {
            alert('End of quiz!');
        }
    };

    document.getElementById('prev-button').onclick = () => {
        currentQuestionIndex--;
        if (currentQuestionIndex >= 0) {
            displayQuestion(currentQuestionIndex);
            document.getElementById('result-message').innerText = '';
        } else {
            alert('This is the first question.');
        }
    };

    loadQuestions();
});