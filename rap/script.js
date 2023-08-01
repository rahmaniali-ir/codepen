const backgrounds = document.querySelectorAll(".back")
const rappers = document.querySelectorAll(".rapper")

backgrounds.forEach((back, i) => {
  setTimeout(() => {
    back.classList.remove("show")
  }, i * 100)
})

rappers.forEach(rapper => {
  const name = rapper.dataset.name
  const background = document.querySelector(".back." + name)

  rapper.addEventListener("mouseenter", () => {
    background.classList.add("show")
  })

  rapper.addEventListener("mouseleave", () => {
    background.classList.remove("show")
  })
})
