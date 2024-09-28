const cursor = document.querySelectorAll(".cursor");
const links = document.querySelectorAll(".link");

window.addEventListener("mousemove", (e) => {
  let x = e.pageX;
  let y = e.pageY;

  cursor.forEach((el) => {
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        el.classList.add("hover");
      });
      link.addEventListener("mouseleave", () => {
        el.classList.remove("hover");
      });
    });
  });
});

function openTab(tabName) {
  // Hide all tab contents
  let tabContents = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].classList.remove('active');
  }

  // Remove active class from all tab links
  let tabLinks = document.getElementsByClassName('tab-link');
  for (let i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.remove('active');
  }

  // Show the current tab and add active class to the corresponding link
  document.getElementById(tabName).classList.add('active');
  event.currentTarget.classList.add('active');
}


const textElement = document.querySelector('.multiple-text');
const skills = ["Machine Learning Engineer","Deep Learning Enthusiast","Web Developer","App Developer"];
let skillIndex = 0; // Index to keep track of the current skill
let charIndex = 0;  // Index to keep track of the character in the current skill
let isDeleting = false; // Flag to determine whether we are deleting or typing

// Speed of typing and deleting
const typingSpeed = 150;
const deletingSpeed = 100;
const pauseBetweenSkills = 1000; // Pause time between changing skills

function typeSkill() {
  const currentSkill = skills[skillIndex];
  
  // Handle typing and deleting logic
  if (!isDeleting && charIndex <= currentSkill.length) {
    // If not deleting, add characters one by one
    textElement.textContent = currentSkill.substring(0, charIndex);
    charIndex++;
  } else if (isDeleting && charIndex >= 0) {
    // If deleting, remove characters one by one
    textElement.textContent = currentSkill.substring(0, charIndex);
    charIndex--;
  }

  // If full text is typed out, start deleting after a delay
  if (!isDeleting && charIndex === currentSkill.length) {
    setTimeout(() => isDeleting = true, pauseBetweenSkills); // Pause before starting to delete
  }

  // If text is fully deleted, move to the next skill
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    skillIndex = (skillIndex + 1) % skills.length; // Move to the next skill
  }

  // Recursively call the function with different speeds for typing and deleting
  const speed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeSkill, speed);
}

// Start typing the first skill
typeSkill();

document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Trigger the animation
  const sendButton = document.getElementById('send-button');
  sendButton.classList.add('sending');

  // Simulate a delay for the animation
  setTimeout(function () {
    // Reset the button after animation
    sendButton.classList.remove('sending');
  }, 1000);
});

function SendMail() {
  var params={
    from_name: document.getElementById("name").value,
    email_id: document.getElementById("email").value,
    message: document.getElementById("message").value
  }

  emailjs.send("service_k20w1gl","template_5r6pbxk",params).then(function (res) {
    alert("Message sent successfully!!!");
  })
}


// Function to handle the intersection and trigger animation
function animateOnScroll(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-animation');
    } else {
      entry.target.classList.remove('show-animation');
    }
  });
}

// Set up the Intersection Observer
const observer = new IntersectionObserver(animateOnScroll, {
  threshold: 0.1 // Trigger when 10% of the element is visible
});

// Apply observer to each section you want to animate
document.querySelectorAll('.home, .about, .projects, .contactme').forEach(section => {
  observer.observe(section);
});