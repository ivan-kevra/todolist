import type { Meta, StoryObj } from "@storybook/react";
import { Header } from ".";
import { IsLoggedInReduxStoreProviderDecorator } from "@/stories/decorators/ReduxStoreProviderDecorator";

const meta = {
  argTypes: {
    variant: {
      //   control: { type: "radio" },
      //   options: ["primary", "secondary", "tertiary", "link"],
    },
  },
  component: Header,
  tags: ["autodocs"],
  title: "Components/Header",
  decorators: [IsLoggedInReduxStoreProviderDecorator],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    disabled: false,
    variant: "primary",
  },
};
