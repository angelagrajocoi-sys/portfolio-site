
// for float up animation of the elements as the user scrolls
let observer = new IntersectionObserver((entries) => 
{
  entries.forEach(entry => 
    {
    if(entry.isIntersecting)
    {
      entry.target.querySelectorAll('*').forEach(child => 
    {
        child.classList.add('float-up');
      });
    }
    else 
    {
        entry.target.querySelectorAll('*').forEach(child => 
        {
          child.classList.remove('float-up');
        });
      
    }
  });
});

document.querySelectorAll('.hero-content, .about-card, .skills, .projects, .contact').forEach((section) => 
{
  observer.observe(section);
});

// for dark mode / light mode
const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('i');

toggleBtn.addEventListener('click', () => 
{
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')) 
 {
    icon.classList.remove("ri-sun-fill");
    icon.classList.add("ri-moon-fill");
  } 
  else 
 {
    icon.classList.remove("ri-moon-fill");
    icon.classList.add("ri-sun-fill");
  }
});


// for clicking image to open and close
function openModal(src)
{
  const modal = document.getElementById('img-modal');
  const modalImg = document.getElementById('modal-img');
  modalImg.src = src;
  modal.style.display ='flex'
}

function closeModal()
{
  document.getElementById('img-modal').style.display ='none';
}


// for the contact / message me form direct to my email
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => 
{
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "52588170-de5d-49f4-9101-8ba554004170");

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