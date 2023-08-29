import type { Meta, StoryObj } from '@storybook/react';
import {AddItemForm} from "../Components/addItemForm/AddItemForm";
import {action} from '@storybook/addon-actions'
import {EditableSpan} from "../Components/editableSpan/EditableSpan";


const meta: Meta<typeof EditableSpan> = {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],

    argTypes: {
       title: {
           description: "name title and todolist",
           defaultValue: 'Enter text'
       },
        onChange: {
           description: "user makes click for title to change"
        }

    },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;
export const EditableSpanBaseExample: Story = {

    args: {
        title: 'Enter text',
        onChange: action('change text')
    }
};

