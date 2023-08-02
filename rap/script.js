const backgrounds = document.querySelectorAll(".back")
const rappers = document.querySelectorAll(".rapper")
const muteToggle = document.querySelector(".mute-toggle")
let mute = true
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

function toggleMute() {
  mute = !mute
  muteToggle.classList.toggle("mute", mute)
}

function attachMusicEvents() {
  if (attachedMusicEvents) return
  attachedMusicEvents = true
  console.log("Attached music events!")
  document.body.requestFullscreen()
  toggleMute()

  rappers.forEach(rapper => {
    const name = rapper.dataset.name
    const music = new Audio(
      `https://github.com/rahmaniali-ir/codepen/raw/main/rap/music/${name}.mp3`
    )
    music.loop = true
    let fadingIn = false
    let fadeIn, fadeOut

    rapper.addEventListener("mouseenter", () => {
      if (mute) return

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
      if (mute) return

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

    muteToggle.addEventListener("click", e => {
      e.stopPropagation()

      if (mute) {
        clearInterval(fadeIn)
        clearInterval(fadeOut)
        fadingIn = false
        music.pause()
        music.volume = 0
      }
    })
  })
}

document.body.addEventListener("click", attachMusicEvents)

muteToggle.addEventListener("click", e => {
  e.stopPropagation()
  toggleMute()
})
