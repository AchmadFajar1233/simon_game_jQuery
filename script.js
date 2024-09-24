const buttonColors = ["red", "blue", "green", "yellow"]
$("h1").text("Click any keys to start the game")


let emptyPattern = []
let userClickedPattern = []

let level = 0
let started = false



$("body").on("keypress", () =>{
        if(!started){
            $('h1').text(`level ${level}`)
            nexSequence()
            started = true
        }
    }
)

$(".btn").click((ev)=>{
    const userChosenColor = ev.target.id
    userClickedPattern.push(userChosenColor)
    audioPlay(userChosenColor)
    $(`#${userChosenColor}`).fadeOut(200).fadeIn(200)
    animatedPressed(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
})


function checkAnswer (curentPattern){
    if(emptyPattern[curentPattern] === userClickedPattern[curentPattern]){
        console.log("succes")
        if(emptyPattern.length === userClickedPattern.length){
            setTimeout(()=>{
                nexSequence()
            }, 1000)
        }
    } else{
        console.log("wrong")
        let audio = new Audio('sounds/wrong.mp3')
        audio.play()
        $("body").addClass('game-over')
        setTimeout(() =>{
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Press any keys to start")
        $("body").on("keypress", () =>{
            startOver()
        })
    }
}
function startOver(){
    level = 0
    emptyPattern = []
    started = false
}
function nexSequence(){
    userClickedPattern = []
    let randomNumber = Math.floor(Math.random() * 4)
    const randomChosenColor = buttonColors[randomNumber]
    emptyPattern.push(randomChosenColor)

    const btn = $(`#${randomChosenColor}`)
    btn.fadeOut(200).fadeIn(200)

    audioPlay(randomChosenColor)
    animatedPressed(randomChosenColor)
    level ++
    $("h1").text(`level ${level}`)
    console.log(emptyPattern)
}

function audioPlay(id){
    let audio = new Audio( `sounds/${id}.mp3`)
    audio.play()
}

function animatedPressed(id){
    $(`#${id}`).addClass('pressed')
    setTimeout(()=>{
        $(`#${id}`).removeClass('pressed')
    }, 100)
}

