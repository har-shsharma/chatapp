const socket=io("http://localhost:8000");
const username=prompt("Enter your name");
const messageContainer=document.querySelector(".messageContainer");
const form=document.querySelector("#send-container");
const messageInput=document.getElementById("messageInp");
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight; 
}
socket.emit("new-user-joined" , username );
socket.on("user-joined",username=>{
    append(`${username} joined the chat`,"left");
});
socket.on("receive",data=>{
    append(`${data.username}:${data.message}`,"left");
});
socket.on('left',username=>{
    append(`${username} left the chat`,"left");
})
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,"right");
    socket.emit("send",message);
    messageInput.value="";
});