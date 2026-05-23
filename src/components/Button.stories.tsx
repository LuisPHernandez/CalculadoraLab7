import type { Meta, StoryObj } from '@storybook/react-vite'
import Button from './Button'

const meta = {
    title: 'Components/Button',
    component: Button,
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const NumberButton: Story = {
    args: {
        label: '8',
        isNumber: true,
        isZero: false,
        onPress: () => undefined,
    },
}

export const ZeroButton: Story = {
    args: {
        label: '0',
        isNumber: true,
        isZero: true,
        onPress: () => undefined,
    },
}

export const OperatorButton: Story = {
    args: {
        label: '+',
        isNumber: false,
        isZero: false,
        onPress: () => undefined,
    },
}