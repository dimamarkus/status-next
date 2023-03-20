import Card from "./Card";
import { Button } from "#/ui/atoms/buttons/Button/Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ["autodocs"],
  args: {
    title: "Card Title",
    children: (
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas cupiditate hic pariatur
        tenetur obcaecati qui unde tempora similique et maxime quo deleniti, magni, at itaque
        veritatis velit illo, rerum aut!
      </p>
    ),
    footer: <Button text="Click me" />,
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {},
};