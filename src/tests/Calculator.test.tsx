import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from '../pages/Calculator'

test('ignora números después del noveno carácter del display', async () => {
    const user = userEvent.setup()

    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '1' }))
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '4' }))
    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: '6' }))
    await user.click(screen.getByRole('button', { name: '7' }))
    await user.click(screen.getByRole('button', { name: '8' }))
    await user.click(screen.getByRole('button', { name: '9' }))
    await user.click(screen.getByRole('button', { name: '0' }))

    expect(screen.getByTestId('display')).toHaveTextContent('123456789')
})

test('calcula operaciones encadenadas usando el resultado acumulado', async () => {
    const user = userEvent.setup()

    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '8' }))
    await user.click(screen.getByRole('button', { name: '+' }))
    await user.click(screen.getByRole('button', { name: '8' }))
    await user.click(screen.getByRole('button', { name: '+' }))
    await user.click(screen.getByRole('button', { name: '8' }))
    await user.click(screen.getByRole('button', { name: '=' }))

    expect(screen.getByTestId('display')).toHaveTextContent('24')
})

test('muestra ERROR cuando el resultado es mayor a 999999999', async () => {
    const user = userEvent.setup()

    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '9' }))
    await user.click(screen.getByRole('button', { name: '9' }))
    await user.click(screen.getByRole('button', { name: '9' }))
    await user.click(screen.getByRole('button', { name: '9' }))
    await user.click(screen.getByRole('button', { name: '9' }))
    await user.click(screen.getByRole('button', { name: '9' }))
    await user.click(screen.getByRole('button', { name: '9' }))
    await user.click(screen.getByRole('button', { name: '9' }))
    await user.click(screen.getByRole('button', { name: '9' }))

    await user.click(screen.getByRole('button', { name: '+' }))

    await user.click(screen.getByRole('button', { name: '1' }))

    await user.click(screen.getByRole('button', { name: '=' }))

    expect(screen.getByTestId('display')).toHaveTextContent('ERROR')
})

test('muestra ERROR cuando el resultado es negativo', async () => {
    const user = userEvent.setup()

    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: '-' }))
    await user.click(screen.getByRole('button', { name: '8' }))
    await user.click(screen.getByRole('button', { name: '=' }))

    expect(screen.getByTestId('display')).toHaveTextContent('ERROR')
})

test('redondea resultados decimales largos a 9 caracteres', async () => {
    const user = userEvent.setup()

    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: '/' }))
    await user.click(screen.getByRole('button', { name: '7' }))
    await user.click(screen.getByRole('button', { name: '=' }))

    expect(screen.getByTestId('display')).toHaveTextContent('3.142857')
})