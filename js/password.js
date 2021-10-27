const button = document.querySelectorAll('[data-id="button"]');
const password = document.querySelectorAll('[data-id="password"]');

const login = (secret) => {
  const hash = sha1(secret);
  const url = `${hash}/home.html`;
  const alert = document.querySelectorAll('[data-id="alert"]');

  const request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      window.location = url;
    } else {
      parent.location.hash = hash;
      alert[0].style.display = 'block';
      password[0].setAttribute('placeholder', 'Incorrect password');
      password[0].value = '';
    }
  };

  request.onerror = () => {
    parent.location.hash = hash;
    alert[0].style.display = 'block';
    password[0].setAttribute('placeholder', 'Incorrect password');
    password[0].value = '';
  };
  request.send();
};

button[0].addEventListener('click', () => {
  login(password[0].value);
});

document.onkeydown = (e) => {
  e = e || window.event;
  if (e.key === 'Enter') login(password[0].value);
};
