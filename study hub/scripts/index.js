// --- Global Variables and Constants ---
const MOBILE_MENU_BUTTON = document.getElementById('mobile-menu-button');
const CLOSE_MENU_BUTTON = document.getElementById('close-menu-button');
const MOBILE_MENU = document.getElementById('mobile-menu');
const BODY = document.body;

// --- Utility Functions ---
/**
 * Toggles the visibility of the mobile menu.
 * @param {boolean} show - True to show the menu, false to hide. If undefined, toggles current state.
 */
function toggleMobileMenu(show) {
  if (typeof show === 'undefined') {
    MOBILE_MENU.classList.toggle('hidden');
    BODY.classList.toggle('overflow-hidden'); // Prevent scrolling when menu is open
  } else if (show) {
    MOBILE_MENU.classList.remove('hidden');
    BODY.classList.add('overflow-hidden');
  } else {
    MOBILE_MENU.classList.add('hidden');
    BODY.classList.remove('overflow-hidden');
  }
  displayMessage(MOBILE_MENU.classList.contains('hidden') ? 'Mobile menu hidden.' : 'Mobile menu shown.', 'info');
}

/**
 * Displays a temporary message to the user.
 * This replaces alert() for better UX within an iframe.
 * @param {string} message - The message to display.
 * @param {string} type - The type of message ('info', 'success', 'error').
 */
