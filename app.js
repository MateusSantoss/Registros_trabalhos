class Despesa {
	constructor(ano, mes, dia, periodo, descricao, valor, trabalhadores) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.periodo = periodo
		this.descricao = descricao
		this.valor = valor
		this.trabalhadores = trabalhadores
	}

	validarDados() {
    if (
      this.ano === undefined || this.ano === '' || this.ano === null ||
      this.mes === undefined || this.mes === '' || this.mes === null ||
      this.dia === undefined || this.dia === '' || this.dia === null ||
      this.periodo === undefined || this.periodo === '' || this.periodo === null ||
      this.descricao === undefined || this.descricao === '' || this.descricao === null ||
      this.valor === undefined || this.valor === '' || this.valor === null ||
      this.trabalhadores === undefined || this.trabalhadores === '' || this.trabalhadores === null
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

		//array de despesas
		let despesas = Array()
		

		let id = localStorage.getItem('id')

		//recuperar todas as despesas cadastradas em localStorage
		for(let i = 1; i <= id; i++) {

			//recuperar a despesa

			let despesa = JSON.parse((localStorage.getItem(i)))
			

			//existe a possibilidade de haver índices que foram pulados/removidos
			//nestes casos nós vamos pular esses índices
			if (despesa === null) {
				continue
			}

			
            despesa.id = i


			despesas.push(despesa)
			
			
		}
		
		return despesas



		
	}
	pesquisar(despesa) {
		let filtrarRegistros = Array()
		filtrarRegistros = this.recuperarTodosRegistros()
        //ano
        if (despesa.ano != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => despesa.ano == f.ano)

        }
        //mes
        if (despesa.mes != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => despesa.mes == f.mes)

        }
        //dia
        if (despesa.dia != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => despesa.dia == f.dia)

        }
        //periodo
        if (despesa.periodo != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => despesa.periodo == f.periodo)

        }
        //descricao
        if (despesa.descricao != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => despesa.descricao == f.descricao)

        }
        //valor
        if (despesa.valor != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => despesa.valor == f.valor)

        }

        //trabalhadores
        if (despesa.trabalhadores != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => despesa.trabalhadores == f.trabalhadores)

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

	console.log(mediaGastos)

}



let bd = new Bd()


function criarDespesa() {

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let periodo = document.getElementById('periodo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')
	let trabalhadores = document.getElementById('trabalhadores')

	let despesa = new Despesa(
		ano.value, 
		mes.value, 
		dia.value, 
		periodo.value, 
		descricao.value,
		valor.value,
		trabalhadores.value
	)

	


	//despesa.validarDespesa ()
	if (despesa.validarDados()) {
		$('#modal_despesa').modal('show')
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
       bd.gravar(despesa)


	}else {
		
		$('#modal_despesa').modal('show')
		document.getElementById('modal_header').className = 'modal-header text-danger'
		document.getElementById('modal_titulo').innerHTML = 'Erro'
		document.getElementById('modal_body').innerHTML = 'Erro, verifique se todos os dados foram preenchidos'
		document.getElementById('modal_btn').innerHTML = 'voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'


	}

	
	

	 
	 }
function carregaListaDespesas(despesas = Array(), filtro = false) {

	
     if (despesas.length == 0 && filtro == false) {
     	despesas = bd.recuperarTodosRegistros() 
     }
	

	let listasDespesas = document.getElementById('listaDespesas')
	listasDespesas.innerHTML = ''
	

	despesas.forEach(function(d) {
		let linha = listasDespesas.insertRow()

		
		


       
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
        //remover despesas
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = "<i class='fas fa-times'></i>"
		btn.id = `id_despesa${d.id}`
		btn.onclick = function () {
			//alert(this.id)
			let id = this.id.replace('id_despesa', '')
			bd.remover(id)
			$('#modal_consulta').modal('show')
			console.log('tudo certo até aqui')
			window.location.reload()

		}
		linha.insertCell(5).append(btn)
		

	})


	
}

function modal () {
	window.location.reload()
	
}

function pesquisarDespesa () {
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let periodo = document.getElementById('periodo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value
	let trabalhadores = document.getElementById('trabalhadores').value

	let despesa = new Despesa (ano, mes, dia, periodo, descricao, valor, trabalhadores)
	let despesas = bd.pesquisar(despesa)



	carregaListaDespesas(despesas, true)

	
	




	

}
