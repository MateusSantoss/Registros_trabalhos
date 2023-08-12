class Registro {
	constructor(ano, mes, dia, periodo, descricao, valor, trabalhadores, local) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.periodo = periodo
		this.descricao = descricao
		this.valor = valor
		this.trabalhadores = trabalhadores
		this.local = local
	}

	validarDados() {
    if (
      this.ano === undefined || this.ano === '' || this.ano === null ||
      this.mes === undefined || this.mes === '' || this.mes === null ||
      this.dia === undefined || this.dia === '' || this.dia === null ||
      this.periodo === undefined || this.periodo === '' || this.periodo === null ||
      this.descricao === undefined || this.descricao === '' || this.descricao === null ||
      this.valor === undefined || this.valor === '' || this.valor === null ||
      this.trabalhadores === undefined || this.trabalhadores === '' || this.trabalhadores === null ||
      this.local === undefined || this.local === '' || this.local === null
    ) {
      return false;
    }
    return true;
  }
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}




	recuperarTodosRegistros() {

		//array de registros
		let registros = Array()
		

		let id = localStorage.getItem('id')

		//recuperar todas as registros cadastradas em localStorage
		for(let i = 1; i <= id; i++) {

			//recuperar a registro

			let registro = JSON.parse((localStorage.getItem(i)))
			

			//existe a possibilidade de haver índices que foram pulados/removidos
			//nestes casos nós vamos pular esses índices
			if (registro === null) {
				continue
			}

			
            registro.id = i


			registros.push(registro)
			
			
		}
		
		return registros



		
	}
	pesquisar(registro) {
		let filtrarRegistros = Array()
		filtrarRegistros = this.recuperarTodosRegistros()
        //ano
        if (registro.ano != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => registro.ano == f.ano)

        }
        //mes
        if (registro.mes != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => registro.mes == f.mes)

        }
        //dia
        if (registro.dia != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => registro.dia == f.dia)

        }
        //periodo
        if (registro.periodo != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => registro.periodo == f.periodo)

        }
        //descricao
        if (registro.descricao != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => registro.descricao == f.descricao)

        }
        //valor
        if (registro.valor != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => registro.valor == f.valor)

        }

        //trabalhadores
        if (registro.trabalhadores != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => registro.trabalhadores == f.trabalhadores)

        }
        
        return filtrarRegistros
        
       
		
		
			} 




		remover(id) {
			console.log(id)
			localStorage.removeItem(id)
			

		}

		 }

function mediaDeGastos() {
	let mediaGastos = Array()
	mediaGastos = bd.pesquisar()

	

}



let bd = new Bd()


function criarRegistro() {

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let periodo = document.getElementById('periodo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')
	let trabalhadores = document.getElementById('trabalhadores')
	let local = document.getElementById('local')


	let registro = new Registro(
		ano.value, 
		mes.value, 
		dia.value, 
		periodo.value, 
		descricao.value,
		valor.value,
		trabalhadores.value,
		local.value
	)
	

	


	//registro.validarregistro ()
	if (registro.validarDados()) {
		$('#modal_registro').modal('show')
		document.getElementById('modal_header').className = 'modal-header text-success'
		document.getElementById('modal_titulo').innerHTML = 'Sucesso'
		document.getElementById('modal_body').innerHTML = ' Tudo certo!'
		document.getElementById('modal_btn').innerHTML = 'voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'
	   ano.value = ''
	   mes.value = ''
	   dia.value = ''
	   periodo.value = ''
	   descricao.value = ''
       valor.value = ''
       trabalhadores.value = ''
       local.value = ''
       bd.gravar(registro)


	}else {
		
		$('#modal_registro').modal('show')
		document.getElementById('modal_header').className = 'modal-header text-danger'
		document.getElementById('modal_titulo').innerHTML = 'Erro'
		document.getElementById('modal_body').innerHTML = 'Erro, verifique se todos os dados foram preenchidos'
		document.getElementById('modal_btn').innerHTML = 'voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'
    

	}

	
	

	 
	 }
function carregaListaRegistros(registros = Array(), filtro = false) {

	
     if (registros.length == 0 && filtro == false) {
     	registros = bd.recuperarTodosRegistros() 
     	
     }
	

	let listasRegistros = document.getElementById('listaRegistros')
	listasRegistros.innerHTML = ''
	

	registros.forEach(function(d) {
		let linha = listasRegistros.insertRow()

		
		


       
		linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}` 
		
		switch (parseInt(d.periodo)) {
		case 1: 
			d.periodo = 'manhã'
			break;
		case 2: 
			d.periodo = 'tarde'
			break;
		case 3:
			d.periodo = 'dia inteiro'
			break;
		


		}

		console.log(d)
		linha.insertCell(1).innerHTML = d.periodo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor
		linha.insertCell(4).innerHTML = d.trabalhadores
		linha.insertCell(5).innerHTML = d.local
        //remover registros
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = "<i class='fas fa-times'></i>"
		btn.id = `id_registro${d.id}`
		btn.onclick = function () {
			//alert(this.id)
			let id = this.id.replace('id_registro', '')
			bd.remover(id)
			$('#modal_consulta').modal('show')
			console.log('tudo certo até aqui')
			window.location.reload()

		}
		linha.insertCell(6).append(btn)
		

	})


	
}

function modal () {
	window.location.reload()
	
}

function pesquisarRegistro () {
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let periodo = document.getElementById('periodo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value
	let trabalhadores = document.getElementById('trabalhadores').value
	let local = document.getElementById('local').value

	let registro = new Registro (ano, mes, dia, periodo, descricao, valor, trabalhadores, local)
	let registros = bd.pesquisar(registro)



	carregaListaRegistros(registros, true)

	
	




	

}

function gerarPdf() {
	console.log('pdf')
	//conteudo do pdf
	const content = document.querySelector('#content')


	//configuração do arquivo final pdf 

	if (content) {
	  const options  = {
		  margin:[10, 10, 10, 10],
		  filename: "Dias_de_trabalho.pdf",
		  html2canvas: {scale: 2},
		  jsPDF: {unit: "mm", format: "a4", orientation: "portrait"}
	   }
       
      //gerar e baixar o Pdf
      html2pdf().set(options).from(content).save(); 
      } 

    }
