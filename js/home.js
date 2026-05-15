// Greet the visitor based on the time of day.
// This is an enhancement — if JS is disabled, the heading
// falls back to whatever text is in the HTML ("Hello!").

const hour = new Date().getHours();
const greeting = document.getElementById('greeting');

if (greeting) {
    if (hour < 12) {
        greeting.textContent = 'Good morning!';
    } else if (hour < 18) {
        greeting.textContent = 'Good afternoon!';
    } else {
        greeting.textContent = 'Good evening!';
    }
}