import React from 'react'
import styled from 'styled-components'

const CarrinhoContainer = styled.div`
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    padding: 1vh 1vw;
    width: 20vw;
`

const Titulo = styled.h2`
    margin-top: 0;
`

const DivProdutoNoCarrinho = styled.div`
    padding-bottom: 1vh;
    display: flex;
    justify-content: space-between;
`

const SpanExcluir = styled.span`
    color: red;
`

class Carrinho extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comDesconto: false,
      botaoDesconto: false,
    }
  }

  // componentDidMount() {
  //   const inputArmazenandosString = localStorage.getItem("valoresNoEstado");
  //   const novoEstado = JSON.parse(inputArmazenandosString);
  //   this.setState(novoEstado);
  // }

  // componentDidUpdate() {
  //   const estadoComoString = JSON.stringify(this.state);
  //   localStorage.setItem("valoresNoEstado", estadoComoString);
  // }

  trazProdutosPraLista = () => {
    // aqui eu vou dar um map no carrinho e retornar uma div q contem quantidade - nome (talvez um botão de deletar... q posso fazer mais pra frente)
    // lembrar de estilizar essa div com uma border-botton dashed, só pra dividir os elementos
    return this.props.itensCarrinho.map((cadaProdutoNoCarrinho, index) => {
      return (
        <DivProdutoNoCarrinho key={index}>

          <div>
            {cadaProdutoNoCarrinho.quantidade}<span>x </span>
            {cadaProdutoNoCarrinho.novoProduto.name}
          </div>

          <div>
            <SpanExcluir onClick={() => this.props.removeProdutoDoCarrinho(cadaProdutoNoCarrinho.novoProduto)}>X</SpanExcluir>
          </div>

        </DivProdutoNoCarrinho>
      )
    })
  }

  mudaValorTotal = () => {
    // novoValor não vem de um event ... está relacionado ao que for trazido pra lista acima
    // pego aquele array criado no botão... vou somar os valores dos produtos adicionados multiplicados pelas quantidades
    // talvez usar reduce
    if (this.state.comDesconto === false) {
      return this.props.itensCarrinho.reduce((prevVal, cadaProdutoNoCarrinho, index, array) => {
        return prevVal + cadaProdutoNoCarrinho.novoProduto.value * cadaProdutoNoCarrinho.quantidade
      }, 0)
    } else {
      return this.props.itensCarrinho.reduce((prevVal, cadaProdutoNoCarrinho, index, array) => {
        return prevVal + (cadaProdutoNoCarrinho.novoProduto.value * cadaProdutoNoCarrinho.quantidade) * 0.75
      }, 0)
    }
  }

  gerarDesconto = () => {
    this.setState({
      comDesconto: !this.state.comDesconto,
      botaoDesconto: !this.state.botaoDesconto,
    })
  }

  render() {
    let listaDeProdutosNoCarrinho = this.trazProdutosPraLista()
    let valorTotal = this.mudaValorTotal()
    let mudaTextoBotao = this.state.botaoDesconto === false ? "Quero 25% de desconto!" : "Não quero Desconto!"
    return (
      <CarrinhoContainer>
        <Titulo>Carrinho:</Titulo>
        {listaDeProdutosNoCarrinho}
        <p>Total: <strong>R$ {valorTotal.toFixed(2)}</strong></p>
        <button onClick={this.gerarDesconto}>{mudaTextoBotao}</button>
      </CarrinhoContainer>
    )
  }
}
export default Carrinho;