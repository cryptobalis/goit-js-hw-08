import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

// Зчитування даних з локального сховища
const storedState = localStorage.getItem(STORAGE_KEY);
const initialState = storedState ? JSON.parse(storedState) : { email: '', message: '' };
emailInput.value = initialState.email;
messageInput.value = initialState.message;

// Збереження даних у локальному сховищі
const saveState = throttle(() => {
  const state = { email: emailInput.value, message: messageInput.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}, 500);

// Відслідковування події введення тексту
form.addEventListener('input', () => {
  saveState();
});

// Обробка події відправки форми
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // Перевірка на заповненість полів
  if (!emailInput.value || !messageInput.value) {
    alert("Потрібно заповнити всі поля");
    return;
  }
  
  // Отримання даних з форми
  const state = { email: emailInput.value, message: messageInput.value };
  console.log(state);
  
  // Очистка локального сховища і полів форми
  localStorage.removeItem(STORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';
});