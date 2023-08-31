import type {Meta,StoryObj} from "@storybook/react";
import Provider from "react-redux/es/components/Provider";
import App from "../app/App";

import {ReduxStoreProviderDecorator} from "./decorator/ReduxStoreProviderDecorator";

const meta: Meta<typeof App> = {
    title: "Todolist/App",
    component: App,
    tags: ["autodocs"],
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator],
}


export default meta
type Story = StoryObj<typeof App>
export const AppBaseExample: Story = {}