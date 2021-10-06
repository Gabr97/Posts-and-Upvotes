import Cadastro from '../components/Cadastro/Cadastro'
import {render} from '@testing-library/react'

describe('Componente de Cadastro', () => {
  it('Deverá haver mensagem para criar usuário.', function () {
    let { getByText } = render(<Cadastro/>)
    expect(getByText('Crie um usuário.')).toBeInTheDocument
  })
})
