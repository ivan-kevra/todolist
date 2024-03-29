import type { Meta, StoryObj } from "@storybook/react";
import { IsLoggedInReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator";
import { Login } from "./Login";

const meta = {
  title: "LOGIN/Login",
  component: Login,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: { isLoggedIn: false },
  decorators: [IsLoggedInReduxStoreProviderDecorator],
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLogin: Story = {};
