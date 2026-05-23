import type { Meta, StoryObj } from '@storybook/react'
import Screen from './Screen'

const meta = {
    title: 'Components/Screen',
    component: Screen,
} satisfies Meta<typeof Screen>

export default meta

type Story = StoryObj<typeof meta>

export const Initial: Story = {
    args: {
        value: '0',
    },
}

export const FullDisplay: Story = {
    args: {
        value: '123456789',
    },
}

export const ErrorDisplay: Story = {
    args: {
        value: 'ERROR',
    },
}