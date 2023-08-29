import type { Meta, StoryObj } from '@storybook/react';
import {AddItemForm} from "../Components/addItemForm/AddItemForm";
import {action} from '@storybook/addon-actions'


const meta: Meta<typeof AddItemForm> = {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  tags: ['autodocs'],

  argTypes: {
    addItemForm: {
      description: 'button clicked inside form',
      action: 'clicked'
    }
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;
export const AddItemFormBaseExample: Story = {

  args: {
    addItemForm: action('button clicked inside form')
  }
};

