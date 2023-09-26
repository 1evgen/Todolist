import type { Meta, StoryObj } from "@storybook/react";
import App from "../app/App";
import { ReduxStoreProviderDecorator } from "./decorator/ReduxStoreProviderDecorator";
import {withRouter} from "storybook-addon-react-router-v6";


const meta: Meta<typeof App> = {
  title: "Todolist/App",
  component: App,
  tags: ["autodocs"],
  argTypes: {},
  decorators: [ReduxStoreProviderDecorator, withRouter],

};

export default meta;
type Story = StoryObj<typeof App>;
export const AppBaseExample: Story = {};
