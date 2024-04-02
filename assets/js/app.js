
const  getData = () => {
        
	let data = new Date();
	let dataFormatada = data.toISOString().slice(0,10);
	
	
    document.getElementById('data').value = new Date(data.getTime() - (data.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
	
	
  }


class Registro {
	constructor(ano, mes, dia, periodo, descricao, valor, trabalhadores, local, cargaHoraria) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.periodo = periodo
		this.descricao = descricao
		this.valor = valor
		this.trabalhadores = trabalhadores
		this.local = local
		this.cargaHoraria = cargaHoraria
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
      this.local === undefined || this.local === '' || this.local === null ||
	  this.cargaHoraria === undefined || this.cargaHoraria === '' || this.cargaHoraria === null
	  
    ) {
      return false;
    }
    return true;
  }
}

class BancoDeDados {

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

	gravar(registro) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(registro))

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

        //carga Horária 
		if (registro.cargaHoraria != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => registro.cargaHoraria == f.cargaHoraria)

        }
        
        return filtrarRegistros
        
       
		
		
			} 




		remover(id) {
			
			localStorage.removeItem(id)
			

		}

		 }





let bancoDeDados = new BancoDeDados()


const criarRegistro = () => {
	
	let dataSelecionada = document.getElementById('data').value 
	
	let partesData = dataSelecionada.split("-")
	
	let ano = partesData[0]
    let mes = partesData[1]
    let dia = partesData[2]
     

     
	
	let periodo = document.getElementById('periodo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')
	let trabalhadores = document.getElementById('trabalhadores')
	let local = document.getElementById('local')
	let cargaHoraria = document.getElementById('cargaHoraria')


	let registro = new Registro(
		ano, 
		mes, 
		dia, 
		periodo.value, 
		descricao.value,
		valor.value,
		trabalhadores.value,
		local.value,
		cargaHoraria.value
	)

	
	

	


	//registro.validarregistro ()
	if (registro.validarDados()) {
		$('#modal_registro').modal('show')
		document.getElementById('modal_header').className = 'modal-header text-success'
		document.getElementById('modal_titulo').innerHTML = 'Sucesso'
		document.getElementById('modal_body').innerHTML = ' Tudo certo!'
		document.getElementById('modal_btn').innerHTML = 'voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'
		dataSelecionada.value = ''
		periodo.value = ''
		descricao.value = ''
		valor.value = ''
		trabalhadores.value = ''
		local.value = ''
		cargaHoraria.value = ''
		bancoDeDados.gravar(registro)


	}else {
		
		$('#modal_registro').modal('show')
		document.getElementById('modal_header').className = 'modal-header text-danger'
		document.getElementById('modal_titulo').innerHTML = 'Erro'
		document.getElementById('modal_body').innerHTML = 'Erro, verifique se todos os dados foram preenchidos'
		document.getElementById('modal_btn').innerHTML = 'voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'
    

	}

	
	
         
	 
	 }

	 
const carregaListaRegistros = (registros = Array(), filtro = false) => {
	

	
     if (registros.length == 0 && filtro == false) {
     	registros = bancoDeDados.recuperarTodosRegistros() 
     	
     }
	

	let listasRegistros = document.getElementById('listaRegistros')
	listasRegistros.innerHTML = ''
	

	registros.forEach((registro) => {
		let linha = listasRegistros.insertRow()

		
		


       
		linha.insertCell(0).innerHTML = `${registro.dia} / ${registro.mes} / ${registro.ano}` 
		
		switch (parseInt(registro.periodo)) {
		case 1: 
			registro.periodo = 'manhã'
			break;
		case 2: 
			registro.periodo = 'tarde'
			break;
		case 3:
			registro.periodo = 'dia inteiro'
			break;
		


		}

		
		linha.insertCell(1).innerHTML = registro.periodo
		linha.insertCell(2).innerHTML = registro.descricao
		linha.insertCell(3).innerHTML = registro.valor
		linha.insertCell(4).innerHTML = registro.trabalhadores
		linha.insertCell(5).innerHTML = registro.local
		if (registro.cargaHoraria == undefined || registro.cargaHoraria == null || isNaN(registro.cargaHoraria) || registro.cargaHoraria == "") {
            linha.insertCell(6).innerHTML = 'Sem registro'
		} else {
			linha.insertCell(6).innerHTML = registro.cargaHoraria
		}
		
		
        //remover registros
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = "<i class='fas fa-times'></i>"
		btn.id = `id_registro${registro.id}`
		btn.onclick = function () {
			//alert(this.id)
			let id = this.id.replace('id_registro', '')
			bancoDeDados.remover(id)
			$('#modal_consulta').modal('show')
			document.getElementById('modal_header').className = 'modal-header text-success'
			
			
				
		

		}
		linha.insertCell(7).append(btn)
		

	})


	
}
const modal = () => window.location.reload()
	


const pesquisarRegistro = () => {
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = '0' + document.getElementById('dia').value
	let periodo = document.getElementById('periodo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value
	let trabalhadores = document.getElementById('trabalhadores').value
	let local = document.getElementById('local').value
    let cargaHoraria = document.getElementById('cargaHoraria').value
	let registro = new Registro (ano, mes, dia, periodo, descricao, valor, trabalhadores, local, cargaHoraria)
	let registros = bancoDeDados.pesquisar(registro)
	



	carregaListaRegistros(registros, true)

	
	




	

}



//Somatoria dos valores
//Somatoria dos valores
 const somaValores = () => {
	let registros = bancoDeDados
	.recuperarTodosRegistros();

	let data = new Date();
	let dataFormatada = data.toISOString().slice(0,10);
	

	let partesData = dataFormatada.split("-")
	
	let ano = partesData[0]
    let mes = partesData[1]
    let dia = partesData[2]
	

	let valores = {
		mes:0,
		ano:0,
		total:0,
		horasTrabalhadas:0
	}

	

	
	for (let i = 0; i < registros.length; i++) {

		var registroCargaHoraria = parseFloat(registros[i]['cargaHoraria']) 
        //verifica se os registro no campo de cargar Horaria é 
		if (isNaN(registroCargaHoraria)) {
			registros[i]['cargaHoraria'] = 0;
			
			
		} else {
		 valores.horasTrabalhadas += parseFloat(registros[i]['cargaHoraria']);
		
		
	    
		
		valores.total += parseFloat(registros[i]['valor'])

		if (registros[i]['ano'] == ano) {
			let ano = Array ()
			ano = registros[i]
			valores.ano += parseFloat(ano.valor) 
			
		 }

		 if (registros[i]['mes'] == mes) {
			let mes = Array ()
			mes = registros[i]
			valores.mes += parseFloat(mes.valor) 
			
		 }
	}

	


		

	document.getElementById('ganhosMes').innerHTML = `${valores.mes.toFixed(2)} R$`
	document.getElementById('ganhosAno').innerHTML = `${valores.ano.toFixed(2)} R$` 
	document.getElementById('ganhosTotais').innerHTML = `${valores.total.toFixed(2)} R$`
    document.getElementById('horasTrabalhadas').innerHTML = `${valores.horasTrabalhadas.toFixed(2)} Horas`

}	

	}




	


const gerarPdf = () => {
	
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
