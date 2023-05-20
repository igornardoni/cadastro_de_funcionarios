const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sCargo = document.querySelector('#m-cargo')
const sSetor = document.querySelector('#m-setor')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
    modal.classList.add('active')
  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
      }
    }
  
    if (edit) {
      sNome.value = itens[index].nome
      sCargo.value = itens[index].cargo
      sSetor.value = itens[index].setor
      id = index
    } else {
      sNome.value = ''
      sCargo.value = ''
      sSetor.value = ''
    }
    
  }
  
  function editItem(index) {
  
    openModal(true, index)
  }
  
  function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
  }
  
  function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.cargo}</td>
      <td>${item.setor}</td>
      <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `
    tbody.appendChild(tr)
  }
  
  btnSalvar.onclick = e => {
    
    if (sNome.value == '' || sCargo.value == '' || sSetor.value == '') {
      return
    }
  
    e.preventDefault();
  
    if (id !== undefined) {
      itens[id].nome = sNome.value
      itens[id].cargo = sCargo.value
      itens[id].setor = sSetor.value
    } else {
      itens.push({'nome': sNome.value, 'cargo': sCargo.value, 'setor': sSetor.value})
    }
  
    setItensBD()
  
    modal.classList.remove('active')
    loadItens()
    id = undefined
  }
  
  function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
      insertItem(item, index)
    })
  
  }
  
  const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
  const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))
  
  loadItens()