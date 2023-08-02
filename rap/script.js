const backgrounds = document.querySelectorAll(".back")
const rappers = document.querySelectorAll(".rapper")
let attachedMusicEvents = false

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

function attachMusicEvents() {
  if (attachedMusicEvents) return
  attachedMusicEvents = true
  console.log("Attached music events!")

  rappers.forEach(rapper => {
    const name = rapper.dataset.name
    const music = new Audio(`./music/${name}.mp3`)
    music.loop = true
    let fadingIn = false
    let fadeIn, fadeOut

    rapper.addEventListener("mouseenter", () => {
      music.volume = 0
      music.play()

      fadingIn = true
      fadeIn = setInterval(() => {
        if (music.volume < 1) music.volume = Math.min(1, music.volume + 0.1)
        else {
          clearInterval(fadeIn)
          fadingIn = false
        }
      }, 100)
    })

    rapper.addEventListener("mouseleave", () => {
      if (fadingIn) {
        clearInterval(fadeIn)
        fadingIn = false
        music.pause()
      }

      fadeOut = setInterval(() => {
        if (music.volume > 0) music.volume = Math.max(0, music.volume - 0.1)
        else {
          clearInterval(fadeOut)
          music.pause()
        }
      }, 100)
    })
  })
}

document.body.addEventListener("click", attachMusicEvents)
