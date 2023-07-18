import type {Meta,StoryObj} from "@storybook/react";
import Provider from "react-redux/es/components/Provider";
import AppWithRedux from "../AppWithRedux";

import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./decorator/ReduxStoreProviderDecorator";

const meta: Meta<typeof AppWithRedux> = {
    title: "Todolist/AppWithRedux",
    component: AppWithRedux,
    tags: ["autodocs"],
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator],
}


export default meta

type Story = StoryObj<typeof AppWithRedux>
export const AppWithReduxBaseExample: Story = {}