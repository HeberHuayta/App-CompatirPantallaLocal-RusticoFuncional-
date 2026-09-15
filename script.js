const button = document.getElementById('shareButton')
const video = document.getElementById('screen')

const videoRemote = document.getElementById('remote')
const buttonRemote = document.getElementById('reciveRemote')

const answerInput = document.getElementById('answerInput')
const buttonResponseInput = document.getElementById('responseInput')

const offerInput = document.getElementById('offerInput')

let peer

button.addEventListener("click", async() => {

    try{
        
        const stream = await navigator.mediaDevices.getDisplayMedia({

            video: true,
            audio: true
        })

        peer = new RTCPeerConnection();

        stream.getTracks().forEach(track => {

            peer.addTrack(track, stream)
        })
        
        const offer = await peer.createOffer()

        await peer.setLocalDescription(offer)

        console.log(offer)

    }catch(error){

        console.error(error)
    }
})

buttonResponseInput.addEventListener("click", async() =>{

    const answerRemote = JSON.parse(answerInput.value)

     await peer.setRemoteDescription(answerRemote)
})


buttonRemote.addEventListener("click", async() => {

    try{

        peer = new RTCPeerConnection();

        peer.ontrack = (event) => {

            videoRemote.srcObject = event.streams[0]
        }

        const offer = JSON.parse(offerInput.value)

        await peer.setRemoteDescription(offer)

        const answer = await peer.createAnswer()

        await peer.setLocalDescription(answer)

        console.log(answer)

    } catch(error){

        console.error(error)
    }
})