function displayMessage(message, type = 'info') {
  const messageBox = document.createElement('div');
  messageBox.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-xl text-white z-[100] transition-opacity duration-300 ease-out`;
  messageBox.style.opacity = '0'; // Start hidden for transition

  // Conditional branching for message styling based on type
  let bgColor;
  if (type === 'success') {
    bgColor = 'bg-green-600';
  } else if (type === 'error') {
    bgColor = 'bg-red-600';
  } else {
    bgColor = 'bg-gray-800'; // Default info
  }
  messageBox.classList.add(bgColor);

  // Using template literals for string output
  messageBox.innerHTML = `${message}`;
  BODY.appendChild(messageBox);

  // Fade in
  setTimeout(() => messageBox.style.opacity = '1', 10);

  // Fade out and remove after 3 seconds
  setTimeout(() => {
    messageBox.style.opacity = '0';
    messageBox.addEventListener('transitionend', () => messageBox.remove());
  }, 3000);
}

/**
 * Demonstrates using localStorage to store a simple preference.
 * @param {string} key - The localStorage key.
 * @param {any} value - The value to store.
 */
function savePreference(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        // Only show message if it's not the last visited page which happens on every page load
        if (key !== 'lastVisitedPage') {
            displayMessage(`Preference '${key}' saved.`, 'success');
        }
    } catch (e) {
        displayMessage(`Error saving preference '${key}': ${e.message}`, 'error');
        console.error('localStorage save error:', e);
    }
}

/**
 * Demonstrates using localStorage to retrieve a simple preference.
 * @param {string} key - The localStorage key.
 * @param {any} defaultValue - The default value to return if not found.
 * @returns {any} The retrieved value or default value.
 */
function getPreference(key, defaultValue) {
    try {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            // Only show message if it's not the last visited page which happens on every page load
            if (key !== 'lastVisitedPage') {
                displayMessage(`Preference '${key}' retrieved.`, 'info');
            }
            return JSON.parse(storedValue);
        }
    } catch (e) {
        displayMessage(`Error retrieving preference '${key}': ${e.message}`, 'error');
        console.error('localStorage retrieve error:', e);
    }
    return defaultValue;
}

// --- Event Listeners for common UI elements ---
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu listeners
    if (MOBILE_MENU_BUTTON) {
      MOBILE_MENU_BUTTON.addEventListener('click', () => toggleMobileMenu(true));
    }
    if (CLOSE_MENU_BUTTON) {
      CLOSE_MENU_BUTTON.addEventListener('click', () => toggleMobileMenu(false));
    }

    // Initial check for mobile menu state on load and resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) { // md breakpoint in Tailwind
        toggleMobileMenu(false); // Ensure menu is hidden on desktop resize
      }
    });

    // Example of retrieving a preference on page load (e.g., user's last visited page)
    const lastPage = getPreference('lastVisitedPage', 'None');
    displayMessage(`Welcome back! Your last visited page was: ${lastPage}`, 'info');
    // Example of saving a preference when leaving the page (or on specific action)
    savePreference('lastVisitedPage', window.location.pathname);

    // --- Footer Date Logic ---
    const currentYearSpan = document.getElementById('currentyear');
    const lastModifiedParagraph = document.getElementById('lastModified');

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    if (lastModifiedParagraph) {
        // Get the last modified date of the document
        const lastModDate = new Date(document.lastModified);
        // Format the date using template literals for clear output
        lastModifiedParagraph.textContent = `Last Modified: ${lastModDate.toLocaleDateString()} ${lastModDate.toLocaleTimeString()}`;
    }


    // --- Past Questions Page Specific Logic (only runs if elements exist) ---
    const questionSearchForm = document.getElementById('question-search-form');
    const questionsList = document.getElementById('questions-list');
    const noResultsMessage = document.getElementById('no-results-message');
    const sampleQuestionCard = document.getElementById('sample-question-card');

    // Dummy data for past questions (using an array of objects)
    const allPastQuestions = [
      {
        id: 'bece-math-2022-q1',
        examType: 'BECE',
        subject: 'Mathematics',
        year: 2022,
        topic: 'Algebra',
        text: 'Simplify: $3x + 5y - x + 2y$',
        explanation: 'Combine like terms: $(3x - x) + (5y + 2y) = 2x + 7y$.'
      },
      {
        id: 'wassce-eng-2021-q5',
        examType: 'WASSCE',
        subject: 'English Language',
        year: 2021,
        topic: 'Comprehension',
        text: 'Read the passage and answer the question: What is the main idea of the second paragraph?',
        explanation: 'The main idea of the second paragraph is related to the challenges of urbanization in developing countries.'
      },
      {
        id: 'bece-sci-2023-q3',
        examType: 'BECE',
        subject: 'Science',
        year: 2023,
        topic: 'Living Things',
        text: 'Which of the following is a producer in a food chain? A) Lion B) Grasshopper C) Grass D) Snake',
        explanation: 'Producers are organisms that produce their own food, usually through photosynthesis. In this case, grass is a producer.'
      },
      {
        id: 'wassce-math-2020-q10',
        examType: 'WASSCE',
        subject: 'Mathematics',
        year: 2020,
        topic: 'Geometry',
        text: 'A triangle has sides of length 3cm, 4cm, and 5cm. What type of triangle is it?',
        explanation: 'Since $3^2 + 4^2 = 9 + 16 = 25$ and $5^2 = 25$, it satisfies the Pythagorean theorem ($a^2 + b^2 = c^2$), indicating it is a right-angled triangle.'
      }
    ];

    /**
     * Filters and displays past questions based on form input.
     * Uses array methods and conditional branching.
     */
    function searchQuestions(event) {
      event.preventDefault(); // Prevent default form submission

      const examType = document.getElementById('exam-type').value;
      const subject = document.getElementById('subject').value;
      const year = document.getElementById('year').value;

      // Filter questions using array.filter()
      const filteredQuestions = allPastQuestions.filter(question => {
        let match = true;
        if (examType && question.examType !== examType) {
          match = false;
        }
        if (subject && question.subject !== subject) {
          match = false;
        }
        // Conditional branching for year input
        if (year && question.year !== parseInt(year)) {
          match = false;
        }
        return match;
      });

      renderQuestions(filteredQuestions);
      displayMessage(
          filteredQuestions.length > 0
              ? `Found ${filteredQuestions.length} questions.`
              : `No questions found matching your criteria.`,
          'info'
      );
    }

    /**
     * Renders the filtered questions to the DOM.
     * Uses DOM manipulation and template literals.
     * @param {Array<Object>} questions - The array of question objects to render.
     */
    function renderQuestions(questions) {
      questionsList.innerHTML = ''; // Clear previous results

      if (questions.length === 0) {
        noResultsMessage.classList.remove('hidden');
        questionsList.appendChild(noResultsMessage); // Re-append the message
        return;
      } else {
        noResultsMessage.classList.add('hidden');
      }

      // Iterate and render each question using array.forEach()
      questions.forEach(question => {
        const questionCard = sampleQuestionCard.cloneNode(true);
        questionCard.id = ''; // Remove ID from clone
        questionCard.classList.remove('hidden');

        // Modify DOM elements using template literals for text content
        questionCard.querySelector('[data-question-title]').textContent = `${question.examType} ${question.subject} (${question.year}) - ${question.topic}`;
        questionCard.querySelector('[data-question-meta]').textContent = `Question ID: ${question.id}`;
        questionCard.querySelector('[data-question-text]').textContent = question.text;
        questionCard.querySelector('[data-question-explanation]').textContent = question.explanation;

        const toggleButton = questionCard.querySelector('[data-toggle-explanation-button]');
        const explanationDiv = questionCard.querySelector('.explanation');

        // Add event listener for explanation toggle
        toggleButton.addEventListener('click', () => {
          explanationDiv.classList.toggle('hidden');
          toggleButton.textContent = explanationDiv.classList.contains('hidden') ? 'Show Explanation' : 'Hide Explanation';
          displayMessage(
              explanationDiv.classList.contains('hidden') ?
              `Explanation for ${question.id} hidden.` :
              `Explanation for ${question.id} shown.`,
              'info'
          );
        });

        questionsList.appendChild(questionCard);
      });
    }

    // Attach event listener for the search form if it exists on the current page
    if (questionSearchForm) {
      questionSearchForm.addEventListener('submit', searchQuestions);
    }


    // --- Study Planner Page Specific Logic (only runs if elements exist) ---
    const studyTaskForm = document.getElementById('study-task-form');
    const studyTasksList = document.getElementById('study-tasks-list');
    const noTasksMessage = document.getElementById('no-tasks-message');
    const sampleTaskCard = document.getElementById('sample-task-card');

    let studyTasks = []; // Array to hold study task objects

    /**
     * Loads study tasks from localStorage.
     */
    function loadStudyTasks() {
        studyTasks = getPreference('studyHubTasks', []);
        renderStudyTasks();
    }

    /**
     * Saves study tasks to localStorage.
     */
    function saveStudyTasks() {
        savePreference('studyHubTasks', studyTasks);
    }

    /**
     * Adds a new study task from the form input.
     * @param {Event} event - The form submission event.
     */
    function addStudyTask(event) {
        event.preventDefault(); // Prevent default form submission

        const taskName = document.getElementById('task-name').value.trim();
        const taskSubject = document.getElementById('task-subject').value.trim();
        const taskDate = document.getElementById('task-date').value;
        const taskTime = document.getElementById('task-time').value;

        if (!taskName || !taskDate) {
            displayMessage('Task name and date are required.', 'error');
            return;
        }

        const newTask = {
            id: Date.now().toString(), // Unique ID for the task
            name: taskName,
            subject: taskSubject,
            date: taskDate,
            time: taskTime,
            completed: false
        };

        studyTasks.push(newTask);
        saveStudyTasks(); // Persist to localStorage
        renderStudyTasks(); // Update the display
        studyTaskForm.reset(); // Clear the form
        displayMessage(`Task '${taskName}' added successfully!`, 'success');
    }

    /**
     * Renders the current list of study tasks to the DOM.
     * Uses DOM manipulation, array methods, and conditional branching.
     */
    function renderStudyTasks() {
        studyTasksList.innerHTML = ''; // Clear previous tasks

        if (studyTasks.length === 0) {
            noTasksMessage.classList.remove('hidden');
            studyTasksList.appendChild(noTasksMessage); // Re-append the message
            return;
        } else {
            noTasksMessage.classList.add('hidden');
        }

        // Sort tasks by date and time (optional, but good for planning)
        // Using array.sort()
        const sortedTasks = [...studyTasks].sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time || '00:00'}`);
            const dateB = new Date(`${b.date}T${b.time || '00:00'}`);
            return dateA - dateB;
        });

        sortedTasks.forEach(task => {
            const taskCard = sampleTaskCard.cloneNode(true);
            taskCard.id = ''; // Remove ID from clone
            taskCard.classList.remove('hidden');
            taskCard.setAttribute('data-task-id', task.id); // Set task ID for manipulation

            taskCard.querySelector('[data-task-name]').textContent = task.name;
            taskCard.querySelector('[data-task-subject]').textContent = task.subject ? `Subject: ${task.subject}` : '';

            // Format date and time using template literals
            let dateTimeText = `${new Date(task.date).toLocaleDateString('en-GH', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}`;
            if (task.time) {
                dateTimeText += ` at ${task.time}`;
            }
            taskCard.querySelector('[data-task-datetime]').textContent = dateTimeText;

            const markCompleteButton = taskCard.querySelector('[data-mark-complete-button]');
            const deleteButton = taskCard.querySelector('[data-delete-task-button]');

            // Conditional styling for completed tasks
            if (task.completed) {
                taskCard.classList.add('opacity-60', 'line-through');
                markCompleteButton.textContent = 'Completed';
                markCompleteButton.disabled = true;
                markCompleteButton.classList.remove('bg-green-500', 'hover:bg-green-600', 'focus:ring-green-500');
                markCompleteButton.classList.add('bg-gray-400', 'cursor-not-allowed');
            }

            // Event listener for Mark Complete button
            markCompleteButton.addEventListener('click', () => {
                markTaskComplete(task.id);
            });

            // Event listener for Delete button
            deleteButton.addEventListener('click', () => {
                deleteTask(task.id);
            });

            studyTasksList.appendChild(taskCard);
        });
    }

    /**
     * Marks a study task as complete.
     * @param {string} taskId - The ID of the task to mark complete.
     */
    function markTaskComplete(taskId) {
        // Find task using array.find() and update its completed status
        const taskIndex = studyTasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            studyTasks[taskIndex].completed = !studyTasks[taskIndex].completed; // Toggle for demo
            saveStudyTasks();
            renderStudyTasks();
            displayMessage(`Task '${studyTasks[taskIndex].name}' marked as ${studyTasks[taskIndex].completed ? 'complete' : 'incomplete'}.`, 'success');
        }
    }

    /**
     * Deletes a study task.
     * @param {string} taskId - The ID of the task to delete.
     */
    function deleteTask(taskId) {
        // Filter out the deleted task using array.filter()
        const initialLength = studyTasks.length;
        studyTasks = studyTasks.filter(task => task.id !== taskId);
        if (studyTasks.length < initialLength) {
            saveStudyTasks();
            renderStudyTasks();
            displayMessage(`Task deleted successfully.`, 'success');
        } else {
            displayMessage(`Task not found.`, 'error');
        }
    }

    // Attach event listener for the study task form if it exists on the current page
    if (studyTaskForm) {
      studyTaskForm.addEventListener('submit', addStudyTask);
      loadStudyTasks(); // Load existing tasks when the page loads
    }
});
