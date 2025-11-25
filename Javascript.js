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

document.querySelectorAll('.hero-content, .about-card, .skills, .projects, .contacts').forEach((section) => 
{
  observer.observe(section);
});


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
