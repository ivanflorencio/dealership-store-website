import { useContext, createContext } from "react";

//Contexto para compartilhamento de dados do Beneficiario
export const ProductContext = createContext();

//Actions do contexto
const actions = {
	SELECT_CATEGORY: "SELECT_CATEGORY",
};

//Reducer manipulador do state do contexto
export const BeneficiarioReducer = (state, action) => {
	let newState = { ...state };
	switch (action.type) {
		case actions.ESCOLHER_BENEFICIARIO:
			newState = {};
			newState = action.payload;
			return newState;
		case actions.ALTERAR_ATENDIMENTO:
			newState.dadosAtendimento = action.payload;
			return newState;
		case actions.ALTERAR_LINHAS_CUIDADO:
			newState.linhasCuidado = action.payload;
			return newState;
		case actions.ALTERAR_RISCO:
			newState.risco = action.payload;
			return newState;
		default:
			return newState;
	}
};

//Hook para faciliar o uso do contexto
export const useBeneficiario = () => {
	//
	const { state, dispatch } = useContext(Beneficiario);

	const escolherBeneficiarioState = (beneficiario) =>
		dispatch({
			type: actions.ESCOLHER_BENEFICIARIO,
			payload: beneficiario,
		});

	const alterarAtendimentoState = (atendimento) =>
		dispatch({
			type: actions.ALTERAR_ATENDIMENTO,
			payload: atendimento,
		});

	const alterarLinhasCuidadoState = (linhasCuidado) =>
		dispatch({
			type: actions.ALTERAR_LINHAS_CUIDADO,
			payload: linhasCuidado,
		});

	const alterarRiscoState = (risco) =>
		dispatch({
			type: actions.ALTERAR_RISCO,
			payload: risco,
		});

	const beneficiarioState = state;
	const atendimentoState = state ? state.dadosAtendimento : null;
	const linhasCuidadoState = state ? state.linhasCuidado : null;
	const riscoState = state ? state.risco : null;

	return {
		beneficiarioState,
		atendimentoState,
		linhasCuidadoState,
		riscoState,
		escolherBeneficiarioState,
		alterarAtendimentoState,
		alterarLinhasCuidadoState,
		alterarRiscoState,
	};
};
