const aboutImg = document.querySelector('.about-img');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      aboutImg.classList.add('animate');
    }
  });
}, { threshold: 0.5 }); // starts when 50% visible

observer.observe(aboutImg);



document.querySelectorAll('.inner-content').forEach(box => {
  const percent = parseInt(box.getAttribute('data-percent'), 10);
  const progressBar = box.querySelector('.progress-bar');
  const percentText = box.querySelector('.percent-text');
  let countInterval;

  box.addEventListener('mouseenter', () => {
    let current = 0;
    clearInterval(countInterval);
    percentText.textContent = "0%";
    progressBar.style.width = percent + '%';

    countInterval = setInterval(() => {
      if (current < percent) {
        current++;
        percentText.textContent = current + "%";
      } else {
        clearInterval(countInterval);
      }
    }, 15); // speed of number increase
  });

  box.addEventListener('mouseleave', () => {
    clearInterval(countInterval);
    percentText.textContent = '';
    progressBar.style.width = '0%';
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const text = "Software Engineering Student";
  const typingElement = document.getElementById("typing-text");
  let index = 0;

  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 150); // 100ms delay between each character
    }
  }

  // Clear text first and start typing effect
  typingElement.textContent = "";
  type();
});


// Using id

document.getElementById('stopstalk-btn').addEventListener('click', () => {
    window.open('https://www.stopstalk.com/', '_blank');
});


document.getElementById('contents-btn').addEventListener('click', () => {
    window.open('https://github.com/sadianusratmunny51', '_blank');
});

document.getElementById('web-btn').addEventListener('click', () => {
    window.open('https://github.com/sadianusratmunny51/Web_Projects', '_blank');
});


document.getElementById('game-btn').addEventListener('click', () => {
    window.open('https://github.com/sadianusratmunny51/SWE224GAME', '_blank');
});

document.getElementById('app-btn').addEventListener('click', () => {
    window.open('https://github.com/sadianusratmunny51/SWE250_Project', '_blank');
});


document.getElementById('view-app-ui-btn').addEventListener('click', () => {
    window.open('', '_blank');
});

document.getElementById('tracease-btn').addEventListener('click', () => {
    window.open('https://github.com/sadianusratmunny51/SWE250_Project', '_blank');
});


document.getElementById('soaring-btn').addEventListener('click', () => {
    window.open('https://github.com/sadianusratmunny51/SWE224GAME', '_blank');
});


document.getElementById('').addEventListener('click', () => {
    window.open('', '_blank');
});

document.getElementById('tracease-btn').addEventListener('click', () => {
    window.open('https://github.com/sadianusratmunny51/SWE250_Project', '_blank');
});


document.getElementById('soaring-btn').addEventListener('click', () => {
    window.open('https://github.com/sadianusratmunny51/SWE224GAME', '_blank');
});


const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(event) {
  // ফর্ম সাবমিট হলে পেজ রিলোড হওয়া থেকে আটকানোর জন্য
  event.preventDefault();

  // এখানে আপনি আপনার মেসেজ পাঠানোর লজিক যুক্ত করতে পারেন।
  // যেমন: fetch() API ব্যবহার করে সার্ভারে ডেটা পাঠানো।

  // মেসেজটি সফলভাবে পাঠানো হয়েছে তা বোঝানোর জন্য একটি অ্যালার্ট দেখানো হচ্ছে
  alert('Message Sent Successfully!');
});


