const button = document.getElementById('shareButton')
const video = document.getElementById('screen')

button.addEventListener("click", async() => {

    try{

        const stream = await navigator.mediaDevices.getDisplayMedia({

            video: true,
            audio: true
        })

        video.srcObject = stream

    }catch(error){

        console.error(error)
    }
})