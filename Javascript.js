
// for float up animation of the elements as the user scrolls
let observer = new IntersectionObserver((entries) => // to watch elements and run the float-up animation when it is within viewport  
{
  entries.forEach(entry => // loops through every element that's either in the view or not 
  {
    if(entry.isIntersecting) // this is called if the element is visible in the viewport
    {
      entry.target.querySelectorAll('*').forEach(child => // if section is visible, this gets all the elements
      {
        child.classList.add('float-up'); // to enable float-up as the animation
      });
    }
    else // and this is called when the element is off-screen
    {
        entry.target.querySelectorAll('*').forEach(child => 
        {
          child.classList.remove('float-up'); 
          // to remove animation if section is not visible so the animation can run again once it is in view
        });
      
    }
  });
});

// this selects all of the sections i want to be watched by the observer 
document.querySelectorAll('.hero-content, .about, .skills, .projects, .contact').forEach((section) => 
{
  observer.observe(section);
});

// for dark mode / light mode
const toggleBtn = document.getElementById('theme-toggle'); // gets the button that the user clicks to switch themes
const icon = toggleBtn.querySelector('i'); // gets the icon <i> </i> icon inside that button to switch them later

toggleBtn.addEventListener('click', () => // this runs when the button is clicked
{
  document.body.classList.toggle('dark-mode'); // adds dark-mode to <body> </body> to switch colors/themes
  if(document.body.classList.contains('dark-mode')) // checks if the dark mode is active
  {
    icon.classList.remove("ri-sun-fill"); // to switch icon from Sun to Moon using RemixIcon 
    icon.classList.add("ri-moon-fill");
  } 
  else // if not, meaning lightmode is active
  {
    icon.classList.remove("ri-moon-fill"); // then switch the Moon icon to the Sun icon to match which mode is on
    icon.classList.add("ri-sun-fill");
  }
});


// for clicking image to open and close
function openModal(src) // method or action to do when openModal is called meaning to open an image
{
  const modal = document.getElementById('img-modal'); // this gets the image box overlay i have made in the html
  const modalImg = document.getElementById('modal-img'); // then gets the image itself inside the box
  modalImg.src = src; // sets the modal image source to what image the user clicks so it enlarges
  modal.style.display ='flex' // so the image box appears above the page when clicked
}

function closeModal() // hides the image box by setting the display to none after clicking the Close button
{
  document.getElementById('img-modal').style.display ='none';
}


// for the contact / message me form direct to my email
const form = document.getElementById('form'); // to get the contact form element
const submitBtn = form.querySelector('button[type="submit"]'); // get the submit button inside the form

form.addEventListener('submit', async (e) => // this is what happens when the submit is clicked and the form is submitted
{
    e.preventDefault(); // given by Web3Forms

    const formData = new FormData(form);
    formData.append("access_key", "52588170-de5d-49f4-9101-8ba554004170"); // web3forms access key to tell which account the form belongs to

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", 
        {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) 
        {
            alert("Success! Your message has been sent.");
            form.reset();
        } else 
          {
            alert("Error: " + data.message);
        }

    } catch (error) 
    {
        alert("Something went wrong. Please try again.");
    } finally 
    {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});