import { useEffect, useState } from 'react';

/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

function App() {
	const [progressPercentage, setProgressPercentage] = useState(0);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		maritalStatus: '',
		gender: '',
	});

	const handleChanges = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => {
			const newFormData = { ...prevState, [name]: value };
			return newFormData;
		});
	};

	const validateForm = () => {
		const numOfFields = Object.entries(formData).length;
		let numOfValidFields = 0;

		Object.entries(formData).forEach(([key, value]) => {
			if (key === 'name') {
				const splited = value.split(' ');
				numOfValidFields += !!splited[1] && splited[1] !== ' ' ? 1 : 0;

				return;
			}

			if (key === 'email') {
				const exp =
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

				numOfValidFields += exp.test(value) ? 1 : 0;

				return;
			}

			numOfValidFields += value !== '' ? 1 : 0;
		});

		const progressCalc = (numOfValidFields / numOfFields) * 100;

		setProgressPercentage(progressCalc);
	};

	const handleSubmit = () => {
		alert('Formulário preenchido com sucesso');
		setFormData({
			name: '',
			email: '',
			maritalStatus: '',
			gender: '',
		});
	};

	useEffect(() => {
		validateForm();
	}, [formData]);

	return (
		<div className="App">
			<h3>desafio fernandev</h3>
			<h1>progresso do formulário</h1>
			<main>
				{
					<div className="bar-container">
						<div className="bar" style={{ width: `${progressPercentage}%` }} />
					</div>
				}
				<div className="form-group">
					<label htmlFor="">Nome Completo</label>
					<input
						name={'name'}
						value={formData['name']}
						onChange={handleChanges}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="">E-mail</label>
					<input
						name={'email'}
						value={formData['email']}
						onChange={handleChanges}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="">Estado Civil</label>
					<select
						name={'maritalStatus'}
						onChange={handleChanges}
						value={formData['maritalStatus']}
					>
						<option value="">- selecione...</option>
						<option value="solteiro">Solteiro</option>
						<option value="casado">Casado</option>
						<option value="divorciado">Divorciado</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="">Gênero</label>
					<div className="radios-container">
						<span>
							<input
								name={'gender'}
								type="radio"
								value={'m'}
								checked={
									formData['gender'] !== '' && formData['gender'] === 'm'
								}
								onChange={handleChanges}
							/>{' '}
							Masculino
						</span>
						<span>
							<input
								name={'gender'}
								type="radio"
								value={'f'}
								checked={
									formData['gender'] !== '' && formData['gender'] === 'f'
								}
								onChange={handleChanges}
							/>{' '}
							Feminino
						</span>
					</div>
				</div>
				<button onClick={handleSubmit} disabled={progressPercentage !== 100}>
					Enviar Formulário
				</button>
			</main>
		</div>
	);
}

export default App;
