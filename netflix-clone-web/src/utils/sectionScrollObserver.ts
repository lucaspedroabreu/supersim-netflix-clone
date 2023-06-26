const header = document.querySelector("header")
  const sectionOne = document.querySelector(".hero")
  const sectionOptions = { }
  const sectionOneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && header!.classList.contains('nav__scrolled')) {
        header!.classList.remove('nav__scrolled')
      } else {
        header!.classList.add('nav__scrolled')
      }
    })
  }, sectionOptions)

sectionOneObserver.observe(sectionOne!)