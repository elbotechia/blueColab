

const renderModalContent = (modal) => {
    const {id, title, content } = modal;

    return(`
        <div class="modal-overlay" id="modalOverlay">
            <div class="modal-container">
                <div class="modal-header">
                    <h5 class="modal-title">${title}</h5>
                    <button type="button" class="modal-close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${content}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    `);
};
const valuesEngine = async () => {
    const modals = [
        {
            id: "modal1",
            title: "Modal 1",
            content: "Content for Modal 1"
        },
        {
            id: "modal2",
            title: "Modal 2",
            content: "Content for Modal 2"
        },
        {
            id: "modal3",
            title: "Modal 3",
            content: "Content for Modal 3"
        },
        {
            id: "modal4",
            title: "Modal 4",
            content: "Content for Modal 4"
        }
    ];

    try {
        const pageHome = window.location.href.split("/").pop().toLowerCase();

        if (pageHome === "home" || pageHome === "" || pageHome.includes("home")) {
            const modal1 = modals[0];
            const modal2 = modals[1];
            const modal3 = modals[2];           
            const modal4 = modals[3];
            
            console.log(modal1, " ", modal2, " ", modal3, " ", modal4);

            // Função para mostrar modal
            const showModal = (modal) => {
                const modalContainer = document.getElementById("modalValue");
                if (modalContainer) {
                    modalContainer.innerHTML = renderModalContent(modal);
                    modalContainer.style.display = "block";
                    
                    // Adicionar event listener para fechar modal
                    const closeButtons = modalContainer.querySelectorAll('[data-dismiss="modal"]');
                    closeButtons.forEach(button => {
                        button.addEventListener("click", () => {
                            modalContainer.style.display = "none";
                            modalContainer.innerHTML = "";
                        });
                    });

                    // Fechar modal ao clicar no overlay
                    const overlay = modalContainer.querySelector('.modal-overlay');
                    if (overlay) {
                        overlay.addEventListener("click", (e) => {
                            if (e.target === overlay) {
                                modalContainer.style.display = "none";
                                modalContainer.innerHTML = "";
                            }
                        });
                    }
                }
            };

            // Event listeners para os botões
            const value1Button = document.getElementById("value1");
            if (value1Button) {
                value1Button.addEventListener("click", () => {
                    showModal(modal1);
                });
            }

            const value2Button = document.getElementById("value2");
            if (value2Button) {
                value2Button.addEventListener("click", () => {
                    showModal(modal2);
                });
            }

            const value3Button = document.getElementById("value3");
            if (value3Button) {
                value3Button.addEventListener("click", () => {
                    showModal(modal3);
                });
            }

            const value4Button = document.getElementById("value4");
            if (value4Button) {
                value4Button.addEventListener("click", () => {
                    showModal(modal4);
                });
            }

        } else {
            console.log("sem modal");
        }
    } catch (error) {
        console.log("error: " + error);
    }
};




export default valuesEngine;

// CSS para o modal
const modalCSS = `
<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow: hidden;
}

.modal-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-title {
    margin: 0;
    color: #333;
    font-size: 1.5rem;
}

.modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-close:hover {
    color: #333;
}

.modal-body {
    padding: 20px;
}

.modal-footer {
    padding: 20px;
    border-top: 1px solid #eee;
    text-align: right;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background-color: #5a6268;
}

#modalValue {
    display: none;
}
</style>
`;

// Injetar CSS na página
document.head.insertAdjacentHTML('beforeend', modalCSS);