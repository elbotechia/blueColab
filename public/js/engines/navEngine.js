const navOption1 = ()=>{
    return(`
        <ul class="menu-list">
                    <li class="menu-item">
                        <a class="menu-link" href="/home">Home</a>
                    </li>
                     <li class="menu-item">
                        <a class="menu-link" href="/about">Sobre Nós</a>
                    </li>
                    <li class="menu-item">
                        <a class="menu-link" href="/users/sign-in">Login</a>
                    </li>
                     <li class="menu-item">
                        <a class="menu-link" href="/users/sign-up">Cadastro</a>
                    </li>
                </ul>
        `)
}


const navOption2 = ({userId})=>{
    return(`
        <ul class="menu-list">
                 <li class="menu-item">
                        <a class="menu-link" href="/">Dashboard</a>
                    </li>
                    <li class="menu-item">
                        <a class="menu-link" href="/biblioteca">Biblioteca</a>
                    </li>
                     <li class="menu-item">
                        <a class="menu-link" href="/Cursinho">Cursinho</a>
                    </li>
                    <li class="menu-item">
                        <a class="menu-link" href="/Comunidade">Comunidade</a>
                    </li>
                        <li class="menu-item">
                        <a class="menu-link" href="/profile/${userId}">Meu Perfil</a>
                    </li>
                    <li class="menu-item">
                        <a class="menu-link" href="/Config">Configurações</a>
                    </li>
                     <li class="menu-item">
                        <a class="menu-link" href="/sign-out">Sign-Out</a>
                    </li>
                </ul>
        `)
}


const navTemplate = async ()=>{
try {
    
    const token = localStorage.getItem("token");
    if(!token|| token === "" || token === null){
        return(
            `
            <button id="closeBtn">x</button>
                <nav class="menu">
                    ${navOption1()}
                </nav>
            `
        )
    }
    else{
        return(
            `
            <button id="closeBtn">x</button>
                <nav class="menu">
                    ${navOption2({userId: token.id})}
                </nav>
            `
        )
    }


} catch (error) {

    return(
        `
        <button id="closeBtn">x</button>
            <nav class="menu">
                ${navOption1()}
            </nav>
        `
    )    
}

}


const navEngine = async()=>{
try{
    const headerBTNHTML = document.getElementById("headerBtn");
    const navHtml = document.getElementById("headerAsideNav");

    if(headerBTNHTML && navHtml){
        headerBTNHTML.addEventListener("click", async ()=>{
            // Toggle menu visibility
            if(navHtml.style.display === "none" || navHtml.style.display === ""){
                await showMenu(navHtml);
            } else {
                hideMenu(navHtml);
            }
        });
    }   
}catch(error){
    console.error("Error generating navigation:", error);
    return null;
}
}

const showMenu = async (navElement) => {
    const template = await navTemplate();
    navElement.innerHTML = template;
    navElement.style.display = "block";
    navElement.classList.add("show");
    
    // Add close button event
    const closeBtn = document.getElementById("closeBtn");
    if(closeBtn){
        closeBtn.addEventListener("click", () => {
            hideMenu(navElement);
        });
    }
    
    // Add click outside to close
    document.addEventListener("click", handleClickOutside);
}

const hideMenu = (navElement) => {
    navElement.style.display = "none";
    navElement.classList.remove("show");
    navElement.innerHTML = "";
    
    // Remove click outside listener
    document.removeEventListener("click", handleClickOutside);
}

const handleClickOutside = (event) => {
    const navElement = document.getElementById("headerAsideNav");
    const headerBtn = document.getElementById("headerBtn");
    
    if(navElement && !navElement.contains(event.target) && !headerBtn.contains(event.target)){
        hideMenu(navElement);
    }
}


export default navEngine;