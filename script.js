const infosCad = document.getElementById("infos-cad");
const lineup = document.getElementById("lineup");
const formAdd = document.getElementById("form-add");
const formRemove = document.getElementById("form-remove");
const btnSubmit = document.getElementById("btn-submit");

let playerList = [];

function deleteDiv() {
  while (infosCad.firstChild) {
    infosCad.removeChild(infosCad.firstChild);
  }
}

function showLineup() {
  let listElement = document.getElementById("lineup-list")

  while (listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }

  playerList.map((player) => {
    let itemElement = document.createElement("li");
    itemElement.id = "player-" + player.number;
    itemElement.innerText = player.number + ". " + player.name + " - " + player.position;
    listElement.appendChild(itemElement);
  });

  lineup.appendChild(listElement);
}

formAdd.addEventListener("submit", (event) => {
  event.preventDefault();

  let playerName = document.getElementById("playerName");
  let playerNumber = document.getElementById("playerNumber");
  let playerPosition = document.getElementById("playerPosition");

  let titleConfirm = document.createElement("h2");
  titleConfirm.innerText = "Desja confirmar essas informações?";

  let nameConfirm = document.createElement("p");
  nameConfirm.innerText = `Nome do jogador: ${playerName.value}`;

  let numberConfirm = document.createElement("p");
  numberConfirm.innerText = `Número do jogador: ${playerNumber.value}`;

  let positionConfirm = document.createElement("p");
  positionConfirm.innerText = `Posição do jogodor: ${playerPosition.value}`;

  let divBtn = document.createElement("div");
  divBtn.className = "div-btn";

  let btnConfirm = document.createElement("button");
  btnConfirm.innerText = "Confirmar";

  let btnUnconfirm = document.createElement("button");
  btnUnconfirm.innerText = "Não confirmar";

  divBtn.append(btnConfirm, btnUnconfirm);
  infosCad.append(
    titleConfirm,
    nameConfirm,
    numberConfirm,
    positionConfirm,
    divBtn
  );

  btnUnconfirm.addEventListener("click", () => {
    deleteDiv();
  });

  btnConfirm.addEventListener("click", () => {
    if(playerList.length >= 11){
      alert("Máximo de 11 jogadores:")
    } else{
      playerList.push({
        name: playerName.value,
        number: playerNumber.value,
        position: playerPosition.value,
      });
    }

    deleteDiv();

    playerName.value = "";
    playerNumber.value = "";
    playerPosition.value = "";

    console.log(playerList);

    showLineup();
  });
});

formRemove.addEventListener("submit", (event) => {
  event.preventDefault();

  let inputRemove = document.getElementById("inputRemove");

  let findPlayer = playerList.find((jogador) => {
    return jogador.number === inputRemove.value;
  });

  let titleRemove = document.createElement("h2");
  titleRemove.innerText = "Deseja remover esse jogador:";

  let nameRemove = document.createElement("p");
  nameRemove.innerText = `Nome do jogador: ${findPlayer.name}`;

  let numberRemove = document.createElement("p");
  numberRemove.innerText = `Número do jogador: ${findPlayer.number}`;

  let positionRemove = document.createElement("p");
  positionRemove.innerText = `Posição do jogodor: ${findPlayer.position}`;

  let divBtnRemove = document.createElement("div");
  divBtnRemove.className = "div-btn";

  let btnRemove = document.createElement("button");
  btnRemove.innerText = "Remover";

  let btnUnRemove = document.createElement("button");
  btnUnRemove.innerText = "Não remover";

  divBtnRemove.append(btnRemove, btnUnRemove);
  infosCad.append(
    titleRemove,
    nameRemove,
    numberRemove,
    positionRemove,
    divBtnRemove
  );

  btnUnRemove.addEventListener("click", () => {
    deleteDiv();
  });

  btnRemove.addEventListener("click", () => {
    let indexPlayer = playerList.indexOf(findPlayer);
    playerList.splice(indexPlayer, 1);

    console.log(playerList);

    let deletionMessage = document.createElement("h2");
    deletionMessage.innerText = "Jogador removido";

    let playerToRemove = document.getElementById("player-" + inputRemove.value);
    document.getElementById("lineup-list").removeChild(playerToRemove);
    
    deleteDiv();

    setTimeout(() => {
      infosCad.appendChild(deletionMessage);
      deleteDiv();
      showLineup();
    }, 3000);
  });
});
