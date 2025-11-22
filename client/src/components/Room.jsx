import React, {useCallback,useEffect,useState} from 'react'

import { useSocket } from '../context/socketProvider';
import peer from "../services/peer"

const Room = () => {
    const socket = useSocket();  // FIXED
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [mystream, setMyStream] = useState(null);
    const [remoteStream , setRemoteStream]=useState();

    const handleUserJoined = useCallback(({ email, id }) => {
      console.log(`User joined: ${email}`);
      setRemoteSocketId(id);
    }, []);

      const handleIncomingCall=useCallback(async({from,offer})=>{

          const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
         });

         setMyStream(stream);
         console.log(`Incoming call`,from,offer);

         console.log('incoming Call',from,offer);
         const ans=await peer.getAnswer(offer);
    
      },[]);

      const handleCallAccepted=useCallback(({from,ans})=>{
          peer.setLocalDescription(ans);
          console.log("call Accepted");
          if(mystream){
                  for(const track of mystream.getTracks()){
          peer.peer.addTrack(track, mystream);
           }
          }
       

      },[mystream]);

      const handleNegoNeeded=useCallback(async()=>{
             const offer=await peer.getOffer();
             socket.emit('peer:nego:needed',{offer,to:remoteSocketId})
        },[remoteSocketId,socket])

      useEffect(()=>{
        peer.peer.addEventListener('negotiationneeded',handleNegoNeeded);
        return()=>{
          peer.peer.removeEventListener('negotiationneeded',handleNegoNeeded);
        }
      },[handleNegoNeeded]);

      const handleNegoNeedIncoming=useCallback(async({from,offer})=>{
        const ans=await peer.getAnswer(offer);
        socket.emit('peer:nego:done',{to:from,ans})
      },[socket]);

      const handleNegoNeedfinal=useCallback(async({ans})=>{
            await peer.setLocalDescription(ans);
      },[])

       useEffect(()=>{
        peer.peer.addEventListener('track',async ev=>{
          const remoteStream=ev.streams[0];
        setRemoteStream(remoteStream);
        })
       },[])

    
    useEffect(() => {
       socket.on("user:joined", handleUserJoined);
           socket.on("incoming:call",handleIncomingCall);
           socket.on('call:accepted',handleCallAccepted);
            socket.on('peer:nego:needed',handleNegoNeedIncoming)
            socket.on('peer:nego:final',handleNegoNeedfinal);


       return () => {
        socket.off("user:joined", handleUserJoined);
        socket.off("incoming:call",handleIncomingCall)
         socket.off('call:accepted',handleCallAccepted);
            socket.off('peer:nego:needed',handleNegoNeedIncoming);
             socket.off('peer:nego:final',handleNegoNeedfinal);
    }
       
    }, [socket, handleUserJoined,handleIncomingCall,handleCallAccepted,handleNegoNeedIncoming,handleNegoNeedfinal]);

    const handleCallUser = useCallback(async () => {
         const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
         });

         const offer=await peer.getOffer();
         socket.emit("user:call",{to:remoteSocketId,offer});

         setMyStream(stream);
    }, [remoteSocketId,socket]);

  return (
    <div>
     <h1>Home page</h1>

     <h1>
        {remoteSocketId ? 'Connected' : 'No one in room'}
     </h1>

     {remoteSocketId && <button onClick={handleCallUser}>Start Call</button>}

   {mystream && (
    <>
  <video
    ref={videoRef => {
      if (videoRef) videoRef.srcObject = mystream;
    }}
    autoPlay
    muted
    playsInline
    width="500"
    height="300"
    style={{ backgroundColor: "black" }}
  />
  </>
)}




{remoteStream && (
    <>
  <video
    ref={videoRef => {
      if (videoRef) videoRef.srcObject = remoteStream;
    }}
    autoPlay

    playsInline
    width="500"
    height="300"
    style={{ backgroundColor: "black" }}
  />
  </>
)}

    </div>
  )
}

export default Room;


